import React from "react";
import RellaxWrapper from "react-rellax-wrapper";
import "../styles/AboutUSSUM.css";
import travelimg1 from "../img/travelimg1.png";
import userIcon from "../img/userIcon.png";

function AboutUSSUM() {
  return (
    <div className="aboutPage">
      <header className="header">
        <RellaxWrapper speed={-1}>
          <img src={travelimg1} alt="aboutImg" className="aboutImg" />
        </RellaxWrapper>
        <div className="header-text">
          WE ARE NEW ZEALAND OWNED AND OPERATED STORE
        </div>
      </header>
      <main className="main-content">
        <section className="description">
          <h2>THE JOURNEY OF AN ARTIST</h2>
          <p>
            Kommigraphics always works closely with you at every step of a
            well-structured procedure of brand design, so that your views are
            always heard and considered. Kommigraphics ensures a collaborative
            process to create designs that truly reflect your vision.
          </p>
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
