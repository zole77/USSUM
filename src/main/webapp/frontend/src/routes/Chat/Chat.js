import React from "react";
import ChatList from "./../../components/chat/ChatList";
import ChatRoom from "../../components/chat/ChatRoom";
import FriendProfile from "../../components/chat/FrinedProfile";

function Chat(props) {
    return (
        <div style={{ display: "flex" }}>
            <ChatList></ChatList>
            <ChatRoom></ChatRoom>
            <FriendProfile></FriendProfile>
        </div>
    );
}

export default Chat;
