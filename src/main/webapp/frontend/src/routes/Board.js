import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import boardData from "../boardData.js";
import Boardwrite from "../components/commu/Boardwrite.js";
import Boardread from "../components/commu/Boardread.js";
import Boardupdate from "../components/commu/Boardupdate.js";
import "../styles/BoardStyle.css";
import "../App.css";

function Board(props) {
    const [boardCategory, setboardCategory] = useState(1);
    const [boardList, setBoardList] = useState(boardData);
    const [hotPosts, setHotPosts] = useState(boardList.filter((post) => post.clap >= 50));
    const [modalOpen, setModalOpen] = useState(false);
    const [readmodalOpen, setReadModalOpen] = useState(false);
    const [updatemodalOpen, setUpdateModalOpen] = useState(false);
    const [deltemodalOpen, setDeleteModalOpen] = useState(false);
    const [postId, setPostId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [btn1Toggled, setBtn1Toggled] = useState(true);
    const [btn2Toggled, setBtn2Toggled] = useState(false);

    const postsPerPage = 10;

    // 전체 boardList를 역순으로 정렬함
    // useRef를 쓰면 재렌더링으로 이 과정을 계속 반복하는걸 막을 수 있음
    const reversedBoardList = useRef([...boardList].reverse());
    const reversedHotBoardList = useRef([...hotPosts].reverse());

    useEffect(() => {
        if (boardCategory === 1) {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const newCurrentPosts = reversedBoardList.current.slice(
                indexOfFirstPost,
                indexOfLastPost
            );
            setCurrentPosts(newCurrentPosts);
        } else {
            // 만약 사용자가 인기 게시글을 보길 원하면
            // clap이 50 이상인 게시글을 정렬해서 보여주자
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            // 정렬할 게시글을 currrentHotPosts로 바꿔줌
            const newCurrentPosts = reversedHotBoardList.current.slice(
                indexOfFirstPost,
                indexOfLastPost
            );
            setCurrentPosts(newCurrentPosts);
        }
    }, [currentPage, boardCategory, reversedBoardList.current]);

    // 페이지 번호 목록 렌더링
    let pageNumbers;
    if (boardCategory === 1) {
        pageNumbers = [];
        for (let i = 1; i <= Math.ceil(boardList.length / postsPerPage); i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers = [];
        for (let i = 1; i <= Math.ceil(hotPosts.length / postsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    // 페이지 번호 클릭 시 해당 페이지로 이동하는 함수
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBtn1Click = () => {
        setBtn1Toggled(true);
        setBtn2Toggled(false);
    };

    const handleBtn2Click = () => {
        setBtn1Toggled(false);
        setBtn2Toggled(true);
    };

    return (
        <div className="boardLayout">
            <div className="Boardwrap">
                <div className="intro">
                    나만의 작은 여행 이야기를 나누는 공간, USSUM 여행 커뮤니티
                </div>
                <div className="category-container">
                    <button
                        className={`categoryBtn ${btn1Toggled ? "toggled" : ""}`}
                        type="button"
                        onClick={() => {
                            setboardCategory(1);
                            handleBtn1Click();
                        }}
                    >
                        전체
                    </button>
                    <button
                        className={`categoryBtn ${btn2Toggled ? "toggled" : ""}`}
                        type="button"
                        onClick={() => {
                            setboardCategory(2);
                            handleBtn2Click();
                        }}
                    >
                        인기글
                    </button>
                </div>

                <div className="list-head">
                    <div className="post-head">
                        <p>번호</p>
                        <h5>제목</h5>
                        <span>작성자</span>
                        <span>작성일</span>
                    </div>
                </div>

                {/* 배열 역순으로 게시글 정렬 */}
                {currentPosts.map((post) => {
                    return (
                        console.log(currentPosts),
                        (
                            <div key={post.id} className="list">
                                <CommuPost
                                    boardList={post}
                                    readmodalOpen={readmodalOpen}
                                    setReadModalOpen={setReadModalOpen}
                                    setPostId={setPostId}
                                    setUpdateModalOpen={setUpdateModalOpen}
                                    setDeleteModalOpen={setDeleteModalOpen}
                                />
                                {updatemodalOpen ? (
                                    <Boardupdate
                                        key={post.id + "_update"} // 각 요소의 key 값을 수정하면서 중복을 피합니다.
                                        boardList={boardList}
                                        updatemodalOpen={updatemodalOpen}
                                        setUpdateModalOpen={setUpdateModalOpen}
                                        postId={postId}
                                    />
                                ) : (
                                    ""
                                )}
                                {readmodalOpen ? (
                                    <Boardread
                                        key={post.id + "_read"} // 각 요소의 key 값을 수정하면서 중복을 피합니다.
                                        boardList={boardList}
                                        readmodalOpen={readmodalOpen}
                                        setReadModalOpen={setReadModalOpen}
                                        postId={postId}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        )
                    );
                })}

                <button
                    className="writeBtn"
                    type="button"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    글쓰기
                </button>

                <Boardwrite modalOpen={modalOpen} setModalOpen={setModalOpen} />
                <BoardDelete
                    deltemodalOpen={deltemodalOpen}
                    setDeleteModalOpen={setDeleteModalOpen}
                />
                <div className="pageBtn-container">
                    {/* 페이지 번호 목록 */}
                    {pageNumbers.map((number) => (
                        <button
                            className="pageBtn"
                            key={number}
                            onClick={() => handleClick(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CommuPost(props) {
    return (
        <div className="post-container">
            {/* 클릭한 글의 상세정보 모달창으로 불러오기 */}
            <p>{props.boardList.id}</p>
            <h5
                onClick={() => {
                    props.setReadModalOpen(true);
                    props.setPostId(props.boardList.id);
                }}
            >
                {props.boardList.title}
            </h5>
            <span>{props.boardList.author}</span>
            <span>{props.boardList.create}</span>
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

export default Board;
