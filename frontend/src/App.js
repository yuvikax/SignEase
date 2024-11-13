import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/accountBox/loginForm";
import { SignupForm } from "./components/accountBox/signupForm";
import { AccountProvider } from "./components/accountBox/accountContext";
import WebCamPage from './components/WebCamPage/WebCamPage';
import QuizPage from "./components/QuizPage/QuizPage";
import AuthForm from "./components/AuthForm/AuthForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LearningContent from "./components/LearningContent/LearningContent";

import {
  Navbar,
  Header,
  Features,
  Download,
  Subscribe,
  Faq,
  Footer,
} from "./components";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <Router>
      <AccountProvider>
        {isAuthModalOpen && <AuthForm onClose={closeAuthModal} />}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/webcam" element={<WebCamPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/learning-content" element={<LearningContent />} />

          <Route
            path="/"
            element={
              <>
                <header className="header-bg">
                  <Navbar />
                  <Header />
                </header>
                <Features data-aos="fade-up" />
                <Download />
                <Subscribe />
                <Faq />
                <Footer />
              </>
            }
          />
        </Routes>
      </AccountProvider>
    </Router>
  );
}

export default App;