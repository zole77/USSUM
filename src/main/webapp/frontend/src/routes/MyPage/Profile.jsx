import React, { useState } from "react";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);

            // 이미지 업로드 처리
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            formData.append("data", new Blob([JSON.stringify({ mem_id: user.mem_id })], { type: "application/json" }));

            try {
                const response = await axios.post("/member/modify", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status !== 200) {
                    console.error("프로필 이미지 업데이트 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("프로필 이미지 업데이트 중 오류 발생:", error);
            }
        }
    };

    const handleImageClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="profile-header-content">
            <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
            />
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default Profile;
