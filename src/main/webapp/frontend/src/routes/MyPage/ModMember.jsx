import React, { useEffect, useState } from "react";
import "../../styles/ModMember.css";
import Profile from "./Profile"; // Profile 컴포넌트 가져오기
import axios from "axios"; // axios 가져오기

const ModMember = () => {
  const [formData, setFormData] = useState({
    mem_id: "",
    mem_pwd: "",
    mem_phone: "",
    mem_birth: "",
    mem_address: "",
    mem_type: "",
    mem_gender: "",
    mem_nickname: "",
  });

  const [view, setView] = useState("edit"); // 'edit' or 'mylog'
  const [isEditingPwd, setIsEditingPwd] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");

  // 사용자 정보를 받아오는 함수
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user"); // 실제 사용자 정보를 가져오는 API 엔드포인트로 변경하세요
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePwdEditClick = () => {
    setIsEditingPwd(!isEditingPwd);
  };

  const handlePwdChangeClick = () => {
    // 비밀번호 변경 로직을 여기에 추가하세요
    console.log("Password changed:", formData.mem_pwd, confirmPwd);
    setConfirmPwd("");
  };

  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
  };

  const handleNicknameConfirmClick = () => {
    // 닉네임 확인 로직을 여기에 추가하세요
    console.log("Nickname confirmed:", formData.mem_nickname);
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
                      <label htmlFor="mem_pwd">비밀번호</label>
                    </td>
                    <td className="input-cell">
                      <input
                          type="password"
                          id="mem_pwd"
                          name="mem_pwd"
                          value={formData.mem_pwd}
                          readOnly={!isEditingPwd}
                          onChange={handleChange}
                      />
                      <button
                          type="button"
                          className="edit-pwd-button"
                          onClick={handlePwdEditClick}
                      >
                        {isEditingPwd ? "취소" : "수정"}
                      </button>
                    </td>
                  </tr>
                  {isEditingPwd && (
                      <tr>
                        <td className="label-cell">
                          <label htmlFor="confirm_mem_pwd">확인</label>
                        </td>
                        <td className="input-cell">
                          <input
                              type="password"
                              id="confirm_mem_pwd"
                              name="confirm_mem_pwd"
                              value={confirmPwd}
                              onChange={handleConfirmPwdChange}
                          />
                          <button
                              type="button"
                              className="change-edit-button"
                              onClick={handlePwdChangeClick}
                          >
                            변경
                          </button>
                        </td>
                      </tr>
                  )}
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_nickname">닉네임</label>
                    </td>
                    <td className="input-cell">
                      <input
                          type="text"
                          id="mem_nickname"
                          name="mem_nickname"
                          value={formData.mem_nickname}
                          onChange={handleChange}
                      />
                      <button
                          type="button"
                          className="change-edit-button"
                          onClick={handleNicknameConfirmClick}
                      >
                        확인
                      </button>
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
                              name="mem_gender"
                              value="male"
                              checked={formData.mem_gender === "male"}
                              onChange={handleChange}
                          />
                          <label htmlFor="genderMale">남성</label>
                        </div>
                        <div className="gender-option">
                          <input
                              type="radio"
                              id="genderFemale"
                              name="mem_gender"
                              value="female"
                              checked={formData.mem_gender === "female"}
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
