import React, { useContext, useState } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const Confirmation = () => {
    // LabelContext로부터 userInfo와 prevPage를 가져옵니다.
    const { userInfo, prevPage } = useContext(LabelContext);
    const [showPassword, setShowPassword] = useState(false);

    // 폼 제출 핸들러 함수
    const handleConfirmation = async (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        try {
            const formData = {
                id: userInfo.SignupId.Id,
                password: userInfo.SignupPwd.pwd1,
                nickname: userInfo.SignupNickname.nickname,
                gender: userInfo.gender,
                travelType: (userInfo.travelType || []).join(", "),  // travelType이 undefined인 경우 빈 배열로 처리
            };

            const response = await axios.post("/api/registration", formData);

            if (response.status === 200) {
                console.log("Registration successful:", response.data);
                // 등록이 성공하면 메인 페이지로 이동
                window.location.href = "/";
            } else {
                throw new Error("Failed to send data to the server");
            }
        } catch (error) {
            console.error("Error:", error.message);
            console.log("Error response:", error.response ? error.response.data : error.message);
            alert("Registration failed: " + error.message);
        }
    };

    // 비밀번호 표시 토글 함수
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleConfirmation}>
            <Grid container spacing={2} className="signup-container" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <button
                        type="button"
                        className="signup-back-button"
                        onClick={prevPage}
                    >
                        <ArrowBackIcon />
                    </button>
                </Grid>
                <Grid item xs={6}>
                    <h4 className="Signupnickname-heading">회원가입</h4>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12}>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="아이디"
                        value={userInfo.SignupId.Id}
                        readOnly
                        style={{ width: '100%', padding: '10px', border: '1px solid #5ac7c7', borderRadius: '5px', backgroundColor: '#e8f8f8', marginBottom: '0px' }}
                    />
                </Grid>
                <Grid item xs={12} style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="signup-input"
                        placeholder="비밀번호"
                        value={userInfo.SignupPwd.pwd1}
                        readOnly
                        style={{ width: '100%', padding: '10px', paddingRight: '40px', border: '1px solid #5ac7c7', borderRadius: '5px', backgroundColor: '#e8f8f8', marginBottom: '0px' }}
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        style={{ position: 'absolute', right: '10px', top: '65%', transform: 'translateY(-50%)' }}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="닉네임"
                        value={userInfo.SignupNickname.nickname}
                        readOnly
                        style={{ width: '100%', padding: '10px', border: '1px solid #5ac7c7', borderRadius: '5px', backgroundColor: '#e8f8f8', marginBottom: '0px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="성별"
                        value={userInfo.gender}
                        readOnly
                        style={{ width: '100%', padding: '10px', border: '1px solid #5ac7c7', borderRadius: '5px', backgroundColor: '#e8f8f8', marginBottom: '0px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="여행 취향"
                        value={(userInfo.travelType || []).join(", ")}
                        readOnly
                        style={{ width: '100%', padding: '10px', border: '1px solid #5ac7c7', borderRadius: '5px', backgroundColor: '#e8f8f8'}}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        className="btn-hover color"
                    >
                        확인
                    </button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Confirmation;
