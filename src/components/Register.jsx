import React, { useState } from "react";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  };

  // TODO: Add a check to if user is logged in and navigate to countries is logged in
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="register">
      <input
        type="text"
        name=""
        id=""
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Full name"
      />
      <input
        type="email"
        name=""
        id=""
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter password"
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
