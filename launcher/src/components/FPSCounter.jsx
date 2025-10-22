import { useEffect, useRef, useState } from "react";

export default function FPSCounter() {
    const [fps, setFps] = useState(0);
    const frames = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        let animId;

        const update = () => {
            frames.current++;
            const now = performance.now();
            if (now - lastTime.current >= 1000) {
                setFps(frames.current);
                frames.current = 0;
                lastTime.current = now;
            }
            animId = requestAnimationFrame(update);
        };

        animId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.6)",
                color: "#0f0",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "monospace",
                zIndex: 9999,
            }}
        >
            {fps} FPS
        </div>
    );
}
