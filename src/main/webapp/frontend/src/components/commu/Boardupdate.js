import React, { useRef } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import "../../App.css";

function Boardupdate(props) {
    const modalBackground = useRef();
    const editorRef = useRef(null);

    const onSubmitBtnClick = () => {
        const content = editorRef.current.getInstance().getMarkdown();
        alert(content);
    };

    let find = props.boardList.find((x) => x.id === props.postId);

    return (
        <div>
            {props.updatemodalOpen ? (
                <div
                    className="modal-container"
                    ref={modalBackground}
                    onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            props.setUpdateModalOpen(false);
                        }
                    }}
                >
                    <div className="modal-content" style={{ backgroundColor: "#fff" }}>
                        <p>글 수정 모달창</p>
                        <p>
                            제목
                            <input
                                defaultValue={find.title}
                                style={{
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
                            initialValue={find.content}
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
