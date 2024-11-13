import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Adjust the path based on your setup
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Store the authenticated user

  useEffect(() => {
    // Set up an observer on the Auth object to get user state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to switch to sign-in state
  const switchToSignin = () => {
    setCurrentUser(true);
  };

  // Function to switch to sign-up state
  const switchToSignup = () => {
    setCurrentUser(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchToSignin, switchToSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;