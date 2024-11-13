import React, { useState } from "react";
import { auth } from "../../firebase"; // Adjust the path based on your file structure
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./AuthForm.css";

const AuthForm = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(""); // Clear error message on toggle
    setSuccessMessage(""); // Clear success message on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign up logic
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", email);
        
        // Reset form fields
        setEmail("");
        setPassword("");
        setSuccessMessage("Signed up successfully!"); // Set success message

        // Delay switching to Sign In form
        setTimeout(() => {
          setIsSignUp(false); // Switch to Sign In form after a short delay
        }, 2000); // Adjust delay as needed
      } else {
        // Sign in logic
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", email);
        onClose(); // Close form after successful sign-in
      }
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="auth-form-overlay">
      <div className="auth-form-container">
        {/* <button className="close-button" onClick={onClose}>
          &times;
        </button> */}
        <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span onClick={toggleForm} className="toggle-link">
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;