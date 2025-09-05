import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [token, setToken] = useState('');
    const [ws, setWs] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [input, setInput] = useState('');

    // Connect to MMO server when token is set
    useEffect(() => {
        if (!token) return;
        const socket = new WebSocket(`ws://localhost:4000/ws?token=${token}`);
        socket.onmessage = (ev) => {
            setChatLog((prev) => [...prev, ev.data]);
        };
        setWs(socket);
        return () => socket.close();
    }, [token]);

    const login = async () => {
        const username = prompt("Enter username:");
        if (!username) return;
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });
        const data = await res.json();
        setToken(data.token);
    };

    const sendChat = () => {
        if (!ws) return;
        ws.send(JSON.stringify({ t: 'chat', text: input }));
        setInput('');
    };

    return (
        <div style={{ padding: 20 }}>
            {!token ? <button onClick={login}>Login</button> : <div>Connected!</div>}
            <div style={{ marginTop: 20 }}>
                <div style={{ height: 200, border: '1px solid #ccc', overflowY: 'scroll', padding: 5 }}>
                    {chatLog.map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={sendChat}>Send</button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
