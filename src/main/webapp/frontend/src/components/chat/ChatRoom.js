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
            setIsLoading(false);
        } catch (error) {
            console.error("getMessages 오류: ", error);
        }
    };

    useEffect(() => {
        fetchInitialMessages();
        // // socket.onmessage = (event) => {
        // //     console.log("방금 도착한 메세지:", message);
        // //     fetchInitialMessages();
        // // };

        // if (socket) {
        //     socket.close();
        // }

        // // WebSocket을 엽니다.
        // socket = new WebSocket(`ws://localhost:8080/ws/chat`);
        // console.log("useEffect 실행");

        // // 웹소켓 이벤트 핸들러 설정
        // socket.onopen = () => {
        //     socket.send(
        //         JSON.stringify({
        //             type: "TALK",
        //             roomId: roomId,
        //             mem_id: userId,
        //             sender: userNickName,
        //             message: "으아아아아아아악!!!!!!!!!",
        //         })
        //     );
        // };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming messages here
            console.log("받은 메세지:", data);
        };
    }, [socket, roomId]);

    const sendMessage = () => {
        console.log(socket);
        console.log(socket.current);
        if (message.trim()) {
            socket.send(
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
