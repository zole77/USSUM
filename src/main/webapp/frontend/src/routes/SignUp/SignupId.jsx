// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { LabelContext } from "./labelDataContext";
// import Grid from "@mui/material/Grid";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import "../../styles/Signup_styles.css";
//
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//
// const SignupId = () => {
//   const {
//     userInfo: { SignupId },
//     setSignupIdInfo,
//     prevPage, // 이전 페이지로 이동 함수 추가
//     nextPage,
//   } = useContext(LabelContext);
//   const [idAvailable, setIdAvailable] = useState(false);
//   const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
//
//   const isInputValid = (input, regex) => input.length > 0 && regex.test(input);
//
//   const checkDuplicate = async () => {
//     if (!SignupId.Id) {
//       alert("아이디를 입력해주세요.");
//       return;
//     }
//
//     try {
//       const response = await axios.post("/signup/url", null, {
//         params: { mem_id: SignupId.Id },
//       });
//
//       setIsDuplicateChecked(true);
//
//       if (response.data === 0) {
//         alert("사용 가능한 아이디입니다.");
//         setIdAvailable(true);
//       } else {
//         alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
//         setIdAvailable(false);
//       }
//     } catch (error) {
//       console.error("Error checking duplicate ID:", error);
//       alert("중복 확인 중 오류가 발생했습니다.");
//     }
//   };
//
//   return (
//     <form>
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={3}></Grid>
//         <Grid item xs={6}>
//           <h4 className="Signup-heading">회원가입</h4>
//         </Grid>
//         <Grid item xs={9}>
//           <input
//             type="email"
//             className={`signup-input ${
//               !isInputValid(SignupId.Id, EMAIL_REGEX) && SignupId.Id.length > 0
//                 ? "input-error"
//                 : ""
//             }`}
//             placeholder="email@example.com"
//             value={SignupId.Id}
//             onChange={(event) => setSignupIdInfo("Id")(event)}
//             required
//           />
//           {!isInputValid(SignupId.Id, EMAIL_REGEX) &&
//             SignupId.Id.length > 0 && (
//               <small className="input-helper-text">
//                 올바른 이메일 형식이 아닙니다.
//               </small>
//             )}
//         </Grid>
//         <Grid item xs={3}>
//           <button
//             type="button"
//             className="signup-button-confirm"
//             onClick={checkDuplicate}
//             disabled={
//               !isInputValid(SignupId.Id, EMAIL_REGEX) ||
//               SignupId.Id.trim() === ""
//             }
//           >
//             확인
//           </button>
//         </Grid>
//         <Grid item xs={12}>
//           <div style={{ marginTop: 15 }}>
//             <button
//               type="button"
//               className="btn-hover color"
//               onClick={nextPage}
//               disabled={!idAvailable || !isDuplicateChecked}
//             >
//               다음
//             </button>
//           </div>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };
//
// export default SignupId;

import React, { useState, useContext } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignupId = () => {
  const {
    userInfo: { SignupId },
    setSignupIdInfo,
    prevPage, // 이전 페이지로 이동 함수 추가
    nextPage,
  } = useContext(LabelContext);
  const [idAvailable, setIdAvailable] = useState(false);

  const isInputValid = (input, regex) => input.length > 0 && regex.test(input);

  return (
    <form>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <h4 className="Signup-heading">회원가입</h4>
        </Grid>
        <Grid item xs={9}>
          <input
            type="email"
            className={`signup-input ${
              !isInputValid(SignupId.Id, EMAIL_REGEX) && SignupId.Id.length > 0
                ? "input-error"
                : ""
            }`}
            placeholder="email@example.com"
            value={SignupId.Id}
            onChange={(event) => setSignupIdInfo("Id")(event)}
            required
          />
          {!isInputValid(SignupId.Id, EMAIL_REGEX) &&
            SignupId.Id.length > 0 && (
              <small className="input-helper-text">
                올바른 이메일 형식이 아닙니다.
              </small>
            )}
        </Grid>
        <Grid item xs={3}>
          <button
            type="button"
            className="signup-button-confirm"
            disabled={
              !isInputValid(SignupId.Id, EMAIL_REGEX) ||
              SignupId.Id.trim() === ""
            }
          >
            확인
          </button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: 15 }}>
            <button
              type="button"
              className="btn-hover color"
              onClick={nextPage}
            >
              다음
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupId;
