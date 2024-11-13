import React, { useEffect } from "react";
import "./Download.css";
import { FaApple, FaGithub, FaWindows } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { IconContext } from "react-icons";
import AOS from "aos";
import "aos/dist/aos.css";

const Download = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="download">
      <div className="container download" data-aos="fade-up">
        <h2>SignEase download</h2>       
        <p className="dtext">
          Our app is available for download on our Github Repo.
        </p>
        <IconContext.Provider value={{ size: "50" }}>
          <div className="download-icons">
            <div className="download-icon">
              <FaGithub />               
              
            </div>
            {/* <div className="download-icon">
              <GrAndroid /> <p>Android</p>
            </div>
            <div className="download-icon">
              <FaWindows /> <p>Windows</p>
            </div> */}
          </div>
        </IconContext.Provider>
      </div>
    </section>
  );
};

export default Download;