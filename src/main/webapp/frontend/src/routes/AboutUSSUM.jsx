import React, { useEffect, useRef } from "react";
import "../styles/AboutUSSUM.css";
import travelimg2 from "../img/travelimg2.png";
import friend1 from "../img/friend1.jpg";
import friend4 from "../img/friend4.jpg";

function AboutUSSUM() {
  const descriptionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }
    if (image1Ref.current) {
      observer.observe(image1Ref.current);
    }
    if (image2Ref.current) {
      observer.observe(image2Ref.current);
    }

    return () => {
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
      if (image1Ref.current) {
        observer.unobserve(image1Ref.current);
      }
      if (image2Ref.current) {
        observer.unobserve(image2Ref.current);
      }
    };
  }, []);

  const handleSignupClick = () => {
    window.location.href = '/signup'; // 회원가입 페이지 주소로 이동
  };

  const handleWithMeClick = () => {
    window.location.href = '/Withme'; // 같이 가요 페이지 주소로 이동
  };

  const handleCommunityClick = () => {
    window.location.href = '/board'; // 커뮤니티 페이지 주소로 이동
  };

  return (
      <div className="aboutPage">
        <header className="header">
          <img
              src={travelimg2}
              alt="Header"
              className="header-image"
          />
        </header>
        <main className="main-content">
          <section ref={descriptionRef} className="description">
            <h2>너와 나, 우리를 잇다</h2>
            <h2>US:SUM</h2>
          </section>
          <section ref={image1Ref} className="image-section">
            <div className="AboutInfoText-header">
              <h2>너와 나, 우리 함께: 같이 가요!</h2>
              <p>놀이공원을 갔는데 내 옆자리만 계속 비어있을 때, 갑자기 식당을 가고 싶은데 2인분 이상만 주문이 가능할 때, 내 사진을 찍고 싶은데 다른 사람한테 부탁하기 아쉬울 때. 혼자보단 함께 있을 때가 더 빛나는 순간을 위하여 '같이 가요'가 여러분의 친구를 대화를 통해 찾아드립니다!</p>
              <button className="custom-btn btn-1" onClick={handleWithMeClick}>→ 같이 가요! 바로 가기</button>
            </div>
            <img src={friend1} alt="AboutInfoImg" className="friendImg"/>
          </section>
          <section ref={image2Ref} className="image-section reverse">
            <img src={friend4} alt="AboutInfoImg" className="friendImg"/>
            <div className="AboutInfoText">
              <h2>너와 나, 우리의 : 모두 추억</h2>
              <p>여행 가기 전의 설렘, 나 혼자만 간직하기 아쉬운 멋진 추억, 모두에게 도움이 될 많은 정보, 소소하게 이야기를 나눌 친구가 필요할 때. 모든 우리의 추억을 함께 나눌 공간을 US:SUM 커뮤니티에서 즐겨보세요!</p>
              <button className="custom-btn btn-1" onClick={handleCommunityClick}>→ US:SUM 커뮤니티 바로 가기</button>
            </div>
          </section>
          <div className="button-container">
            <button className="btn-hover color" onClick={handleSignupClick}>US:SUM과 함께하기</button>
          </div>
        </main>
      </div>
  );
}

export default AboutUSSUM;
