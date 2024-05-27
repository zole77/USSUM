import React, { useEffect, useState } from "react";
import "../../styles/FriendProfile.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";

function FriendProfile(props) {
    const [friendInfo, setFriendInfo] = useState(null);

    const loadFriendInfo = async () => {
        console.log(props.otherUserId);
        const response = await axios.get(
            `http://localhost:3000/member/one?mem_id=${props.otherUserId}`
        );
        setFriendInfo(response.data);
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
                <div>친구의 정보를 불러와요!</div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100%",
                        padding: "15px",
                    }}
                >
                    <div className="profileimg-container">
                        <img
                            src={defaultProfile}
                            alt="profile"
                            style={{ marginTop: "30px", width: "80px", height: "80px" }}
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
                        나가기
                    </div>
                </div>
            )}
        </div>
    );
}

export default FriendProfile;
