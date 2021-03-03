import React, { useState } from "react";
import SignUpView from "../components/SignUpView/SignUpView";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const SignUp: React.FC = () => {
  const [, setFormFields] = useState({ ...INITIAL_STATE });

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  return <SignUpView handleChange={handleChange} />;
};

export default SignUp;
