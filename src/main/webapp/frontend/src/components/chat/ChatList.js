import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import "../../styles/ChatList.css";
import axios from "axios";

function ChatList(props) {
    const [friends, setFriends] = useState([]);

    return (
        <div className="chatList-container">
            <h2>채팅</h2>
            {props.rooms.map((chatListItem) => {
                return (
                    <ChatListItem
                        key={chatListItem.roomId}
                        chatListItem={chatListItem}
                        selectedRoom={props.selectedRoom}
                        setSelectedRoom={props.setSelectedRoom}
                        enterRoom={props.enterRoom}
                        socket={props.socket}
                    />
                );
            })}
        </div>
    );
}

export default ChatList;
