import React, { useState, useEffect } from "react";
import SignInView from "../components/SignInView/SignInView";
import { ValidationError } from "yup";
import { signInSchema, authenticateUser, checkExistedUser } from "../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchUsers } from "../store/reducers/user";
import { addUserAuthAsync } from "../store/reducers/auth";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  email: "",
  password: "",
};
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const dispatch = useDispatch();
  const { push } = useHistory();
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
        push("/home");
      } else {
        authenticateUser();
      }
    });
  };

  const submit = async () => {
    const userAuth = {
      email: formFields.email,
      name: users?.find((user) => user.email === formFields.email)?.name,
      uid: uuidv4(),
      createdAt: Date.now(),
    };

    try {
      await signInSchema.validate(formFields);
      verifyUser(formFields);
      if(users?.length){
        dispatch(addUserAuthAsync(userAuth as any));
      } else {
        checkExistedUser()
      }
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
