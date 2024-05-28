import React, { useEffect, useRef, useState } from "react";
import { PiHandsClapping, PiHandsClappingBold } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import "../../styles/BoardReadModal.css";
import "../../styles/BoardStyle.css";
import defaultProfile from "../../img/defaultProfile.png";
import axios from "axios";
import ReactDOM from "react-dom";

function Boardread(props) {
    let find = props.boardList.find((x) => x.post_no === props.postId);
    const modalBackground = useRef();
    const [isBold, setIsBold] = useState(true);
    // postNo와 memId 상태를 생성하고 관리합니다.
    const [postNo, setPostNo] = useState(find.post_no);
    const [memId, setMemId] = useState("test1010");
    // 댓글 상태를 생성하고 관리
    const [comments, setComments] = useState([]);
    //totalClap을 업데이트하면서 재렌더링
    const [totalClap, setTotalClap] = useState(find.total_clap);
    const [deltemodalOpen, setDeleteModalOpen] = useState(false);

    const handleCommentSubmit = (newComment) => {
        setComments([...comments, newComment]);
    };

    const handleClap = async () => {
        setIsBold(false);
        const url = "http://localhost:3000/board/addClap";

        const requestBody = {
            post_no: postNo,
            mem_id: memId,
        };

        try {
            const response = await axios.post(url, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setTotalClap(response.data.totalClap);
        } catch (error) {
            console.error("Error 발생", error.message); // 명확한 에러 메시지 출력
        }

        setTimeout(() => {
            setIsBold(true);
        }, 1);
    };

    const deletePost = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/board/delete/${postNo}`);
            console.log(response.data);
            props.fetchPosts();
            props.setReadModalOpen(false);
            document.body.style.overflow = "";
        } catch (error) {
            console.error("게시글 삭제 에러: ", error);
        }
    };
    // 전체 게시글 리스트에서 id가 props로 넘겨온 postId와 같은 데이터인 데이터를 추출하기
    // 전체 게시글 리스트를 순회하면서 게시글.id === postId인지 비교 그 값이 true면 게시글 데이터를 추출
    // find는 boardList에서 게시글 고유 id와 일치하는 게시글의 JSON 값을 가지고 있음
    document.body.style.overflow = "hidden";
    return (
        <div className="board-modal-overlay">
            <div
                className="board-modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        props.fetchPosts();
                        setTotalClap(totalClap);
                        props.setReadModalOpen(false);
                        document.body.style.overflow = "";
                    }
                }}
            >
                <div
                    className="board-modal-content"
                    style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                >
                    <p className="modal-header">
                        USSUM 여행 커뮤니티
                        <IoIosClose
                            className="modal-x"
                            onClick={() => {
                                props.fetchPosts();
                                props.setReadModalOpen(false);
                                document.body.style.overflow = "";
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </p>
                    <div className="author-created">
                        <p>{find.mem_id}</p>
                        <p style={{ marginLeft: "auto" }}>{find.post_date}</p>
                    </div>
                    <p style={{ margin: "20px 0", fontSize: "2rem", color: "#007bff" }}>
                        {find.post_title}
                    </p>
                    <div
                        className="post-content"
                        style={{
                            width: "100%",
                            height: "300px",
                            textAlign: "left",
                        }}
                    >
                        {find.post_content}
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
                        <span>{totalClap}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                        <button
                            onClick={() => {
                                props.setReadModalOpen(false);
                                props.setPostId(postNo);
                                console.log(props.postId);
                                props.setUpdateModalOpen(true);
                            }}
                        >
                            글 수정
                        </button>
                        <button
                            onClick={() => {
                                setDeleteModalOpen(true);
                            }}
                        >
                            글 삭제
                        </button>
                    </div>

                    <BoardDelete
                        postNo={postNo}
                        deletePost={deletePost}
                        deltemodalOpen={deltemodalOpen}
                        setDeleteModalOpen={setDeleteModalOpen}
                    />
                    <CommentForm handleCommentSubmit={handleCommentSubmit} />
                    <CommentBox comments={comments} />
                </div>
            </div>
        </div>
    );
}

function BoardDelete(props) {
    const modalBackground = useRef();
    if (props.deltemodalOpen) {
        return (
            <div
                className="modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        props.setDeleteModalOpen(false);
                    }
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff",
                        width: "350px",
                        height: "150px",
                        borderRadius: "10px",
                        marginLeft: "50px",
                        marginRight: "50px",
                        padding: "15px",
                    }}
                >
                    진짜 삭제하실?
                    <button
                        onClick={() => {
                            props.setDeleteModalOpen(false);
                        }}
                    >
                        아니
                    </button>
                    <button
                        onClick={() => {
                            props.deletePost();
                            props.setDeleteModalOpen(false);
                        }}
                    >
                        응
                    </button>
                </div>
            </div>
        );
    }
}

function CommentBox(props) {
    return (
        <div>
            <h2 style={{ textAlign: "left" }}>댓글 목록</h2>
            {props.comments.map((comment, index) => (
                <div className="user-commnet" key={index}>
                    <div className="img-container" style={{ width: "100px", height: "100px" }}>
                        <img
                            src={defaultProfile}
                            alt="profile"
                            style={{ marginTop: "10px", width: "75px", height: "75px" }}
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
