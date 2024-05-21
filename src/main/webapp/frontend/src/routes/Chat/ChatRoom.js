import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);

    // 가장 최신 메시지가 화면 하단으로 스크롤되도록 설정
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== "") {
            const newMessage = {
                text: inputMessage,
                isMe: true, // 내 채팅인지 여부를 나타내는 플래그
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");
        }
    };

    return (
        <div className="chat-room-container">
            <div className="chat-messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isMe ? "my-message" : "other-message"}`}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <button className="send-button" onClick={handleSendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
