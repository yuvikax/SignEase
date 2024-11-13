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
import { signInWithEmailAndPassword } from "firebase/auth"; // Import required function from Firebase
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      // Redirect to the homepage or perform any other action after login
    } catch (error) {
      console.error("Error during login:", error.message);
      setError(error.message);
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
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
        {error && <MutedLink style={{ color: "red" }}>{error}</MutedLink>}
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forgot your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Sign in!</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>
          Don't have an account?{" "}
          {/* Use Link for navigation to Signup */}
          <Link to="/signup">
            <BoldLink>Sign up!</BoldLink>
          </Link>
        </MutedLink>
      </FormContainer>
    </BoxContainer>
  );
}
