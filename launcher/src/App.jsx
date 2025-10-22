import { useState } from "react";
import FPSCounter from "./components/FPSCounter";

function App() {
    const [romUrl, setRomUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // create a blob URL for the uploaded ROM
        const blobUrl = URL.createObjectURL(file);
        setRomUrl(blobUrl);
    };

    return (
        <div className="p-4 text-center">
            {!romUrl ? (
                <>
                    <h1 className="text-xl font-bold mb-2 text-white">Upload your Digimon World 3 ROM</h1>
                    <input type="file" accept=".bin,.iso,.img" onChange={handleFileChange} />
                </>
            ) : (
                <>
                    <iframe
                        title="DW3 Emulator"
                        src={`/emulatorjs/index.html?rom=${encodeURIComponent(romUrl)}`}
                        style={{ width: "100%", height: "90vh", border: "none" }}
                    />
                    <FPSCounter />
                </>
            )}
        </div>
    );
}

export default App;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useState } from "react";
// import EmulatorWrapper from "./components/EmulatorWrapper";

// export default function App() {
//     const [romFile, setRomFile] = useState(null);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) setRomFile(file);
//     };

//     return (
//         <div className="p-4 text-center">
//             {!romFile ? (
//                 <>
//                     <h1 className="text-xl font-bold mb-2">
//                         Upload your Digimon World 3 ROM
//                     </h1>
//                     <input type="file" accept=".bin,.iso,.img" onChange={handleFileChange} />
//                 </>
//             ) : (
//                 <EmulatorWrapper romFile={romFile} />
//             )}
//         </div>
//     );
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useState } from "react";
// import EmulatorWrapper from "./components/EmulatorWrapper";

// export default function App() {
//     const [romBuffer, setRomBuffer] = useState(null);

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const buffer = await file.arrayBuffer();
//         setRomBuffer(buffer);
//     };

//     return (
//         <div className="p-4 text-center text-white bg-gray-900 h-screen">
//             {!romBuffer ? (
//                 <>
//                     <h1 className="text-2xl font-bold mb-4">Upload your Digimon World 3 ROM</h1>
//                     <input type="file" accept=".bin,.iso,.img" onChange={handleFileChange} />
//                 </>
//             ) : (
//                 <EmulatorWrapper romArrayBuffer={romBuffer} />
//             )}
//         </div>
//     );
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState } from "react";
// import EmulatorWrapper from "./components/EmulatorWrapper";

// function App() {
//     const [rom, setRom] = useState(null);
//     const [romName, setRomName] = useState("");

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const arrayBuffer = await file.arrayBuffer();
//         setRom(arrayBuffer);
//         setRomName(file.name);
//         console.log("ROM loaded:", file.name, arrayBuffer.byteLength);
//     };

//     return (
//         <div className="p-4 text-center min-h-screen bg-gray-100">
//             {!rom ? (
//                 <>
//                     <h1 className="text-2xl font-bold mb-4">Upload your Digimon World 3 ROM</h1>
//                     <input
//                         type="file"
//                         accept=".bin,.iso,.img"
//                         onChange={handleFileChange}
//                         className="border p-2 rounded cursor-pointer"
//                     />
//                 </>
//             ) : (
//                 <div>
//                     <h2 className="text-lg font-semibold mb-2">
//                         Loaded: {romName} 🎮 Starting emulator...
//                     </h2>
//                     <div
//                         style={{
//                             width: "100%",
//                             height: "480px",
//                             background: "#000",
//                             margin: "0 auto",
//                             borderRadius: "8px",
//                             overflow: "hidden",
//                         }}
//                     >
//                         <EmulatorWrapper romArrayBuffer={rom} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // src/App.jsx
// import { useState } from "react";

// function App() {
//     const [rom, setRom] = useState(null);

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const arrayBuffer = await file.arrayBuffer();
//         setRom(arrayBuffer);
//         console.log("ROM loaded:", file.name, arrayBuffer.byteLength);
//     };

//     return (
//         <div className="p-4 text-center">
//             {!rom ? (
//                 <>
//                     <h1 className="text-xl font-bold mb-2">Upload your Digimon World 3 ROM</h1>
//                     <input type="file" accept=".bin,.iso,.img" onChange={handleFileChange} />
//                 </>
//             ) : (
//                 <h2>ROM loaded successfully! 🎮</h2>
//             )}
//         </div>
//     );
// }

// export default App;


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
