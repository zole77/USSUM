import React from "react";
import ChatList from "./../../components/chat/ChatList";
import ChatRoom from "../../components/chat/ChatRoom";
import FriendProfile from "../../components/chat/FrinedProfile";

function Chat(props) {
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <div style={{ flex: 1, padding: "50px", background: "white" }}>
                <ChatList />
            </div>
            <div style={{ flex: 3, background: "white" }}>
                <ChatRoom />
            </div>
            <div style={{ flex: 1, padding: "50px", background: "white" }}>
                <FriendProfile />
            </div>
        </div>
    );
}

export default Chat;
