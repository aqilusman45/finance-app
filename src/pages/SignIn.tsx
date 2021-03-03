import React, { useState } from "react";
import SignInView from "../components/SignInView/SignInView";
import { ValidationError } from "yup";
import { signInSchema } from "../helpers/validations";

const INITIAL_STATE = {
  email: "",
  password: "",
};
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    try {
      await signInSchema.validate(formFields);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <SignInView
      setErrors={setErrors}
      errors={errors}
      handleChange={handleChange}
      submit={submit}
    />
  );
};

export default SignIn;
