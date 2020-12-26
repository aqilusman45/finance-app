import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ValidationError } from "yup";
import OpenAccountView from "../OpenAccountView/OpenAccountView";
import {
  fetchAccounts,
  updateAccountAsync,
} from "../../store/reducers/accounts";
import { accountSchema } from "../../helpers/validations";
import { RootState } from "../../store/rootReducer";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  balance: "0",
  accountType: {
    value: "",
    label: "",
  },
};

export const accountTypeCheck = async (account: any) => {
  if (!account) return;
  if (!account.accountType) {
    throw new Error(`Account type is a required field`);
  }
};

const OpenAccount: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

  useEffect(() => {
    if (accounts) {
      const account = accounts.find(({ uid }) => uid === id);
      if (account) {
        setFormFields({ ...(account as any) });
      }
    }
  }, [accounts, id]);

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    // @ts-ignore
    delete formFields._rev
    const account = {
      ...formFields,
      balance: parseInt(formFields.balance),
      updatedAt: Date.now(),
    };
    try {
      await accountSchema.validate(account);
      await accountTypeCheck(account);
      dispatch(
        updateAccountAsync(account as any, () => {
          push("/home/manage-accounts");
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <OpenAccountView
      errors={errors}
      handleChange={handleChange}
      setErrors={setErrors}
      state={formFields}
      submit={submit}
      isEdit
    />
  );
};

export default OpenAccount;
