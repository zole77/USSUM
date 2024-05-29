import React, { useState, useRef, useEffect } from "react";
import "../../styles/ChatRoom.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function ChatRoom({ roomId, username, socket, userId, userNickName, setOtherUserId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [userProfileImages, setUserProfileImages] = useState({});

    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    const fetchInitialMessages = async () => {
        try {
            const response = await axios.get(`/chat/getMessages/${roomId}`);
            const messages = response.data;
            setMessages(messages);
            await loadProfileImages(messages);
            setIsLoading(false);
        } catch (error) {
            console.error("getMessages 오류: ", error);
        }
    };

    const loadProfileImages = async (messages) => {
        const uniqueUserIds = [...new Set(messages.map((msg) => msg.mem_id))];
        const profileImages = {};

        for (const userId of uniqueUserIds) {
            try {
                const response = await axios.get(
                    `http://localhost:3000/member/one?mem_id=${userId}`
                );
                profileImages[
                    userId
                ] = `http://localhost:3000/member/image/${response.data.mem_image}`;
            } catch (error) {
                console.error("프로필 이미지 로드 중 오류 발생:", error);
                profileImages[userId] = defaultProfile; // fallback to default image on error
            }
        }

        setUserProfileImages(profileImages);
    };

    useEffect(() => {
        fetchInitialMessages();
    }, [roomId]);

    useEffect(() => {
        socket.onmessage = (event) => {
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
                                    <img
                                        src={userProfileImages[msg.mem_id] || defaultProfile}
                                        alt="profile"
                                    />
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
