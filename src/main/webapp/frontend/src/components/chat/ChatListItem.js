import React, { useEffect, useState, useCallback } from "react";
import "../../styles/ChatListItem.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function ChatListItem(props) {
    const [lastMessage, setLastMessage] = useState("");

    const fetchLastMessage = useCallback(async () => {
        const response = await axios.get(`/chat/getMessages/${props.chatListItem.roomId}`);
        console.log(response);
        setLastMessage(
            response.data.length > 0
                ? response.data[response.data.length - 1].mem_nickname +
                      ": " +
                      response.data[response.data.length - 1].message
                : null
        );
    }, [props.chatListItem.roomId]);

    useEffect(() => {
        fetchLastMessage();

        const socketListener = (event) => {
            // 서버에서 메시지를 수신하면 동작함
            fetchLastMessage();
        };

        props.socket.addEventListener("message", socketListener);

        return () => {
            props.socket.removeEventListener("message", socketListener);
        };
    }, [props.socket, fetchLastMessage]);

    const isSelected = props.selectedRoom === props.chatListItem.roomId;

    return (
        <div
            className={`chatListItem-container ${isSelected ? "selected" : ""}`}
            onClick={() => {
                props.enterRoom(props.chatListItem.roomId); // 클릭했을 때 해당하는 룸으로 입장
                props.setSelectedRoom(props.chatListItem.roomId);
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
                <div className="recent-message">
                    {} {lastMessage}
                </div>
            </div>
        </div>
    );
}

export default ChatListItem;
