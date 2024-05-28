import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import "../../styles/ChatList.css";
import axios from "axios";

function ChatList(props) {
    return (
        <div className="chatList-container">
            <div style={{ textAlign: "left" }}>채팅 목록 ▼</div>
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
