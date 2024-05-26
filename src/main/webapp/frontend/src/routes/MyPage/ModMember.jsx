import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ModMember.css";
import Profile from "./Profile";
import { clearUser } from "../Login/loginSlice"; // clearUser 액션 가져오기
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 아이콘 추가

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
  const [isEditingPwd, setIsEditingPwd] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [showPwd, setShowPwd] = useState(false); // 비밀번호 가시성 상태 추가
  const [showConfirmPwd, setShowConfirmPwd] = useState(false); // 확인 비밀번호 가시성 상태 추가
  const [isSaveDisabled, setIsSaveDisabled] = useState(false); // 저장 버튼 비활성화 상태 추가

  const travelPreferences = [
    "즉흥적",
    "계획적",
    "여럿이서",
    "소수로만",
    "여유롭게",
    "알차게",
    "동성친구만",
    "성별 무관",
    "맛집",
    "감성",
    "액티비티",
    "포토스팟",
  ];

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

  // 날짜 형식을 변환하는 유틸리티 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const initialData = {
      ...loginInfo,
      mem_birth: formatDate(loginInfo.mem_birth),
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

  useEffect(() => {
    if (isEditingPwd) {
      const isValidPassword = passwordRegex.test(formData.mem_pwd);
      const isPasswordMatch = formData.mem_pwd === confirmPwd;
      setIsSaveDisabled(!(isValidPassword && isPasswordMatch));
    } else {
      setIsSaveDisabled(false);
    }
  }, [formData.mem_pwd, confirmPwd, isEditingPwd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "mem_nickname") {
      setNicknameAvailable(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedTypes = checked
      ? [...formData.mem_type.split(","), value]
      : formData.mem_type.split(",").filter((type) => type !== value);
    setFormData({ ...formData, mem_type: updatedTypes.join(",") });
  };

  const handlePwdEditClick = () => {
    setIsEditingPwd(!isEditingPwd);
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
        error.response ? error.response.data : error.message,
      );
      console.log("Error details:", error.response ? error.response : error);
      alert(
        "중복 확인 중 오류가 발생했습니다: " +
          (error.response ? error.response.data : error.message),
      );
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key]) {
        // Only include fields that have a value
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (updatedData.mem_birth) {
      updatedData.mem_birth = formatDate(updatedData.mem_birth);
    }

    if (Object.keys(updatedData).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    console.log("전송 데이터:", updatedData); // 변경된 데이터를 출력합니다

    try {
      const response = await axios.post("/member/modify", updatedData);

      console.log(response.data);
      alert("회원 정보가 수정되었습니다. 다시 로그인해주세요.");
      dispatch(clearUser()); // 로그아웃 처리
      localStorage.removeItem("token"); // 토큰 제거
      navigate("/"); // "/" 페이지로 리디렉션
    } catch (error) {
      console.error("사용자 정보 수정 중 오류 발생:", error);
      alert("정보 수정 중 오류 발생");
    }
  };

  return (
    <div className="profile-edit-container">
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <Profile />
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
                <label htmlFor="mem_pwd">비밀번호</label>
              </td>
              <td className="input-cell">
                <div className="input-wrapper">
                  <input
                    type={showPwd ? "text" : "password"} // 비밀번호 가시성 상태에 따라 타입 변경
                    id="mem_pwd"
                    name="mem_pwd"
                    value={formData.mem_pwd || ""}
                    readOnly={!isEditingPwd}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowPwd(!showPwd)} // 아이콘 클릭 시 가시성 상태 토글
                  >
                    {showPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
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
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPwd ? "text" : "password"} // 확인 비밀번호 가시성 상태에 따라 타입 변경
                      id="confirm_mem_pwd"
                      name="confirm_mem_pwd"
                      value={confirmPwd}
                      onChange={handleConfirmPwdChange}
                      placeholder="※문자, 숫자, 특수문자 중 2가지 포함 8글자 이상" // placeholder 추가
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)} // 아이콘 클릭 시 가시성 상태 토글
                    >
                      {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
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
                  value={formData.mem_gender}
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
                <label>여행 취향</label>
              </td>
              <td className="input-cell">
                <table className="preferences-table">
                  <tbody>
                    {Array.from({ length: 4 }, (_, rowIndex) => (
                      <tr key={rowIndex}>
                        {travelPreferences
                          .slice(rowIndex * 3, rowIndex * 3 + 3)
                          .map((pref) => (
                            <td key={pref} className="checkbox-cell">
                              <label className="checkbox-item">
                                <input
                                  type="checkbox"
                                  className="checkbox-input"
                                  value={pref}
                                  checked={formData.mem_type
                                    .split(",")
                                    .includes(pref)}
                                  onChange={handleCheckboxChange}
                                />
                                {pref}
                              </label>
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-actions">
          <button
            type="button"
            className="btn-hover color"
            onClick={() => setFormData(originalData)}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn-hover color"
            disabled={isSaveDisabled} // 저장 버튼 비활성화
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModMember;
