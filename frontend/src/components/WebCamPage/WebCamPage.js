// src/components/WebCamPage.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./WebCamPage.css";

const WebCamPage = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request access to the user's webcam
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setIsWebcamActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setError("Error accessing webcam");
      }
    };
    getUserMedia();

    // Clean up function to stop webcam when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsWebcamActive(false);
    };
  }, []);

  // Capture an image from the video stream and send it to the backend for prediction
  const captureImage = () => {
    if (!videoRef.current) {
      setError("Webcam is not active.");
      return;
    }

    // Create a canvas to capture the current frame from the video
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a blob in PNG format
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Failed to capture image. Please try again.");
        return;
      }

      // Prepare the form data to be sent to the FastAPI backend
      const formData = new FormData();
      formData.append("file", blob, "capture.png");

      setLoading(true);
      setError("");
      setPrediction("");

      console.log("Captured image blob type:", blob.type); // Should be image/png

      // Send the captured image to the FastAPI backend
      axios.post("http://127.0.0.1:8000/translate/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // Set the prediction result from the backend response
        setPrediction(response.data.prediction);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setError("Error uploading image. Please try again.");
      })
      .finally(() => setLoading(false));
    }, "image/png");
  };

  return (
    <div className="webcam-container">
      <h1>Translate your ISL!</h1>
      {/* Display video from webcam */}
      <video ref={videoRef} autoPlay playsInline muted className="webcam-video"></video>

      {/* Button to capture image and predict translation */}
      {isWebcamActive && <button onClick={captureImage}>Capture & Predict</button>}

      {/* Display loading, error, and prediction messages */}
      {loading && <p>Processing...</p>}
      {error && <p className="error-message">{error}</p>}
      {prediction && <p className="prediction-result">Prediction: {prediction}</p>}
    </div>
  );
};

export default WebCamPage;