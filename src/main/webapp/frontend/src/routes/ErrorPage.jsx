import React from "react";
import ERROR from "../img/ERROR.png";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={ERROR}
        alt="Error"
        style={{ width: "70%", height: "auto", margin: "3rem, 0" }}
      />
    </div>
  );
};

export default ErrorPage;
