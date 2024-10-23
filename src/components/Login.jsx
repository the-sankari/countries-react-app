import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import FormCard from "./FormCard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password);
  };

  const formFields = [
    {
      label: "Email address",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "Enter your email address",
      required: true,
      controlId: "formBasicEmail",
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Enter your password",
      required: true,
      controlId: "formBasicPassword",
    },
  ];
  return (
    <FormCard
      title="Login"
      subTitle="Please enter your details to login"
      handleSubmit={handleLogin}
      formFields={formFields}
      buttonText="Login"
      linkText="Register here"
      linkTo="/register"
      linkDescription="Don't have an account?"
    />
  );
};

export default Login;
