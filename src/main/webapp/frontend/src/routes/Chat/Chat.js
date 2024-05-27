import React, { useEffect, useRef, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatRoom from "../../components/chat/ChatRoom";
import FriendProfile from "../../components/chat/FriendProfile";
import axios from "axios";
import { useSelector } from "react-redux";
import { GiConsoleController } from "react-icons/gi";
import "../../styles/Chat.css";

function Chat(props) {
    const user = useSelector((state) => state.user);
    const [selectedRoom, setSelectedRoom] = useState(null); // 현재 선택된 방을 관리하는 state
    const [newRoomName, setNewRoomName] = useState(""); // 채팅방 이름 저장할 state
    const [rooms, setRooms] = useState([]); // 사용자가 참여한 채팅방 목록
    const [lastMessage, setLastMessage] = useState(""); // 채팅방의 가장 최근 메세지를 저장할 state

    const [userId, setUserId] = useState(user.mem_id);
    const [userNickName, setUserNickName] = useState(user.mem_nickname);

    const socket = useRef(); // useRef로 socket을 생성

    const fetchRooms = async () => {
        // 사용자가 참여한 채팅방 목록을 불러옴, roomId와, roomName을 받음
        try {
            const response = await axios.get("/chat/getRooms", {
                params: {
                    memId: userId,
                },
            });
            setRooms(response.data);
        } catch (error) {
            console.error("채팅방 로딩 에러", error);
        }
    };

    const isJoinedRoom = async (roomId) => {
        try {
            const response = await axios.get(`/chat/${roomId}/members`, {
                params: {
                    mem_id: userId,
                },
            });
            if (response.data) {
                console.log(`${userId}가 이미 참여 중임`);
                return true;
            }
            return false; // true 또는 false
        } catch (error) {
            console.error("Error checking member in room:", error);
            return false;
        }
    };

    const createRoom = async () => {
        // 채팅방 만들기
        if (newRoomName.trim()) {
            try {
                const response = await axios.post("/chat/createRoom", null, {
                    params: { name: newRoomName },
                });

                // 채팅방을 만들면 만든 사람은 만듦과 동시에 입장시키는 게 자연스러움.
                const roomId = response.data.room.roomId;

                setNewRoomName("");
                fetchRooms();
                enterRoom(roomId);
            } catch (error) {
                console.error("Error creating room:", error);
            }
        }
    };

    const enterRoom = async (roomId) => {
        // 선택된 방을 변경합니다.
        setSelectedRoom(roomId);

        console.log(`방 입장: ${roomId}`);
        console.log(socket.current);

        const response = await axios.get(`/chat/${roomId}/members`, {
            // 해당 유저가 이미 그 방에 있는지 확인
            params: {
                mem_id: userId,
            },
        });
        if (!response.data) {
            // 유저가 그 방에 없으면 DB에 추가
            socket.current.send(
                JSON.stringify({
                    type: "ENTER",
                    roomId: roomId,
                    mem_id: userId,
                    sender: userNickName,
                })
            );
        }
    };

    const quitRoom = () => {
        // WebSocket이 열려 있을 경우에만 메시지를 보냅니다.
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(
                JSON.stringify({
                    type: "QUIT",
                    roomId: selectedRoom,
                    mem_id: userId,
                    sender: userNickName,
                })
            );

            console.log(`quitRoom: ${selectedRoom}`);
        }

        // WebSocket을 닫습니다.
        if (socket.current) {
            socket.current.close();
        }

        setSelectedRoom(null);
    };

    useEffect(() => {
        // Chat.js를 실행시켰을 때 최초로 채팅방 목록을 불러옴
        // 웹소켓 연결을 한 번 종료했더라도, 새로 방이 선택됐을 때 웹소켓 연결이 되야하므로 selectedRoom state값을 의존성으로 넘김
        fetchRooms();

        // WebSocket 연결
        socket.current = new WebSocket(`ws://localhost:8080/ws/chat`);

        socket.current.onopen = (event) => {
            console.log("웹소켓 연결됨 good");
        };

        // WebSocket 닫혔을 때
        socket.current.onclose = (event) => {
            console.log("WebSocket Connection Closed", event);
            if (event.code === 1006) {
                console.error("Connection closed abnormally");
            }
        };

        // WebSocket 에러 발생
        socket.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        return () => {
            socket.current.close();
        };
    }, [selectedRoom]);

    return (
        <div className="chat-layout">
            <div className="function-name">채팅</div>
            <div className="chat-container">
                <div className="chat-list-container">
                    <ChatList
                        rooms={rooms}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        enterRoom={enterRoom}
                        socket={socket.current}
                    />
                </div>
                <div className="chat-room-container">
                    {selectedRoom && (
                        <>
                            <ChatRoom
                                roomId={selectedRoom}
                                userId={userId}
                                userNickName={userNickName}
                                socket={socket.current}
                            />
                        </>
                    )}
                </div>
                <div className="chat-friendprofile-container">
                    <FriendProfile quitRoom={quitRoom} />
                </div>
            </div>
        </div>
    );
}

export default Chat;
