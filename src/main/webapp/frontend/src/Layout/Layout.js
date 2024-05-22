import React from "react";
import Header from "./Header";
import Body from "./Body";
import "../styles/Layout.css";

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <div className="body-container">
                <Body />
            </div>
            <footer className="footer">
                <div>
                    <p>Copyright &copy; US:SUM 2024</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
