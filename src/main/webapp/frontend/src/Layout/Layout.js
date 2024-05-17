import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="body-container">
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
