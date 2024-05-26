import React, { useEffect, useState } from "react";
import "../../styles/ChatListItem.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function ChatListItem(props) {
    const [lastMessage, setLastMessage] = useState("");

    const fetchLastMessages = async () => {
        const response = await axios.get(`/chat/getMessages/${props.chatListItem.roomId}`);
        setLastMessage(
            response.data.length > 0 ? response.data[response.data.length - 1].message : null
        );
    };

    useEffect(() => {
        fetchLastMessages();
    }, [fetchLastMessages]);

    return (
        <div
            className="chatListItem-container"
            onClick={() => {
                props.enterRoom(props.chatListItem.roomId); // 클릭했을 때 해당하는 룸으로 입장
            }}
        >
            <div className="profile-container">
                <img
                    src={defaultProfile}
                    alt="profile"
                    style={{ margin: "5px", width: "50px", height: "50px" }}
                ></img>
            </div>
            <div className="chatListItem-info">
                <div className="chatListItem-name">{props.chatListItem.name}</div>
                <div className="recent-message">{lastMessage}</div>
            </div>
        </div>
    );
}

export default ChatListItem;
