import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { auth } from "../../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import required function from Firebase
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      // After successful registration, redirect to login or perform any action
      switchToSignin(); // Switch to the login form automatically after signup
    } catch (error) {
      console.error("Error during registration:", error.message);
      setError(error.message);
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSignup}>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <MutedLink style={{ color: "red" }}>{error}</MutedLink>}
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit">Sign up!</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>
          Already have an account?{" "}
          <Link to="/login">
            <BoldLink>Sign in!</BoldLink>
          </Link>
        </MutedLink>
      </FormContainer>
    </BoxContainer>
  );
}
