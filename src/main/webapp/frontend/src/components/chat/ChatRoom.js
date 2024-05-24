import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";
import axios from "axios";

function ChatRoom({ roomId, username }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const ws = useRef(null);

    const connectWebSocket = () => {
        const currentWs = new WebSocket(`ws://localhost:8080/ws/chat`);
        ws.current = currentWs;

        currentWs.onopen = () => {
            console.log("WebSocket connected");
            currentWs.send(
                JSON.stringify({
                    type: "ENTER",
                    roomId: roomId,
                    mem_id: "rabbit@naver.com",
                    sender: username,
                    message: `${username}님이 입장했습니다.`,
                })
            );
        };

        currentWs.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, message]);
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        // currentWs.onclose = () => {
        //     console.log("WebSocket disconnected");
        // };

        // currentWs.onerror = (error) => {
        //     console.error("WebSocket error:", error);
        //     currentWs.close();
        // };
    };

    const handleBeforeUnload = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(
                JSON.stringify({
                    type: "QUIT",
                    roomId: roomId,
                    mem_id: "rabbit@naver.com",
                    sender: username,
                    message: `${username}님이 퇴장했습니다.`,
                })
            );
            ws.current.close();
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

    useEffect(() => {
        const initChatRoom = async () => {
            const isJoined = await isJoinedRoom();
            if (isJoined) {
                connectWebSocket();
                setIsLoading(false);

                window.addEventListener("beforeunload", handleBeforeUnload);

                return () => {
                    window.removeEventListener("beforeunload", handleBeforeUnload);
                    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                        ws.current.send(
                            JSON.stringify({
                                type: "QUIT",
                                roomId: roomId,
                                mem_id: "rabbit@naver.com",
                                sender: username,
                                message: `${username}님이 퇴장했습니다.`,
                            })
                        );
                        ws.current.close();
                    }
                };
            } else {
                console.log("User is not a member of this room.");
                setIsLoading(false);
            }
        };

        initChatRoom();
    }, [roomId, username]);

    const sendMessage = () => {
        if (input.trim() !== "") {
            // WebSocket이 연결되어 있을 때만 메시지를 보냄
            if (ws.current.readyState === WebSocket.OPEN) {
                const message = {
                    type: "TALK",
                    roomId: roomId,
                    mem_id: "rabbit@naver.com",
                    sender: username,
                    message: input,
                };
                ws.current.send(JSON.stringify(message));
                setInput("");
            } else {
                console.error("WebSocket is not in OPEN state.");
            }
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
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button className="send-button" onClick={sendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
