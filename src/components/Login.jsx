import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logginWithEmailAndPassword } from "../auth/firebase";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const handleLogin = () => {
    logginWithEmailAndPassword(email, password);
  };
  return (
    <div>
      <div className="none">Hello {user?.email}</div>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter password"
      />
      <Button onClick={handleLogin}>Login</Button>
      <br />
      <Button onClick={() => navigate("/register")}>
        No account? Register here
      </Button>
    </div>
  );
};

export default Login;
