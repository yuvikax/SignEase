import React, { useEffect } from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import "../UI/Button/Button.css";
import phoneHeader from "../../assets/handsign.png";
import { BsMouse } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from 'axios';

import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const navigate = useNavigate(); // Use navigate to handle routing

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleOpenWebcam = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start-isl-detection');
      console.log(response.data.message); // Logs "ISL detection started."
    } catch (error) {
      console.error('Error starting ISL detection:', error);
    }
  };

  const handleOpenQuiz = () => {
    navigate("/quiz"); 
  };

  // Navigate to the LearningContent page
  const handleOpenLearningContent = () => {
    navigate("/learning-content");
  };

  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1 align="left">
            <span>Sign Language</span>
            <span>Has Never</span>
            <span>Been Easier.</span>
          </h1>
          <p className="u-text-small">
            SignEase aims to bring the community together and bridge the gap of communication. 
            This ISL translator application’s robustness allows room for people to bring the change towards inclusivity - one step at a time.
          </p>
          <div className="header-cta">
            <Button text={"Translate your ISL!"} btnClass={"btn-light"} onClick={handleOpenWebcam} /> 
            <Button text={"Get Learning"} btnClass={"btn-dark"} onClick={handleOpenLearningContent} />
            <Button text={"Quiz"} btnClass={"btn-dark"} onClick={handleOpenQuiz} />
          </div>
        </div>
        <div className="header-right" data-aos="fade-left">
          <img src={phoneHeader} alt="phone" />
        </div>
      </div>
      <div className="floating-icon">
        <a href="#features">
          <BsMouse color="#fff" size={25} className="mouse" />
        </a>
      </div>
    </section>
  );
};

export default Header;
