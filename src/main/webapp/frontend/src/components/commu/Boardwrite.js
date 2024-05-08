import React, { useRef } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import "../../App.css";
import axios from "axios";

function Boardwrite(props) {
    const modalBackground = useRef();
    const editorRef = useRef(null);

    const onSubmitBtnClick = () => {
        const content = editorRef.current.getInstance().getMarkdown();
        alert(content);
    };

    // const handleImageUpload = async (blob) => {
    //     console.log('업로드 된 이미지 파일:', blob);

    //     // 에디터에 이미지 삽입
    //     const markdown = editorRef.current.getInstance().getMarkdown();
    //     const htmlElement = editorRef.current.getInstance().getHTML();

    //     const json = JSON.stringify(htmlElement);
    //     console.log(json);
    //     return onchange(json)
    // };

    return (
        <div>
            {props.modalOpen ? (
                <div
                    className="modal-container"
                    ref={modalBackground}
                    onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            props.setModalOpen(false);
                        }
                    }}
                >
                    <div className="modal-content" style={{ backgroundColor: "#fff" }}>
                        <p>글쓰기 모달창</p>
                        <p>
                            제목
                            <input
                                placeholder="제목을 입력해보자"
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
                            initialValue=" "
                            initialEditType="wysiwyg"
                        />
                        <button
                            className="modal-close-btn"
                            onClick={() => {
                                onSubmitBtnClick();
                                props.setModalOpen(false);
                            }}
                        >
                            등록하기
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Boardwrite;
