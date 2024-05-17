import React, { useState } from "react";
import "../../styles/Mod_Member.css";

const Mod_Member = () => {
  const [formData, setFormData] = useState({
    photo: "",
    country: "",
    gender: "",
    birthDate: "",
    homePhone: "",
    mobilePhone: "",
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the backend
    console.log(formData);
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>아이디</label>
        <input type="text" value=" " readOnly />
      </div>
      <div className="form-group">
        <label>비밀 번호</label>
        <input type="password" value="" readOnly />
      </div>
      <div className="form-group">
        <label>비밀 번호 확인</label>
        <input type="password" value="" readOnly />
      </div>

      <div className="form-group">
        <label>성별</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />{" "}
          남자
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />{" "}
          여자
        </div>
      </div>
      <div className="form-group">
        <label>생년월일</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>휴대전화 </label>
        <input
          type="text"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
          placeholder="예) 010-1234-5678"
        />
      </div>
      <div className="form-group">
        <label>성명</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>주소</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit">저장</button>
        <button type="button">취소</button>
      </div>
    </form>
  );
};

export default Mod_Member;
