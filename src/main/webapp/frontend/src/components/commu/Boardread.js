import React, { useRef, useState } from "react";
import { PiHandsClapping, PiHandsClappingBold } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import "../../styles/BoardReadModal.css";
import profile from "../../img/defaultProfile.png";

function Boardread(props) {
    const modalBackground = useRef();
    let find = props.boardList.find((x) => x.id === props.postId);
    const [isBold, setIsBold] = useState(true);

    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (newComment) => {
        setComments([...comments, newComment]);
    };

    const handleClap = () => {
        setIsBold(false);
        find.clap += 1;
        setTimeout(() => {
            setIsBold(true);
        }, 50);
    };

    // 전체 게시글 리스트에서 id가 props로 넘겨온 postId와 같은 데이터인 데이터를 추출하기
    // 전체 게시글 리스트를 순회하면서 게시글.id === postId인지 비교 그 값이 true면 게시글 데이터를 추출
    // find는 boardList에서 게시글 고유 id와 일치하는 게시글의 JSON 값을 가지고 있음
    document.body.style.overflow = "hidden";
    return (
        <div>
            <div
                className="modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        props.setReadModalOpen(false);
                        document.body.style.overflow = "";
                    }
                }}
            >
                <div
                    className="modal-content"
                    style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                >
                    <h5 className="modal-header">
                        USSUM 여행 커뮤니티
                        <IoIosClose
                            className="modal-x"
                            onClick={() => {
                                props.setReadModalOpen(false);
                                document.body.style.overflow = "";
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </h5>
                    <div className="author-created">
                        <p>작성자 ID</p>
                        <p style={{ marginLeft: "auto" }}>created</p>
                    </div>
                    <p style={{ margin: "20px 0", fontSize: "2rem", color: "#007bff" }}>
                        {find.title}
                    </p>
                    <div
                        className="post-content"
                        style={{
                            width: "100%",
                            height: "300px",
                            textAlign: "left",
                        }}
                    >
                        {find.content}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            userSelect: "none",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isBold ? (
                            <PiHandsClappingBold
                                style={{
                                    fontSize: "50px",
                                    color: "black",
                                }}
                                onClick={handleClap}
                            />
                        ) : (
                            <PiHandsClapping
                                style={{
                                    fontSize: "50px",
                                    color: "black",
                                }}
                            />
                        )}
                        <span>{find.clap}</span>
                    </div>
                    <CommentForm handleCommentSubmit={handleCommentSubmit} />
                    <CommentBox comments={comments} />
                </div>
            </div>
        </div>
    );
}

function CommentBox(props) {
    return (
        <div>
            <h2 style={{ textAlign: "left" }}>댓글 목록</h2>
            {props.comments.map((comment, index) => (
                <div className="user-commnet" key={index}>
                    <div className="img-container" style={{ width: "100px", height: "100px" }}>
                        <img
                            src={profile}
                            alt="profile"
                            style={{ width: "100px", height: "100px" }}
                        ></img>
                    </div>
                    <div className="commentDiv">
                        <p>댓글 작성자 ID</p>
                        <p>{comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CommentForm({ handleCommentSubmit }) {
    const [comment, setComment] = useState("");

    // textarea 값 가져옴
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    // 댓글 등록 버튼을 누르면
    const handleSubmit = (e) => {
        e.preventDefault(); // 이벤트 기본 동작 취소
        if (!comment.trim()) return;
        handleCommentSubmit(comment); // 수정된 부분
        setComment("");
    };

    return (
        <form className="comment-container" onSubmit={handleSubmit}>
            <textarea
                className="comment-input"
                style={{ width: "100%" }}
                value={comment}
                onChange={handleChange}
                placeholder="댓글을 입력하세요..."
                rows="4"
                cols="50"
            />
            <button className="commentBtn" type="submit">
                댓글 작성
            </button>
        </form>
    );
}

export default Boardread;
