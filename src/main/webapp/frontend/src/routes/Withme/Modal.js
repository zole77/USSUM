import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";

function Modal(props) {
    const [withMeThumbnail, setWithMeThumbnail] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadImage = async () => {
        try {
            setWithMeThumbnail(`http://localhost:8080/withme/image/${props.post.withMe_thumbnail}`);
            setLoading(false);
        } catch (error) {
            console.error("Error loading image:", error);
        }
    };

    useEffect(() => {
        if (props.post.withMe_thumbnail !== " ") {
            console.log("이미지 불러옴");
            loadImage();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="withme-post-container">
            <div className="withme-post-thumbnail">
                {withMeThumbnail ? (
                    <img src={withMeThumbnail} alt="Thumbnail" />
                ) : (
                    "No Image Available"
                )}
            </div>
            <div className="withme-post-title">{props.post.withMe_title}</div>
            <div className="withme-post-joininfo">
                <div className="withme-post-gender">{props.post.withMe_gender}</div>
                <div className="withme-post-pnum">{props.post.withMe_pnum}</div>
                <div className="withme-post-date">
                    {props.post.withMe_sdate}~{props.post.withMe_edate}
                </div>
            </div>
        </div>
    );
}

export default Modal;
