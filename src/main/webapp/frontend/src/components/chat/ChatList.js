import React, { useState } from "react";
import ChatListItem from "./ChatListItem";
import "../../styles/ChatList.css";
import axios from "axios";

function ChatList(props) {
    const [friends, setFriends] = useState([]);
    const [chatList, setChatList] = useState([]);

    const getRooms = async () => {
        try {
            const response = await axios.post("chat/getRooms");
        } catch {}
    };

    return (
        <div className="chatList-container">
            <h2>채팅</h2>
            {chatList.map((chatListItem) => {
                return (
                    <>
                        <ChatListItem chatListItem={chatListItem} />;
                    </>
                );
            })}
        </div>
    );
}

export default ChatList;