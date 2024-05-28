import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function ChatRoom({ roomId, username, socket, userId, userNickName, setOtherUserId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

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
    }, [roomId]);

    useEffect(() => {
        socket.onmessage = (event) => {
            // 서버에서 메시지를 수신하면 동작함
            fetchInitialMessages();
        };

        if (chatContainerRef.current) {
            if (!inputRef.current.contains(document.activeElement)) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    }, [socket, fetchInitialMessages]);

    const sendMessage = () => {
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
        <div className="chat-room-div">
            <div className="chat-messages-container" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.mem_id === userId ? "my-message" : ""}`}
                    >
                        {msg.mem_id !== userId ? (
                            <div className="other-message">
                                <div
                                    className="profile-pic"
                                    onClick={() => {
                                        setOtherUserId(msg.mem_id);
                                    }}
                                >
                                    <img src={defaultProfile} alt="profile" />
                                </div>

                                <div className="other-message-container">
                                    <div className="other-message-sender">{msg.mem_nickname}</div>
                                    <div className="other-message-content">{msg.message}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="chat-message-content">{msg.message}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
