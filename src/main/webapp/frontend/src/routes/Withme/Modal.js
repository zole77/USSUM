import React from "react";
import '../../styles/Modal.css';

function Modal({ title }) {
    return (
        <div className="modal">
            <h3>{title}</h3>
            <p>안녕하세요</p>
        </div>
    );
}

export default Modal;
