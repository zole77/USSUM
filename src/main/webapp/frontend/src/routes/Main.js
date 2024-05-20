import React from "react";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div>
            <p>Main page</p>

            <Link to="/signup">signup page</Link>
            <br />
            <Link to="/login">Login page</Link>
            <br />
            <Link to="/info">services</Link>
        </div>
    );
}

export default Main;
