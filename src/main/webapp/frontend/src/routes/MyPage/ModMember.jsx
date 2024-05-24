import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ModMember.css";
import Profile from "./Profile";
import { loginUser, clearUser } from "../Login/loginSlice";

const ModMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    mem_id: "",
    mem_pwd: "",
    mem_phone: "",
    mem_birth: "",
    mem_address: "",
    mem_nickname: "",
    mem_type: "",
    mem_gender: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [view, setView] = useState("edit");
  const [isEditingPwd, setIsEditingPwd] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  const travelPreferences = [
    "즉흥적", "계획적", "여럿이서", "소수로만", "여유롭게", "알차게",
    "동성친구만", "성별 무관", "맛집", "감성", "액티비티", "포토스팟"
  ];

  useEffect(() => {
    const initialData = {
      ...loginInfo,
      mem_gender: loginInfo.mem_gender || "",
      mem_type: loginInfo.mem_type || "",
    };
    setFormData(initialData);
    setOriginalData(initialData);
    console.log("Initial loginInfo:", initialData);
  }, [loginInfo]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setFormData(originalData);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "mem_nickname") {
      setNicknameAvailable(false);
      setIsDuplicateChecked(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedTypes = checked
        ? [...formData.mem_type.split(','), value]
        : formData.mem_type.split(',').filter((type) => type !== value);
    setFormData({ ...formData, mem_type: updatedTypes.join(',') });
  };

  const handlePwdEditClick = () => {
    setIsEditingPwd(!isEditingPwd);
  };

  const handlePwdChangeClick = () => {
    console.log("비밀번호 변경됨:", formData.mem_pwd, confirmPwd);
    setConfirmPwd("");
  };

  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
  };

  const checkDuplicate = async () => {
    if (!formData.mem_nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/signup/checkNickname", null, {
        params: { mem_nickname: formData.mem_nickname },
      });

      setIsDuplicateChecked(true);

      if (response.data === 0) {
        alert("사용 가능한 닉네임입니다.");
        setNicknameAvailable(true);
      } else {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
        setNicknameAvailable(false);
      }
    } catch (error) {
      console.error("Error checking duplicate nickname:", error.response ? error.response.data : error.message);
      console.log("Error details:", error.response ? error.response : error);
      alert("중복 확인 중 오류가 발생했습니다: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== originalData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedData).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      const response = await axios.post("/member/modify", updatedData);

      console.log(response.data);
      dispatch(loginUser(response.data));
      alert("회원 정보가 성공적으로 수정되었습니다. 다시 로그인해주세요.");
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
      <div className="profile-edit-container">
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <Profile onEditClick={() => setView("edit")} onMyLogClick={() => setView("mylog")} activeButton={view} />
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
                      <input type="text" id="mem_id" name="mem_id" value={formData.mem_id} readOnly />
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
                          value={formData.mem_pwd || ""}
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
                              className="change-pwd-button"
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
                      <input type="text" id="mem_nickname" name="mem_nickname" value={formData.mem_nickname} onChange={handleChange} />
                      <button type="button" className="check-nickname-button" onClick={handleCheckDuplicate} disabled={!formData.mem_nickname}>
                        확인
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_gender">성별</label>
                    </td>
                    <td className="input-cell">
                      <input type="text" id="mem_gender" name="mem_gender" value={formData.mem_gender} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_birth">생년월일</label>
                    </td>
                    <td className="input-cell">
                      <input type="date" id="mem_birth" name="mem_birth" value={formData.mem_birth || ""} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_phone">휴대전화</label>
                    </td>
                    <td className="input-cell">
                      <input type="text" id="mem_phone" name="mem_phone" value={formData.mem_phone || ""} onChange={handleChange} placeholder="예) 010-1234-5678" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_address">주소</label>
                    </td>
                    <td className="input-cell">
                      <textarea id="mem_address" name="mem_address" value={formData.mem_address || ""} onChange={handleChange}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label>여행 취향</label>
                    </td>
                    <td className="input-cell">
                      <div className="checkbox-grid">
                        {travelPreferences.map((pref) => (
                            <label key={pref} className="checkbox-item">
                              <input
                                  type="checkbox"
                                  value={pref}
                                  checked={formData.mem_type.split(',').includes(pref)}
                                  onChange={handleCheckboxChange}
                              />
                              {pref}
                            </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div className="form-actions">
                  <button type="button" className="btn-hover color">취소</button>
                  <button type="submit" className="btn-hover color" disabled={!nicknameAvailable || !isDuplicateChecked}>저장</button>
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

