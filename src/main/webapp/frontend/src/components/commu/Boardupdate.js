import React, { useRef } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import { IoIosClose } from "react-icons/io";
import "../../App.css";

function Boardupdate(props) {
    const modalBackground = useRef();
    const editorRef = useRef(null);

    const onSubmitBtnClick = () => {
        const content = editorRef.current.getInstance().getMarkdown();
        alert(content);
    };

    let find = props.boardList.find((x) => x.post_no === props.postId);

    return (
        <div>
            {props.updatemodalOpen ? (
                <div
                    className="modal-container"
                    ref={modalBackground}
                    onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            if (editorRef.current.getInstance().getMarkdown().trim()) {
                                if (
                                    window.confirm(
                                        "작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?"
                                    )
                                ) {
                                    props.setUpdateModalOpen(false);
                                }
                            } else {
                                props.setUpdateModalOpen(false);
                            }
                        }
                    }}
                >
                    <div className="modal-content" style={{ backgroundColor: "#fff" }}>
                        <p className="modal-header">
                            USSUM 여행 커뮤니티
                            <IoIosClose
                                className="modal-x"
                                onClick={() => {
                                    props.setUpdateModalOpen(false);
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
                        <p style={{ textAlign: "left" }}>
                            제목
                            <input
                                defaultValue={find.post_title}
                                style={{
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    width: "60%",
                                    height: "32px",
                                    fontSize: "15px",
                                    border: "0",
                                    borderRadius: "15px",
                                    paddingLeft: "10px",
                                    backgroundColor: "rgb(233, 233, 233)",
                                }}
                            ></input>
                        </p>
                        <Editor
                            language="ko-KR"
                            ref={editorRef}
                            height="300px"
                            initialValue={find.post_content || " "}
                            initialEditType="wysiwyg"
                        />
                        <button
                            className="modal-close-btn"
                            onClick={() => {
                                onSubmitBtnClick();
                                props.setUpdateModalOpen(false);
                            }}
                        >
                            수정하기
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Boardupdate;
