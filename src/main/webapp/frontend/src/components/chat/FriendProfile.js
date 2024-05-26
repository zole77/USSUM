import React from "react";
import "../../styles/FriendProfile.css";
import defaultProfile from "../../img/defaultProfile.png";

function FrinedProfile(props) {
  return (
    <div className="friendprofile-container">
      <div className="profileimg-container">
        <img
          src={defaultProfile}
          alt="profile"
          style={{ marginTop: "30px", width: "80px", height: "80px" }}
        ></img>
      </div>
      <div className="friend-info">
        <div className="friend-name">닉네임</div>
        {/*<div className="friend-age">나이</div>*/}
        <div className="friend-gender">성별</div>
        {/*<div className="ondo">온도</div>*/}
      </div>
      <div className="friend-tendency">성향</div>

      <div className="room-quit">나가기</div>
    </div>
  );
}

export default FrinedProfile;
