const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");

const SECRET = "supersecret"; // change in production
const app = express();
app.use(express.json());

// Login endpoint -> issues a token
app.post("/login", (req, res) => {
    const { username } = req.body || {};
    if (!username || username.length < 3) {
        return res.status(400).json({ error: "username too short" });
    }
    const token = jwt.sign({ sub: username }, SECRET, { expiresIn: "1h" });
    res.json({ token });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

// Simple world state
const players = new Map();

function broadcast(data) {
    const msg = JSON.stringify(data);
    for (const client of wss.clients) {
        if (client.readyState === 1) client.send(msg);
    }
}

wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    let user;
    try {
        user = jwt.verify(token, SECRET);
    } catch (e) {
        ws.close(1008, "unauthorized");
        return;
    }

    const id = user.sub;
    players.set(id, { x: 0, y: 0 });
    console.log(`${id} connected`);

    // Send snapshot
    ws.send(
        JSON.stringify({
            t: "snapshot",
            you: id,
            players: Array.from(players.entries()).map(([pid, pos]) => ({
                id: pid,
                ...pos,
            })),
        })
    );

    // Broadcast join
    broadcast({ t: "notice", text: `${id} joined the world` });

    ws.on("message", (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw);
        } catch {
            return;
        }

        if (msg.t === "move") {
            const p = players.get(id) || { x: 0, y: 0 };
            p.x += msg.dx || 0;
            p.y += msg.dy || 0;
            players.set(id, p);
            broadcast({ t: "pos", id, x: p.x, y: p.y });
        }

        if (msg.t === "chat") {
            broadcast({ t: "chat", from: id, text: msg.text });
        }
    });

    ws.on("close", () => {
        players.delete(id);
        broadcast({ t: "notice", text: `${id} left` });
    });
});

server.listen(4000, () => {
    console.log("MMO server running on http://localhost:4000");
});
