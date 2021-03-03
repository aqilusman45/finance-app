import React, { useState } from "react";
import SignUpView from "../components/SignUpView/SignUpView";
import { ValidationError } from "yup";
import { v4 as uuidv4 } from "uuid";
import { signUpSchema } from "../helpers/validations";
import { addUserAsync } from "../store/reducers/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const SignUp: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    const user = {
      ...formFields,
      uid: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await signUpSchema.validate(user);
      dispatch(
        addUserAsync(user as any, () => {
          push("/home");
        })
      );
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
