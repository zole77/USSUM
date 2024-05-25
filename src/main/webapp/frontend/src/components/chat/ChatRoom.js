import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";
import axios from "axios";

function ChatRoom({ roomId, username, socket }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.roomId === roomId) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
            };
            setIsLoading(false);
        }

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket, roomId]);

    const sendMessage = () => {
        if (socket && message.trim()) {
            const chatMessage = {
                type: "TALK",
                roomId: roomId,
                mem_id: username,
                sender: username,
                message: message,
            };
            console.log(chatMessage);
            socket.send(JSON.stringify(chatMessage));
            setMessage("");
        }
    };

    const isJoinedRoom = async () => {
        try {
            console.log(`Request URL: /chat/${roomId}/members?mem_id=rabbit@naver.com`);
            const response = await axios.get(`/chat/${roomId}/members`, {
                params: {
                    mem_id: "rabbit@naver.com",
                },
            });
            if (response.data) {
                console.log("rabbit@naver.com이 이미 존재함");
            }
            return response.data; // true 또는 false
        } catch (error) {
            console.error("Error checking member in room:", error);
            return false;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat-room-container">
            <div className="chat-messages-container">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="send-button" onClick={sendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
