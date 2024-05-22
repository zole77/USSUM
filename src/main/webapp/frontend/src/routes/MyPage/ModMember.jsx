import React, { useState } from "react";
import "../../styles/ModMember.css";
import Profile from "./Profile"; // Profile 컴포넌트 가져오기

const ModMember = () => {
  const [formData, setFormData] = useState({
    mem_id: "",
    mem_pwd: "",
    mem_phone: "",
    mem_birth: "",
    mem_address: "",
    mem_type: "",
    mem_nickname: "",
  });

  const [view, setView] = useState("edit"); // 'edit' or 'mylog'

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
    <div className="profile-edit-container">
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <Profile
          onEditClick={() => setView("edit")}
          onMyLogClick={() => setView("mylog")}
          activeButton={view}
        />
        {view === "edit" && (
          <>
            <table className="profile-edit-table">
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_id">아이디</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      id="mem_id"
                      value={formData.mem_id}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_pwd">비밀 번호</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="password"
                      id="mem_pwd"
                      value={formData.mem_pwd}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="confirm_mem_pwd">비밀 번호 확인</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="password"
                      id="confirm_mem_pwd"
                      value={formData.mem_pwd}
                      readOnly
                    />
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
                          name="mem_type"
                          value="male"
                          checked={formData.mem_type === "male"}
                          onChange={handleChange}
                        />
                        <label htmlFor="genderMale">남성</label>
                      </div>
                      <div className="gender-option">
                        <input
                          type="radio"
                          id="genderFemale"
                          name="mem_type"
                          value="female"
                          checked={formData.mem_type === "female"}
                          onChange={handleChange}
                        />
                        <label htmlFor="genderFemale">여성</label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_birth">생년월일</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="date"
                      id="mem_birth"
                      name="mem_birth"
                      value={formData.mem_birth}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_phone">휴대전화</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      id="mem_phone"
                      name="mem_phone"
                      value={formData.mem_phone}
                      onChange={handleChange}
                      placeholder="예) 010-1234-5678"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_nickname">닉네임</label>
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      id="mem_name"
                      name="mem_name"
                      value={formData.mem_name}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="mem_address">주소</label>
                  </td>
                  <td className="input-cell">
                    <textarea
                      id="mem_address"
                      name="mem_address"
                      value={formData.mem_address}
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
          </>
        )}
        {view === "mylog" && (
          <div className="mylog-container">
            <h2>마이 로그</h2>
            {/* 여기에 마이 로그 내용을 추가하세요 */}
          </div>
        )}
      </form>
    </div>
  );
};

export default ModMember;
