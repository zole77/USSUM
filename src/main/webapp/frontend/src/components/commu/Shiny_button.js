import React, { useState } from "react";
import pic1 from "../../img/49_hires.png";

function Shiny_button() {
    const [isHovered, setIsHovered] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
    const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
    const [initialOverlayPosition, setInitialOverlayPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // 마우스를 뗐을 때 초기 상태로 돌아가도록 설정
        setTimeout(() => {
            setRotation(initialRotation);
            setOverlayPosition(initialOverlayPosition);
        }, 500); // 0.5초 뒤에 초기 상태로 돌아감
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // overlay의 위치를 마우스 위치에 따라 조정
        setOverlayPosition({ x, y });

        const rotateY = (x - rect.width / 2) / 10;
        const rotateX = -(y - rect.height / 2) / 10;
        setRotation({ x: rotateY, y: rotateX });
    };

    return (
        <div
            className={`cardContainer ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                width: "220px",
                height: "310px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                className="card_overlay"
                style={{
                    position: "absolute",
                    width: "220px",
                    height: "1500px",
                    background:
                        "linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)",
                    filter: "brightness(1.1), opacity(0.8)",
                    mixBlendMode: "color-dodge",
                    backgroundSize: "cover",
                    zIndex: "1",
                    transform: `translate(-50%, -50%)`, // overlay의 중심을 마우스 위치로 설정
                    left: `${overlayPosition.x}px`,
                    top: `${overlayPosition.y}px`,
                }}
            ></div>
            <div
                className="card"
                style={{
                    width: "220px",
                    height: "310px",
                    backgroundImage: "url(" + pic1 + ")",
                    backgroundSize: "cover",
                    textAlign: "center",
                    transform: `perspective(350px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
                }}
            ></div>
        </div>
    );
}

export default Shiny_button;
