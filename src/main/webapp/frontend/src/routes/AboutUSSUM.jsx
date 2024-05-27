import React, { useEffect, useState } from "react";
import "../styles/AboutUSSUM.css";
import travelimg2 from "../img/travelimg2.png";
import userIcon from "../img/userIcon.png";

function AboutUSSUM() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="aboutPage">
      <header
        className="header"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <img
          src={travelimg2}
          alt="Header"
          className="header-image"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }} // Adjust image scroll speed
        />
        <div className="header-text">너와 나, 우리를 잇다. US:SUM</div>
      </header>
      <main className="main-content">
        <section className="description">
          <h2>THE JOURNEY OF AN ARTIST</h2>
          <p>소개 간단히</p>
        </section>
        <section className="services">
          <div className="service">
            <img src={userIcon} alt="Professional Support" />
            <p>PROFESSIONAL SUPPORT</p>
          </div>
          <div className="service">
            <img src={userIcon} alt="Create Inventive Infographics" />
            <p>CREATE INVENTIVE INFOGRAPHICS</p>
          </div>
          <div className="service">
            <img src={userIcon} alt="Beautiful on All Screen Sizes" />
            <p>BEAUTIFUL ON ALL SCREEN SIZES</p>
          </div>
          <div className="service">
            <img src={userIcon} alt="Drag-and-Drop Page Builder" />
            <p>DRAG-AND-DROP PAGE BUILDER</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutUSSUM;
