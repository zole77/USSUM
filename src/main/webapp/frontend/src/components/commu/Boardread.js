import React, { useRef } from "react";

function Boardread(props) {
    const modalBackground = useRef();

    // 전체 게시글 리스트에서 id가 props로 넘겨온 postId와 같은 데이터인 데이터를 추출하기
    // 전체 게시글 리스트를 순회하면서 게시글.id === postId인지 비교 그 값이 true면 게시글 데이터를 추출
    // find는 boardList에서 게시글 고유 id와 일치하는 게시글의 JSON 값을 가지고 있음
    let find = props.boardList.find((x) => x.id === props.postId);
    let text = find.content;
    return (
        <div>
            <div
                className="modal-container"
                ref={modalBackground}
                onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        props.setReadModalOpen(false);
                    }
                }}
            >
                <div
                    className="modal-content"
                    style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                >
                    <p>글 읽기 모달창</p>
                    <p>{props.postId}</p>
                    <p>글 상세</p>
                    <div
                        className="post-content"
                        style={{
                            width: "100%",
                            height: "300px",
                            border: "3px",
                            borderColor: "black",
                            borderStyle: "solid",
                        }}
                    >
                        {text}
                    </div>
                    <button>박수</button>
                    <button
                        className="modal-close-btn"
                        onClick={() => {
                            props.setReadModalOpen(false);
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Boardread;
