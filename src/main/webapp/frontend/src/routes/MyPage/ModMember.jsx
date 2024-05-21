import React, { useState } from "react";
import "../../styles/ModMember.css";
import defaultProfile from "../../img/defaultProfile.png";

const ModMember = () => {
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
      <table className="profile-edit-table">
        <thead>
          <tr>
            <th colSpan="2" className="profile-header">
              <div className="profile-header-content">
                <img
                  src={defaultProfile}
                  alt="Profile"
                  style={{ width: "150px", height: "auto", margin: "25px" }}
                />
                <div className="profile-buttons">
                  <div className="button-group">
                    <button type="button" className="profile-button">
                      정보 수정
                    </button>
                    <button type="button" className="profile-button">
                      마이 로그
                    </button>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label-cell">
              <label htmlFor="userId">아이디</label>
            </td>
            <td className="input-cell">
              <input type="text" id="userId" value=" " readOnly />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="password">비밀 번호</label>
            </td>
            <td className="input-cell">
              <input type="password" id="password" value="" readOnly />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="confirmPassword">비밀 번호 확인</label>
            </td>
            <td className="input-cell">
              <input type="password" id="confirmPassword" value="" readOnly />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label>성별</label>
            </td>
            <td className="input-cell">
              <div className="gender-options">
                <div className="gender-option">
                  <input
                    type="radio"
                    id="genderMale"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  <label htmlFor="genderMale">남성</label>
                </div>
                <div className="gender-option">
                  <input
                    type="radio"
                    id="genderFemale"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  <label htmlFor="genderFemale">여성</label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="birthDate">생년월일</label>
            </td>
            <td className="input-cell">
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="mobilePhone">휴대전화</label>
            </td>
            <td className="input-cell">
              <input
                type="text"
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                placeholder="예) 010-1234-5678"
              />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="name">성명</label>
            </td>
            <td className="input-cell">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label-cell">
              <label htmlFor="address">주소</label>
            </td>
            <td className="input-cell">
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="form-actions">
        <button type="button" className="btn-hover color">
          취소
        </button>
        <button type="submit" className="btn-hover color">
          저장
        </button>
      </div>
    </form>
  );
};

export default ModMember;
