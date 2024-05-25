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

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("토끼");
    const [roomId, setRoomId] = useState("");

    const socket = useRef(); // useRef로 socket을 생성

    const fetchRooms = async () => {
        // 채팅방 목록을 불러오는 메소드, 단 지금은 사용자가 아닌 모든 채팅방 목록을 불러오고 있다는 점을 인지해야 함
        try {
            const response = await axios.get("/chat/chatList");
            setRooms(response.data);
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
                enterRoom(roomId);
            } catch (error) {
                console.error("Error creating room:", error);
            }
        }
    };

    const enterRoom = async (roomId) => {
        // 기존에 열린 WebSocket이 있다면 닫습니다.
        if (socket.current) {
            socket.current.close();
        }

        console.log(`enterRoom: ${roomId}`);

        // WebSocket을 엽니다.
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        console.log(socket.current);

        // WebSocket이 열리면 서버에 입장 메시지를 보냅니다.
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

        // 서버에서 메시지를 받으면 콘솔에 출력합니다.
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming messages here
            console.log("Received message:", data);
        };

        // WebSocket이 닫히면 콘솔에 출력합니다.
        socket.current.onclose = (event) => {
            console.log("WebSocket Connection Closed", event);
        };

        // WebSocket 에러가 발생하면 콘솔에 출력합니다.
        socket.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        // 선택된 방을 변경합니다.
        setSelectedRoom(roomId);
    };

    const quitRoom = () => {
        // 기존에 열린 WebSocket이 있다면 닫습니다.
        if (socket.current) {
            socket.current.close();
        }

        // WebSocket을 엽니다.
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        // WebSocket이 열리면 서버에 입장 메시지를 보냅니다.
        socket.current.onopen = () => {
            console.log("WebSocket Connected");
            socket.current.send(
                JSON.stringify({
                    type: "QUIT",
                    roomId: selectedRoom,
                    mem_id: "rabbit@naver.com",
                    sender: username,
                })
            );

            console.log(`quitRoom: ${selectedRoom}`);
            socket.current.close();
            setSelectedRoom(null);
        };

        // // WebSocket이 열려 있다면 메시지를 보내고 연결을 닫습니다.
        // if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        //     socket.current.send(
        //         JSON.stringify({
        //             type: "QUIT",
        //             roomId: selectedRoom,
        //             mem_id: "rabbit@naver.com",
        //             sender: username,
        //         })
        //     );

        //     console.log(`quitRoom: ${roomId}`);
        //     socket.current.close();
        //     setSelectedRoom(null);
        // }
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
