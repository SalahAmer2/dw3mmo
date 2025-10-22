// import React, { useEffect, useRef } from "react";

// export default function EmulatorWrapper({ romArrayBuffer }) {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         if (!romArrayBuffer || !window.customElements.get("wasmpsx-player")) return;

//         const container = containerRef.current;
//         if (!container) return;

//         container.innerHTML = "";

//         // ✅ Create the custom element
//         const player = document.createElement("wasmpsx-player");
//         player.style.width = "100%";
//         player.style.height = "100%";
//         container.appendChild(player);

//         // ✅ Wait until `readFile()` becomes available, then load ROM
//         const checkReady = setInterval(() => {
//             if (player.readFile) {
//                 clearInterval(checkReady);
//                 player.readFile(romArrayBuffer);
//             }
//         }, 300);

//         return () => {
//             container.innerHTML = "";
//             clearInterval(checkReady);
//         };
//     }, [romArrayBuffer]);

//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         />
//     );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useRef } from "react";

// export default function EmulatorWrapper({ romArrayBuffer }) {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         if (!romArrayBuffer) return;

//         // Ensure the emulator script is loaded once
//         if (!window.__wasmpsxLoaded) {
//             const script = document.createElement("script");
//             script.src = `${window.location.origin}/emulator/wasmpsx.min.js`;
//             script.onload = () => {
//                 window.__wasmpsxLoaded = true;
//                 initEmulator();
//             };
//             document.body.appendChild(script);
//         } else {
//             initEmulator();
//         }

//         function initEmulator() {
//             const container = containerRef.current;
//             if (!container) return;

//             // Clear container in case of re-render
//             container.innerHTML = "";

//             // Create player element
//             const player = document.createElement("wasmpsx-player");
//             player.style.width = "100%";
//             player.style.height = "100%";

//             container.appendChild(player);

//             // Wait until element is ready
//             const checkReady = setInterval(() => {
//                 if (player.readFile) {
//                     clearInterval(checkReady);
//                     player.readFile(romArrayBuffer);
//                 }
//             }, 300);
//         }

//         return () => {
//             const container = containerRef.current;
//             if (container) container.innerHTML = "";
//         };
//     }, [romArrayBuffer]);

//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         />
//     );
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////WASMpsx (PS1 emulator in WebAssembly)
// import React, { useRef, useEffect } from "react";

// export default function EmulatorWrapper({ romArrayBuffer }) {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         if (!romArrayBuffer) return;

//         const script = document.createElement("script");
//         script.src = `${window.location.origin}/emulator/wasmpsx.min.js`;
//         script.onload = () => {
//             // assume `WASMpsx` global is available
//             const player = new window.WASMpsx.Player({
//                 container: containerRef.current,
//                 romBuffer: romArrayBuffer,
//             });
//             player.start();
//         };
//         document.body.appendChild(script);

//         return () => {
//             // cleanup if needed
//         };
//     }, [romArrayBuffer]);

//     return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Below for emulatorjs 
import React, { useRef, useEffect } from "react";

export default function EmulatorWrapper({ romArrayBuffer }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!romArrayBuffer) return;
        const blob = new Blob([romArrayBuffer]);
        const url = URL.createObjectURL(blob);

        iframeRef.current.src = `${window.location.origin}/emulatorjs/index.html?core=psx&rom=${encodeURIComponent(url)}`;

        // Clean up object URL when unmounted
        return () => URL.revokeObjectURL(url);
    }, [romArrayBuffer]);

    return (
        <iframe
            ref={iframeRef}
            src="/emulatorjs/index.html"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PS1 Emulator"
        />
    );
}
