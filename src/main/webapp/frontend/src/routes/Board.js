import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Boardwrite from "../components/commu/Boardwrite.js";
import Boardread from "../components/commu/Boardread.js";
import Boardupdate from "../components/commu/Boardupdate.js";
import "../styles/BoardStyle.css";

function Board(props) {
    const user = useSelector((state) => state.user);
    const [boardCategory, setboardCategory] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [readmodalOpen, setReadModalOpen] = useState(false);
    const [updatemodalOpen, setUpdateModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [postId, setPostId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [btn1Toggled, setBtn1Toggled] = useState(true);
    const [btn2Toggled, setBtn2Toggled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(user.mem_id);
    const [userNickName, setUserNickName] = useState(user.mem_nickname);
    const [userPimage, setUserPimage] = useState();

    const postsPerPage = 10;
    console.log(boardList);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("board/allposts");
            setBoardList(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    const loadpostUserPimage = async (image) => {
        try {
            setUserPimage(`http://localhost:3000/member/image/${image}`);
        } catch (error) {
            console.error("프로필 이미지 로드 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        loadpostUserPimage(user.mem_image);
    }, []);

    useEffect(() => {
        setHotPosts(boardList.filter((post) => post.total_clap >= 50));
    }, [boardList]);

    useEffect(() => {
        const reversedBoardList = [...boardList];
        const reversedHotBoardList = [...hotPosts];
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        if (boardCategory === 1) {
            const newCurrentPosts = reversedBoardList.slice(indexOfFirstPost, indexOfLastPost);
            setCurrentPosts(newCurrentPosts);
        } else {
            const newCurrentPosts = reversedHotBoardList.slice(indexOfFirstPost, indexOfLastPost);
            setCurrentPosts(newCurrentPosts);
        }
    }, [currentPage, boardCategory, boardList, hotPosts]);

    if (loading) {
        return <div>Loading...</div>;
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
        <div className="Boardwrap">
            <div className="intro">나만의 작은 여행 이야기를 나누는 공간, USSUM 여행 커뮤니티</div>
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
                    <h5 style={{ textAlign: "center", paddingLeft: 0 }}>제목</h5>
                    <span style={{ textAlign: "center" }}>작성자</span>
                    <span style={{ textAlign: "center" }}>작성일</span>
                </div>
            </div>

            {currentPosts.map((post) => (
                <div className="list" key={post.id}>
                    <CommuPost
                        boardList={post}
                        setReadModalOpen={setReadModalOpen}
                        setSelectedPost={setSelectedPost}
                    />
                </div>
            ))}

            <div className="pageBtn-container">
                {pageNumbers.map((number) => (
                    <button className="pageBtn" key={number} onClick={() => handleClick(number)}>
                        {number}
                    </button>
                ))}
            </div>
            <button className="writeBtn" type="button" onClick={() => setModalOpen(true)}>
                글쓰기
            </button>

            {modalOpen && (
                <Boardwrite
                    userId={userId}
                    userNickName={userNickName}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    fetchPosts={fetchPosts}
                />
            )}
            {readmodalOpen && selectedPost && (
                <Boardread
                    userNickName={userNickName}
                    fetchPosts={fetchPosts}
                    boardList={boardList}
                    readmodalOpen={readmodalOpen}
                    setReadModalOpen={setReadModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                    postId={selectedPost.post_no}
                    setPostId={setPostId}
                    userPimage={userPimage}
                />
            )}
            {updatemodalOpen && selectedPost && (
                <Boardupdate
                    fetchPosts={fetchPosts}
                    boardList={boardList}
                    updatemodalOpen={updatemodalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                    postId={postId}
                />
            )}
        </div>
    );
}

function CommuPost(props) {
    return (
        <div className="post-container">
            <p>{props.boardList.post_no}</p>
            <h5
                style={{ paddingLeft: 0 }}
                onClick={() => {
                    props.setReadModalOpen(true);
                    props.setSelectedPost(props.boardList);
                }}
            >
                {props.boardList.post_title}
            </h5>
            <span>{props.boardList.mem_nickname}</span>
            <span>{props.boardList.post_date}</span>
        </div>
    );
}

export default Board;
