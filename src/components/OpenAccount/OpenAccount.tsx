import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { ValidationError } from "yup";
import OpenAccountView from "../OpenAccountView/OpenAccountView";
import { addAccount } from "../../store/reducers/accounts";
import { accountSchema } from "../../helpers/validations";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  address: "",
  companyName: "",
  balance: "0",
  accountType: {
    value: "",
    label: "",
  },
};

export const accountTypeCheck = async (
  account: any,
) => {
  if (!account) return;
  if (!account.accountType) {
    throw new Error(`Account type is a required field`);
  }
};

const OpenAccount: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    const account = {
      ...formFields,
      balance: parseInt(formFields.balance),
      uid: uuidv4(),
      enabled: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await accountSchema.validate(account)
      await accountTypeCheck(account);
      dispatch(addAccount(account as any, () => {
        push('/home/manage-accounts')
      }))
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
      isEdit={false}
    />
  );
};

export default OpenAccount;
