import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { ValidationError } from "yup";
import OpenAccountView from "../OpenAccountView/OpenAccountView";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  balance: 0,
  accountType: "",
};

const OpenAccount: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const { push } = useHistory();
  const dispatch = useDispatch();
  console.log(push, dispatch);
  
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
      enabled: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    console.log(account);
    try {
    } catch (error) {
      setErrors(error)
    }
  };

  return (
    <OpenAccountView
      errors={errors}
      handleChange={handleChange}
      setErrors={setErrors}
      state={formFields}
      submit={submit}
    />
  );
};

export default OpenAccount;
