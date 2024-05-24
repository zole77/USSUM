import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ModMember.css";
import Profile from "./Profile";
import { loginUser, logoutUser } from "../Login/loginSlice";

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
      console.error(
          "Error checking duplicate nickname:",
          error.response ? error.response.data : error.message
      );
      console.log("Error details:", error.response ? error.response : error);
      alert(
          "중복 확인 중 오류가 발생했습니다: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/member/modify", {
        mem_id: formData.mem_id,
        mem_pwd: formData.mem_pwd,
        mem_phone: formData.mem_phone,
        mem_birth: formData.mem_birth,
        mem_address: formData.mem_address,
        mem_nickname: formData.mem_nickname,
        mem_type: formData.mem_type,
        mem_gender: formData.mem_gender,
      });

      console.log(response.data);
      dispatch(loginUser(response.data));
      alert("회원 정보가 성공적으로 수정되었습니다. 다시 로그인해주세요.");
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      alert(`회원 정보 수정 중 오류가 발생했습니다. 상세 오류: ${error.response.data}`);
      console.log("서버 응답 데이터:", error.response.data);
      console.log("서버 응답 상태:", error.response.status);
      console.log("서버 응답 헤더:", error.response.headers);
    }
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
                          name="mem_id"
                          value={formData.mem_id}
                          readOnly
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
                          id="mem_nickname"
                          name="mem_nickname"
                          value={formData.mem_nickname}
                          onChange={handleChange}
                      />
                      <button
                          type="button"
                          className="check-nickname-button"
                          onClick={handleCheckDuplicate}
                          disabled={!formData.mem_nickname}
                      >
                        확인
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_gender">성별</label>
                    </td>
                    <td className="input-cell">
                      <input
                          type="text"
                          id="mem_gender"
                          name="mem_gender"
                          value={formData.mem_gender === "male" ? "남성" : "여성"}
                          readOnly
                      />
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
                          value={formData.mem_birth || ""}
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
                          value={formData.mem_phone || ""}
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
                        value={formData.mem_address || ""}
                        onChange={handleChange}
                    ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td className="label-cell">
                      <label htmlFor="mem_type">여행 취향</label>
                    </td>
                    <td className="input-cell">
                      <input
                          type="text"
                          id="mem_type"
                          name="mem_type"
                          value={formData.mem_type || ""}
                          onChange={handleChange}
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div className="form-actions">
                  <button type="button" className="btn-hover color">
                    취소
                  </button>
                  <button
                      type="submit"
                      className="btn-hover color"
                      disabled={!nicknameAvailable || !isDuplicateChecked}
                  >
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
