import React from "react";
import "../../styles/ChatListItem.css";
import defaultProfile from "../../img/defaultProfile.png";

function ChatListItem(props) {
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
                    style={{ marginTop: "10px", width: "50px", height: "50px" }}
                ></img>
            </div>
            <div className="chatListItem-info">
                <div className="chatListItem-name">{props.chatListItem.name}</div>
                <div className="recent-message">최근 메세지</div>
            </div>
        </div>
    );
}

export default ChatListItem;
