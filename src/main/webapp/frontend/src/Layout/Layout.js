import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Body from "./Body.js";

function Layout(props) {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default Layout;
