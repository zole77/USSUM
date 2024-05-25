import React, { useEffect, useRef, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatRoom from "../../components/chat/ChatRoom";
import FriendProfile from "../../components/chat/FriendProfile";
import axios from "axios";

function Chat(props) {
    const [selectedRoom, setSelectedRoom] = useState(null); // 현재 선택된 방을 관리하는 state
    const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록
    const [newRoomName, setNewRoomName] = useState(""); // 채팅방 이름 저장할 state
    const [rooms, setRooms] = useState([]);
    const ws = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("토끼");
    const [roomId, setRoomId] = useState("");
    const socket = useRef(null);

    const fetchRooms = async () => {
        // 채팅방 목록을 불러오는 메소드, 단 지금은 사용자가 아닌 모든 채팅방 목록을 불러오고 있다는 점을 인지해야 함
        try {
            const response = await axios.get("/chat/chatList");
            setRooms([...response.data]);
        } catch (error) {
            console.error("채팅방 로딩 에러", error);
        }
    };

    const createRoom = async () => {
        // 채팅방 만들기
        if (newRoomName.trim()) {
            try {
                const response = await axios.post("/chat/createRoom", null, {
                    params: { name: newRoomName },
                });

                if (socket.current) {
                    socket.current.close();
                }

                // 채팅방을 만들면 만든 사람은 만듦과 동시에 입장시키는 게 자연스러움.
                const roomId = response.data.room.roomId;
                enterRoom(roomId);

                setNewRoomName("");
                fetchRooms();
            } catch (error) {
                console.error("Error creating room:", error);
            }
        }
    };

    const enterRoom = (roomId) => {
        if (socket.current) {
            socket.current.close();
        }
        console.log(`enterRoom: ${roomId}`);

        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        socket.current.onopen = () => {
            console.log("WebSocket Connected");
            socket.current.send(
                JSON.stringify({
                    type: "ENTER",
                    roomId: roomId,
                    mem_id: "rabbit@naver.com",
                    sender: username,
                })
            );
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming messages here
            console.log("Received message:", data);
        };

        socket.current.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        setSelectedRoom(roomId);
    };

    const quitRoom = () => {
        if (socket.current) {
            socket.current.send(
                JSON.stringify({
                    type: "QUIT",
                    roomId: selectedRoom,
                    mem_id: username,
                    sender: username,
                })
            );
            socket.current.close();
            setSelectedRoom("");
        }
    };

    useEffect(() => {
        // Chat.js를 실행시켰을 때 최초로 채팅방 목록을 불러옴
        fetchRooms();

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <div style={{ flex: 1, padding: "50px", background: "white" }}>
                <ChatList
                    rooms={rooms}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    enterRoom={enterRoom}
                />
                <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="New Room Name"
                />
                <button onClick={createRoom}>Create Room</button>
            </div>
            <div style={{ flex: 3, background: "white" }}>
                {selectedRoom && (
                    <>
                        <ChatRoom
                            roomId={selectedRoom}
                            username={username}
                            socket={socket.current}
                        />
                        <button onClick={quitRoom}>Leave Room</button>
                    </>
                )}
            </div>
            <div style={{ flex: 1, padding: "50px", background: "white" }}>
                <FriendProfile />
            </div>
        </div>
    );
}

export default Chat;
