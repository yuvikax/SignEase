import React from "react";
import Navbar from "../navbar/Navbar";
import { Carousel, Container } from "react-bootstrap";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./LearningContent.css";

// Placeholder images for the carousel and gestures
import gesture1 from "../../assets/hello.png";
import gesture2 from "../../assets/please.png";
import gesture3 from "../../assets/thankyou.png";
import gesture4 from "../../assets/goodbye.png";
import gesture5 from "../../assets/yes.png";
import gesture6 from "../../assets/no.png";
import gesture7 from "../../assets/Frame 2.png";

const LearningContent = () => {
  const gestures = [
    { image: gesture1, title: "Hello" },
    { image: gesture2, title: "Please" },
    { image: gesture3, title: "Thank you" },
    { image: gesture4, title: "Goodbye" },
    { image: gesture5, title: "Yes" },
    { image: gesture6, title: "No" }

  ];

  // Example: Replace the images for the carousel (but not for the cards)
  const carouselImages = [
    gesture7  // Use only a subset or different images for the carousel
  ];

  return (
    <div className="learning-content">
      {/* Navbar */}
      <Navbar onLogout={() => console.log("User logged out")} />

      {/* Image Carousel */}
      <Carousel
        className="carousel-container"
        controls={true}
        indicators={false}
        fade={true}
        interval={3000}
      >
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="d-block w-100 carousel-image"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Gesture Cards */}
      <Container className="gesture-cards mt-6">
        <div className="gesture-cards-grid">
          {gestures.map((gesture, index) => (
            <div key={index} className="gesture-card animate__animated animate__fadeInUp animate__delay-1s">
              <img src={gesture.image} alt={`Gesture ${index + 1}`} className="gesture-image" />              
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LearningContent;
