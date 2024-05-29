import React, { useEffect, useState } from "react";
import "../../styles/FriendProfile.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function FriendProfile(props) {
    const [friendInfo, setFriendInfo] = useState(null);
    const [frinedPimage, setFriendPimage] = useState();

    const loadFriendInfo = async () => {
        console.log(props.otherUserId);
        const response = await axios.get(
            `http://localhost:3000/member/one?mem_id=${props.otherUserId}`
        );
        setFriendInfo(response.data);
        setFriendPimage(`http://localhost:3000/member/image/${response.data.mem_image}`);
        console.log(friendInfo);
        return response.data;
    };

    useEffect(() => {
        if (props.otherUserId !== null) {
            loadFriendInfo();
        }
    }, [props.otherUserId]);

    return (
        <div className="friendprofile-container">
            {friendInfo === null ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "100%",
                        minHeight: "100%",
                        padding: "15px",
                    }}
                >
                    <div>친구의 정보를 불러와요!</div>
                    <div
                        className="room-quit"
                        onClick={() => {
                            props.quitRoom();
                        }}
                    >
                        채팅방 나가기
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "100%",
                        minHeight: "100%",
                        padding: "15px",
                    }}
                >
                    <div className="profileimg-container">
                        <img
                            src={frinedPimage}
                            alt="profile"
                            style={{
                                marginTop: "30px",
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}
                        ></img>
                    </div>
                    <div className="friend-info">
                        <div className="friend-name">{friendInfo.mem_nickname}</div>
                        {/*<div className="friend-age">나이</div>*/}
                        <div className="friend-gender">{friendInfo.mem_gender}</div>
                        {/*<div className="ondo">온도</div>*/}
                    </div>
                    <div className="friend-tendency">{friendInfo.mem_type}</div>

                    <div
                        className="room-quit"
                        onClick={() => {
                            props.quitRoom();
                        }}
                    >
                        채팅방 나가기
                    </div>
                </div>
            )}
        </div>
    );
}

export default FriendProfile;
