import React, { useEffect, useRef, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "../../styles/WriteModal.css";
import axios from "axios";
import { useSelector } from "react-redux";

function WriteModal({ onClose, fetchWithMePost, withMe_x, withMe_y }) {
    const user = useSelector((state) => state.user);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);

    const [userId, setUserId] = useState(user.mem_id);
    const [userNickName, setUserNickName] = useState(user.mem_nickname);
    const [roomId, setRoomId] = useState("");

    const socket = useRef(); // useRef로 socket을 생성
    useEffect(() => {
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
    }, []);

    const nextStep = (data) => {
        const updatedFormData = { ...formData, ...data };
        setFormData(updatedFormData);
        console.log("데이터 취합 확인:", updatedFormData);
        setStep(step + 1);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const sendDataToBackend = async (finalData) => {
        const data = {
            withMe_pnum: formData.withMe_pnum,
            mem_id: userId,
            withMe_x: withMe_x,
            withMe_y: withMe_y,
            withMe_gender: formData.withMe_gender,
            withMe_sdate: formData.withMe_sdate,
            withMe_edate: formData.withMe_edate,
            withMe_title: finalData.post.withMe_title,
            withMe_content: finalData.post.withMe_content,
            room_id: roomId,
        };

        // data 모든 속성을 배열로 저장
        const keys = Object.keys(data);

        // data안에 있는 값들 중 null 값을 체크하고 있으면 함수를 종료함
        keys.forEach((key) => {
            if (data[key] === null || data[key] === undefined) {
                return;
            }
        });

        const createRoom = async () => {
            // 채팅방 만들기
            if (finalData.post.withMe_title.trim()) {
                try {
                    const response = await axios.post("/chat/createRoom", null, {
                        params: { name: finalData.post.withMe_title },
                    });

                    // 채팅방을 만들면 만든 사람은 만듦과 동시에 입장시키는 게 자연스러움.
                    const roomId = response.data.room.roomId;
                    setRoomId(roomId);
                    data.room_id = roomId;

                    console.log("룸 아이디값:" + data.room_id);

                    enterRoom(roomId);
                } catch (error) {
                    console.error("Error creating room:", error);
                }
            }
        };
        const enterRoom = async (roomId) => {
            console.log(`방 입장: ${roomId}`);

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

        await createRoom();

        try {
            console.log("전달되기 전 room_id값: ", data.room_id);
            const formDataToSend = new FormData();
            formDataToSend.append(
                "post",
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );
            if (finalData.post.image) {
                formDataToSend.append("image", finalData.post.image);
            }

            const response = await axios.post("http://localhost:3000/withme/new", formDataToSend);

            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            console.log("Backend response:", response.data);

            onClose();
        } catch (error) {
            console.error("Error sending data to backend:", error);
            console.error("Error details:", error.response?.data);
        }

        fetchWithMePost();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Step1
                        onNext={(startDate, endDate) =>
                            nextStep({ withMe_sdate: startDate, withMe_edate: endDate })
                        }
                    />
                );
            case 2:
                return (
                    <Step2 onNext={(selectedPeople) => nextStep({ withMe_pnum: selectedPeople })} />
                );
            case 3:
                return (
                    <Step3
                        onNext={(selectedGender) => nextStep({ withMe_gender: selectedGender })}
                    />
                );
            case 4:
                return (
                    <Step4
                        onSubmit={(post) =>
                            sendDataToBackend({
                                post,
                            })
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {renderStep()}
                {/* <input type="file" onChange={handleFileChange} /> */}
            </div>
        </div>
    );
}

export default WriteModal;
