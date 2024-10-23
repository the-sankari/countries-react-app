import { useState } from "react";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FormCard from "./FormCard";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, loading] = useAuthState(auth);

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const formFields = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "Enter your full name",
      required: true,
      controlId: "formFullName",
    },
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
      title="Register"
      subTitle="Please enter your details to register"
      handleSubmit={handleRegister}
      formFields={formFields}
      buttonText="Register"
      linkText="Login here"
      linkTo="/login"
      linkDescription="Already have an account?"
    />
  );
};

export default Register;
