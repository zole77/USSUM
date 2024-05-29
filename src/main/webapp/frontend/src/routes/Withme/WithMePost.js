import React, { useEffect, useState } from "react";
import "../../styles/WithmePost.css";
import defaultProfile from "../../img/defaultProfile.png";
import male from "../../img/male.png";
import female from "../../img/female.png";
import axios from "axios";

function WithMePost(props) {
    const [withMeThumbnail, setWithMeThumbnail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postUserInfo, setPostUserInfo] = useState(null);
    const [postUserPimage, setPostUserPimage] = useState(null);

    const loadImage = async () => {
        try {
            setWithMeThumbnail(`http://localhost:3000/withme/image/${props.post.withMe_thumbnail}`);
        } catch (error) {
            console.error("이미지 로드 중 오류 발생:", error);
        }
    };

    const loadPostUserInfo = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/member/one?mem_id=${props.post.mem_id}`
            );
            setPostUserInfo(response.data);
            loadpostUserPimage(response.data.mem_image);
            setLoading(false);
        } catch (error) {
            console.error("게시물 유저 정보 로드 중 오류 발생:", error);
        }
    };

    const loadpostUserPimage = async (image) => {
        try {
            setPostUserPimage(`http://localhost:3000/member/image/${image}`);
        } catch (error) {
            console.error("프로필 이미지 로드 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        if (props.post.withMe_thumbnail !== " ") {
            loadImage();
            loadPostUserInfo();
        } else {
            loadPostUserInfo();
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className="withme-post-container"
            onClick={() => {
                props.setSelectedPost(props.post);
                props.setPostUser(postUserInfo);
                props.setPostThumbnail(withMeThumbnail);
                props.setReadModalOpen(true);
            }}
        >
            <div className="withme-post-thumbnail">
                {withMeThumbnail ? <img src={withMeThumbnail} alt="썸네일" /> : "이미지 없음"}
            </div>
            <div className="withme-postinfo">
                <div className="withme-post-title">{props.post.withMe_title}</div>
                <div className="withme-post-joininfo">
                    <div className="withme-post-gender">
                        {props.post.withMe_gender === "male"
                            ? "남자만"
                            : props.post.withMe_gender === "female"
                            ? "여자만"
                            : "아무나"}{" "}
                        ㅤ{props.post.withMe_pnum}명
                    </div>
                    <div className="withme-post-date">
                        {props.post.withMe_sdate}/{props.post.withMe_edate}
                    </div>
                </div>
                <div className="withme-post-userinfo">
                    <div className="withme-post-userPimage">
                        {postUserPimage ? (
                            <img src={postUserPimage} alt="유저정보"></img>
                        ) : (
                            "이미지 없음"
                        )}
                    </div>
                    <div className="withme-post-user">
                        {postUserInfo && postUserInfo.mem_nickname}
                        {postUserInfo && postUserInfo.mem_gender === "남성" ? (
                            <img
                                src={male}
                                alt="남성"
                                style={{ marginLeft: "5px", width: "15px", height: "15px" }}
                            />
                        ) : (
                            <img
                                src={female}
                                alt="여성"
                                style={{ marginLeft: "5px", width: "15px", height: "15px" }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithMePost;
