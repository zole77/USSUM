import React, { useState } from 'react';

function Step4({ onSubmit, onClose }) {
  const [title, setTitle] = useState(''); // 글 제목 상태
  const [content, setContent] = useState(''); // 글 내용 상태
  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태

  // 이미지 선택 이벤트 핸들러
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // 선택된 이미지의 미리보기 생성
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  // 글 제출 이벤트 핸들러
  const handleSubmit = () => {
    // 제목, 내용, 이미지를 가지고 onSubmit 콜백 함수 호출
    onSubmit({ withMe_title: title, withMe_content: content, image });
  };

  return (
    <div className="Step4">
      {/* 글 제목 입력란 */}
      <label htmlFor="title-input" className="input-label">제목</label>
      <input
        id="title-input"
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* 글 내용 입력란 */}
      <label htmlFor="content-input" className="input-label">본문</label>
      <textarea
        id="content-input"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {/* 이미지 업로드 버튼 */}
      <label htmlFor="image-upload" className="image-upload-label">이미지 업로드</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {/* 이미지 미리보기 */}
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Selected" />
        </div>
      )}
      {/* 글 제출 버튼 */}
      <div className="button-container">
        <button onClick={handleSubmit}>글 작성 완료</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Step4;
