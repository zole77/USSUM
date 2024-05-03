import React from 'react';

function ModalDetail({ title, content }) {
  return (
    <div className="modal-details">
      <h3>{title} 상세 정보</h3>
      <p>{content}</p>
    </div>
  );
}

export default ModalDetail;
