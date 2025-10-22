// src/App.js
import { useState } from "react";

function App() {
    const [rom, setRom] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const arrayBuffer = await file.arrayBuffer();
        setRom(arrayBuffer);
        console.log("ROM loaded:", file.name, arrayBuffer.byteLength);
    };

    return (
        <div className="p-4 text-center">
            {!rom ? (
                <>
                    <h1 className="text-xl font-bold mb-2">Upload your Digimon World 3 ROM</h1>
                    <input type="file" accept=".bin,.iso,.img" onChange={handleFileChange} />
                </>
            ) : (
                <h2>ROM loaded successfully! 🎮</h2>
            )}
        </div>
    );
}

export default App;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//The above works for the chat! (here still not uploading rom)
// import React, { useState, useEffect } from "react";

// function App() {
//     const [username, setUsername] = useState("");
//     const [token, setToken] = useState("");
//     const [ws, setWs] = useState(null);
//     const [chatLog, setChatLog] = useState([]);
//     const [input, setInput] = useState("");

//     // Connect to MMO server when token is set
//     useEffect(() => {
//         if (!token) return;
//         const socket = new WebSocket(`ws://localhost:4000/ws?token=${token}`);
//         socket.onmessage = (ev) => {
//             setChatLog((prev) => [...prev, ev.data]);
//         };
//         socket.onclose = () => console.log("Disconnected");
//         setWs(socket);
//         return () => socket.close();
//     }, [token]);

//     const login = async () => {
//         if (!username) return alert("Please enter a username first.");
//         const res = await fetch("http://localhost:4000/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username }),
//         });
//         const data = await res.json();
//         if (data.token) setToken(data.token);
//     };

//     const sendChat = () => {
//         if (!ws || !input) return;
//         ws.send(JSON.stringify({ t: "chat", text: input }));
//         setInput("");
//     };

//     return (
//         <div style={{ padding: 20, fontFamily: "sans-serif" }}>
//             {!token ? (
//                 <div>
//                     <h2>Login</h2>
//                     <input
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="Enter username"
//                         style={{ marginRight: 10 }}
//                     />
//                     <button onClick={login}>Login</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h2>Connected as {username}</h2>
//                     <div
//                         style={{
//                             height: 200,
//                             border: "1px solid #ccc",
//                             overflowY: "scroll",
//                             padding: 5,
//                             marginBottom: 10,
//                         }}
//                     >
//                         {chatLog.map((msg, i) => (
//                             <div key={i}>{msg}</div>
//                         ))}
//                     </div>
//                     <input
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Type message..."
//                         style={{ marginRight: 10 }}
//                     />
//                     <button onClick={sendChat}>Send</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;
//The above works for the chat! (here still not uploading rom)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////The below works in browser but in npm run electron the login button doesn't do anything probably because there's no prompt in desktop app
// import React, { useState, useEffect } from "react";

// function App() {
//     const [token, setToken] = useState("");
//     const [ws, setWs] = useState(null);
//     const [chatLog, setChatLog] = useState([]);
//     const [input, setInput] = useState("");

//     // Connect to MMO server when token is set
//     useEffect(() => {
//         if (!token) return;
//         const socket = new WebSocket(`ws://localhost:4000/ws?token=${token}`);
//         socket.onmessage = (ev) => {
//             setChatLog((prev) => [...prev, ev.data]);
//         };
//         setWs(socket);
//         return () => socket.close();
//     }, [token]);

//     const login = async () => {
//         const username = prompt("Enter username:");
//         if (!username) return;
//         const res = await fetch("http://localhost:4000/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username }),
//         });
//         const data = await res.json();
//         setToken(data.token);
//     };

//     const sendChat = () => {
//         if (!ws) return;
//         ws.send(JSON.stringify({ t: "chat", text: input }));
//         setInput("");
//     };

//     return (
//         <div style={{ padding: 20 }}>
//             {!token ? <button onClick={login}>Login</button> : <div>Connected!</div>}
//             <div style={{ marginTop: 20 }}>
//                 <div
//                     style={{
//                         height: 200,
//                         border: "1px solid #ccc",
//                         overflowY: "scroll",
//                         padding: 5,
//                     }}
//                 >
//                     {chatLog.map((msg, i) => (
//                         <div key={i}>{msg}</div>
//                     ))}
//                 </div>
//                 <input value={input} onChange={(e) => setInput(e.target.value)} />
//                 <button onClick={sendChat}>Send</button>
//             </div>
//         </div>
//     );
// }

// export default App;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';

// function App() {
//     const [token, setToken] = useState('');
//     const [ws, setWs] = useState(null);
//     const [chatLog, setChatLog] = useState([]);
//     const [input, setInput] = useState('');

//     // Connect to MMO server when token is set
//     useEffect(() => {
//         if (!token) return;
//         const socket = new WebSocket(`ws://localhost:4000/ws?token=${token}`);
//         socket.onmessage = (ev) => {
//             setChatLog((prev) => [...prev, ev.data]);
//         };
//         setWs(socket);
//         return () => socket.close();
//     }, [token]);

//     const login = async () => {
//         const username = prompt("Enter username:");
//         if (!username) return;
//         const res = await fetch("http://localhost:4000/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username })
//         });
//         const data = await res.json();
//         setToken(data.token);
//     };

//     const sendChat = () => {
//         if (!ws) return;
//         ws.send(JSON.stringify({ t: 'chat', text: input }));
//         setInput('');
//     };

//     return (
//         <div style={{ padding: 20 }}>
//             {!token ? <button onClick={login}>Login</button> : <div>Connected!</div>}
//             <div style={{ marginTop: 20 }}>
//                 <div style={{ height: 200, border: '1px solid #ccc', overflowY: 'scroll', padding: 5 }}>
//                     {chatLog.map((msg, i) => <div key={i}>{msg}</div>)}
//                 </div>
//                 <input value={input} onChange={(e) => setInput(e.target.value)} />
//                 <button onClick={sendChat}>Send</button>
//             </div>
//         </div>
//     );
// }

// ReactDOM.render(<App />, document.getElementById('root'));
