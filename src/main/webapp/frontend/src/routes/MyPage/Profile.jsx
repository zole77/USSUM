import React from "react";
import defaultProfile from "../../img/defaultProfile.png";

const Profile = ({ onEditClick, onMyLogClick, activeButton }) => {
  return (
    <div className="profile-header-content">
      <img src={defaultProfile} alt="Profile" className="profile-image" />
      <div className="profile-buttons">
        <button
          type="button"
          className={`profile-button ${activeButton === "edit" ? "" : "inactive"}`}
          onClick={onEditClick}
        >
          정보 수정
        </button>
        <button
          type="button"
          className={`profile-button ${activeButton === "mylog" ? "" : "inactive"}`}
          onClick={onMyLogClick}
        >
          마이 로그
        </button>
      </div>
    </div>
  );
};

export default Profile;
