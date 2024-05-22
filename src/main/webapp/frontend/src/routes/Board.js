import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import boardData from "../boardData.js";
import Boardwrite from "../components/commu/Boardwrite.js";
import Boardread from "../components/commu/Boardread.js";
import Boardupdate from "../components/commu/Boardupdate.js";
import "../styles/BoardStyle.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Board(props) {
    const user = useSelector((state) => state.user);
    const [boardCategory, setboardCategory] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [readmodalOpen, setReadModalOpen] = useState(false);
    const [updatemodalOpen, setUpdateModalOpen] = useState(false);

    const [postId, setPostId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [btn1Toggled, setBtn1Toggled] = useState(true);
    const [btn2Toggled, setBtn2Toggled] = useState(false);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [userId, setUserId] = useState(user.mem_id);
    const [userNickName, setUserNickName] = useState(user.mem_nickname);

    const postsPerPage = 10;

    console.log(userNickName);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("board/allposts");
            setBoardList(response.data); // API에서 받아온 게시글을 state에 저장
            setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 업데이트
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false); // 오류가 발생하더라도 로딩 상태를 false로 업데이트
        }
    };

    // 게시글을 가져오는 useEffect 추가
    useEffect(() => {
        fetchPosts();
    }, []); // []를 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    useEffect(() => {
        setHotPosts(boardList.filter((post) => post.total_clap >= 50));
    }, [boardList]);

    useEffect(() => {
        const reversedBoardList = [...boardList];
        const reversedHotBoardList = [...hotPosts];

        if (boardCategory === 1) {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const newCurrentPosts = reversedBoardList.slice(indexOfFirstPost, indexOfLastPost);
            setCurrentPosts(newCurrentPosts);
        } else {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const newCurrentPosts = reversedHotBoardList.slice(indexOfFirstPost, indexOfLastPost);
            setCurrentPosts(newCurrentPosts);
        }
    }, [currentPage, boardCategory, boardList, hotPosts]);

    // 페이지 번호 목록 렌더링

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 메시지 표시
    }
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
        setCurrentPage(1);
    };

    const handleBtn2Click = () => {
        setBtn1Toggled(false);
        setBtn2Toggled(true);
        setCurrentPage(1);
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
                        <p style={{ textAlign: "center" }}>번호</p>
                        <h5 style={{ textAlign: "center" }}>제목</h5>
                        <span style={{ textAlign: "center" }}>작성자</span>
                        <span style={{ textAlign: "center" }}>작성일</span>
                    </div>
                </div>

                {/* 배열 역순으로 게시글 정렬 */}
                {currentPosts.map((post) => {
                    return (
                        <div className="list">
                            <CommuPost
                                key={post.id}
                                boardList={post}
                                readmodalOpen={readmodalOpen}
                                setReadModalOpen={setReadModalOpen}
                                setPostId={setPostId}
                                setUpdateModalOpen={setUpdateModalOpen}
                            />
                            {updatemodalOpen ? (
                                <Boardupdate
                                    fetchPosts={fetchPosts}
                                    key={`${post.id}_update`} // 각 요소의 key 값을 수정하면서 중복을 피합니다.
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
                                    key={`${post.id}_read`} // 각 요소의 key 값을 수정하면서 중복을 피합니다.
                                    fetchPosts={fetchPosts}
                                    boardList={boardList}
                                    readmodalOpen={readmodalOpen}
                                    setReadModalOpen={setReadModalOpen}
                                    setUpdateModalOpen={setUpdateModalOpen}
                                    postId={postId}
                                    setPostId={setPostId}
                                />
                            ) : (
                                ""
                            )}
                        </div>
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

                <Boardwrite
                    userId={userId}
                    userNickName={userNickName}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    fetchPosts={fetchPosts}
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
            <p>{props.boardList.post_no}</p>
            <h5
                onClick={() => {
                    props.setReadModalOpen(true);
                    props.setPostId(props.boardList.post_no);
                }}
            >
                {props.boardList.post_title}
            </h5>
            <span>{props.boardList.mem_id}</span>
            <span>{props.boardList.post_date}</span>
        </div>
    );
}

export default Board;
