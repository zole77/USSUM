import React from "react";
import defaultProfile from "../../img/defaultProfile.png";

const Profile = () => {
  return (
    <div className="profile-header-content">
      <img src={defaultProfile} alt="Profile" className="profile-image" />
    </div>
  );
};

export default Profile;
