import React, { useState } from "react";
import SignUpView from "../components/SignUpView/SignUpView";
import { ValidationError } from "yup";
import { v4 as uuidv4 } from "uuid";
import { authSchema } from "../helpers/validations";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const SignUp: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    const account = {
      ...formFields,
      uid: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await authSchema.validate(account);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <SignUpView
      setErrors={setErrors}
      errors={errors}
      handleChange={handleChange}
      submit={submit}
    />
  );
};

export default SignUp;
