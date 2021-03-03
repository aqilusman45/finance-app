import React, { useState, useEffect } from "react";
import SignInView from "../components/SignInView/SignInView";
import { ValidationError } from "yup";
import { signInSchema } from "../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchUsers } from "../store/reducers/user";
import { setUser } from "../store/reducers/auth";

const INITIAL_STATE = {
  email: "",
  password: "",
};
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => {
    return state.users;
  });
  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const verifyUser = (formFields: any) => {
    users?.map((user) => {
      if (
        user.email === formFields.email &&
        user.password === formFields.password
      ) {
        dispatch(setUser(user as any));
      }
    });
  };
  const submit = async () => {
    try {
      await signInSchema.validate(formFields);
      verifyUser(formFields);
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

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
