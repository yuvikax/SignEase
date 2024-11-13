import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import "./QuizPage.css";
import Navbar from "../navbar/Navbar";
import { jsPDF } from "jspdf";

// Beginner quiz data
const beginnerQuiz = {
  quizTitle: "Beginner Indian Sign Language Quiz",
  quizSynopsis: "Test your basic knowledge on Indian Sign Language signs!",
  questions: [
    {
      question: "What does the sign 'Hello' look like?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["A wave", "A thumbs up", "Pointing", "A clap"],
      correctAnswer: "1",
      point: 10,
    },
    {
      question: "What does the ISL sign for 'Thank you' involve?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Hand on heart", "Hand to mouth", "Waving", "Thumbs up"],
      correctAnswer: "2",
      point: 10,
    },
    {
      question: "Which hand shape represents the letter 'A' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Closed fist", "Open palm", "Thumb and forefinger circle", "Fingers crossed"],
      correctAnswer: "1",
      point: 10
    },
    {
      question: "How is the sign for 'Yes' performed in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Nodding head", "Thumbs up", "Index finger pointing up", "Handshake"],
      correctAnswer: "2",
      point: 10
    },
    {
      question: "What gesture represents 'No' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Shaking head", "Waving hand", "Thumbs down", "Finger wagging"],
      correctAnswer: "4",
      point: 10
    },
    {
      question: "Which hand sign represents the number '5' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Closed fist", "Five fingers open", "Thumb and pinky extended", "Two fingers crossed"],
      correctAnswer: "2",
      point: 10
    },
    {
      question: "In ISL, how do you sign 'Good Morning'?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Raising both hands", "Bringing one hand up and touching forehead", "Hand over heart", "Thumbs up with both hands"],
      correctAnswer: "2",
      point: 10
    },
    {
      question: "What is the sign for 'Friend' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Two hands interlocking", "Two fists tapping", "Handshake", "Index fingers crossed"],
      correctAnswer: "4",
      point: 10
    },
    {
      question: "What does the ISL sign for 'Love' look like?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Hands on heart", "Fingers making a heart shape", "Crossed fingers", "Thumbs up with both hands"],
      correctAnswer: "1",
      point: 10
    },
    {
      question: "How do you sign the letter 'E' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["All fingers touching the thumb", "Four fingers curved with thumb touching palm", "Thumb and index finger forming a circle", "Fingers closed in a fist"],
      correctAnswer: "2",
      point: 10
    },
    {
      question: "How do you sign the letter 'M' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Three fingers over the thumb", "Thumb and pinky extended", "Closed fist with thumb over fingers", "Index finger and thumb extended"],
      correctAnswer: "1",
      point: 10
    },
    {
      question: "Which hand gesture represents 'Help' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["One hand pushing forward", "Fist in open palm", "Waving both hands", "Thumbs up pointing to the chest"],
      correctAnswer: "2",
      point: 10
    },
    {
      question: "How is 'I am learning' represented in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Pointing to self then tapping head", "Thumbs up and tapping head", "Two hands raised", "Hands interlocked"],
      correctAnswer: "1",
      point: 10
    },
    {
      question: "What is the hand gesture for 'Mother' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Tapping thumb to chin", "Touching forehead", "Hand over heart", "Thumb touching lips"],
      correctAnswer: "1",
      point: 10
    },
    {
      question: "How do you sign 'Water' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Three fingers tapped on chin", "Hand making a wave motion", "Thumb and pinky extended", "Index finger tapping wrist"],
      correctAnswer: "1",
      point: 10
    }
  ],
};

// Intermediate quiz data
const intermediateQuiz = {
  quizTitle: "Intermediate Indian Sign Language Quiz",
  quizSynopsis: "Challenge yourself with intermediate ISL questions!",
  questions: [
    {
      question: "What is the ISL sign for 'Family'?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Circle gesture", "Hand on heart", "Interlocked fingers", "Thumbs up"],
      correctAnswer: "1",
      point: 10,
    },
    {
      question: "Which ISL sign represents 'School'?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Two hands clapping", "Hand over heart", "Pointing to forehead", "Waving"],
      correctAnswer: "1",
      point: 10,
    },
    // Add more questions here
  ],
};

// Advanced quiz data
const advancedQuiz = {
  quizTitle: "Advanced Indian Sign Language Quiz",
  quizSynopsis: "Test your advanced knowledge on Indian Sign Language!",
  questions: [
    {
      question: "What hand shape represents 'Freedom' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Hands crossed over chest", "Fingers spread wide", "Waving hands", "Interlocked fingers"],
      correctAnswer: "2",
      point: 10,
    },
    {
      question: "How do you sign 'Justice' in ISL?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Scales gesture with hands", "Thumbs up", "Hand to heart", "Pointing upwards"],
      correctAnswer: "1",
      point: 10,
    },
    // Add more questions here
  ],
};

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ beginner: null, intermediate: null, advanced: null });

  useEffect(() => {
    if (selectedQuiz) {
      const totalQuestions = selectedQuiz.questions.length;
      setProgress(((currentQuestionIndex + 1) / totalQuestions) * 100);
    }
  }, [currentQuestionIndex, selectedQuiz]);

  const handleQuizCompletion = (result) => {
    const score = result.correctPoints;
    if (selectedQuiz === beginnerQuiz) {
      setScores((prevScores) => ({ ...prevScores, beginner: score }));
    } else if (selectedQuiz === intermediateQuiz) {
      setScores((prevScores) => ({ ...prevScores, intermediate: score }));
    } else if (selectedQuiz === advancedQuiz) {
      setScores((prevScores) => ({ ...prevScores, advanced: score }));
    }
    setSelectedQuiz(null);
    setProgress(0); // Reset progress
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Indian Sign Language Quiz Scores", 20, 20);
    doc.setFontSize(12);
    doc.text(`Beginner: ${scores.beginner !== null ? scores.beginner : "Not attempted"}`, 20, 40);
    doc.text(`Intermediate: ${scores.intermediate !== null ? scores.intermediate : "Not attempted"}`, 20, 50);
    doc.text(`Advanced: ${scores.advanced !== null ? scores.advanced : "Not attempted"}`, 20, 60);
    doc.save("QuizScores.pdf");
  };

  const resetScores = () => {
    setScores({ beginner: null, intermediate: null, advanced: null });
  };

  return (
    <div>
      <Navbar onLogout={() => console.log("User logged out")} />
      <div className="quiz-modules-container">
        <h1>Indian Sign Language Quiz Modules</h1>
        <p>Choose your level to start the quiz</p>

        {selectedQuiz === null && (
          <div className="module-selection">
            <div className="module-box beginner" onClick={() => setSelectedQuiz(beginnerQuiz)}>
              <h2>Beginner</h2>
            </div>
            <div className="module-box intermediate" onClick={() => setSelectedQuiz(intermediateQuiz)}>
              <h2>Intermediate</h2>
            </div>
            <div className="module-box advanced" onClick={() => setSelectedQuiz(advancedQuiz)}>
              <h2>Advanced</h2>
            </div>
          </div>
        )}

        {selectedQuiz && (
          <div className="quiz-container">
            <button className="back-button" onClick={() => setSelectedQuiz(null)}>Back to Modules</button>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <Quiz
              quiz={selectedQuiz}
              shuffle={true}
              showInstantFeedback={true}
              showDefaultResult={false}
              onQuestionSubmit={() => setCurrentQuestionIndex((prev) => prev + 1)}
              onComplete={handleQuizCompletion}
            />
          </div>
        )}

        <div className="score-section">
          <h2>Your Scores</h2>
          <div className="score-card">
            <p>Beginner: {scores.beginner !== null ? `${scores.beginner} points` : "Not attempted"}</p>
            <p>Intermediate: {scores.intermediate !== null ? `${scores.intermediate} points` : "Not attempted"}</p>
            <p>Advanced: {scores.advanced !== null ? `${scores.advanced} points` : "Not attempted"}</p>
          </div>
          <button onClick={downloadPDF} className="pdf-button">Download PDF</button>
          <button onClick={resetScores} className="reset-button">Reset Scores</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;