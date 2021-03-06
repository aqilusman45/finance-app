import React, { useState, useEffect } from "react";
import SignUpView from "../components/SignUpView/SignUpView";
import { ValidationError } from "yup";
import { v4 as uuidv4 } from "uuid";
import { signUpSchema, checkDuplication } from "../helpers/validations";
import { addUserAsync } from "../store/reducers/user";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchUsers } from "../store/reducers/user";
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
  const { users } = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const avoidDuplication = (user: any) => {
    users?.map((exUser) => {
      if (exUser.email === user.email || exUser.phone === user.phone) {
        checkDuplication();
      }
    });
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
      avoidDuplication(formFields);
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
