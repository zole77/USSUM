import React from "react";
import "../styles/Modal.css";

function Modal({ title }) {
    return (
        <div className="modal">
            <h3>{title}</h3>
            <p>모달 내용</p>
        </div>
    );
}

export default Modal;
