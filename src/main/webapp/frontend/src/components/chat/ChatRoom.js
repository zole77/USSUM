import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";
import axios from "axios";

function ChatRoom({ roomId, username, socket, userId, userNickName }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchInitialMessages = async () => {
        try {
            const response = await axios.get(`/chat/getMessages/${roomId}`);
            setMessages(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("getMessages 오류: ", error);
        }
    };

    useEffect(() => {
        fetchInitialMessages();
        // socket.onmessage = (event) => {
        //     console.log("방금 도착한 메세지:", message);
        //     fetchInitialMessages();
        // };

        if (socket.current) {
            socket.current.close();
        }

        // WebSocket을 엽니다.
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);
        console.log("useEffect 실행");

        // 웹소켓 이벤트 핸들러 설정
        socket.current.onopen = () => {
            socket.current.send(
                JSON.stringify({
                    type: "TALK",
                    roomId: roomId,
                    mem_id: userId,
                    sender: userNickName,
                    message: "으아아아아아아악!!!!!!!!!",
                })
            );
        };
        socket.current.onmessage = (event) => {
            console.log("방금 도착한 메세지:", event);
            fetchInitialMessages();
        };

        return () => {
            if (socket) {
                socket.current.close();
            }
        };
    }, [socket, roomId]);

    const sendMessage = () => {
        // 기존에 열린 WebSocket이 있다면 닫습니다.
        if (socket.current) {
            socket.current.close();
        }

        // WebSocket을 엽니다.
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        // WebSocket이 열리면 서버에 입장 메시지를 보냅니다.
        socket.current.onopen = () => {
            if (message.trim()) {
                socket.current.send(
                    JSON.stringify({
                        type: "TALK",
                        roomId: roomId,
                        mem_id: userId,
                        sender: userNickName,
                        message: message,
                    })
                );

                fetchInitialMessages();
                setMessage("");
            }
        };
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
                        <strong>{msg.mem_nickname}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="send-button" onClick={sendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
