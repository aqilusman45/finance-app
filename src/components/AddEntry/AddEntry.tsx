import React, { useState, useEffect } from "react";
import AddEntryView from "../AddEntryView/AddEntryView";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccounts,
  updateAccountAsync,
} from "../../store/reducers/accounts";
import { fetchInvoices } from "../../store/reducers/invoices";
import { RootState } from "../../store/rootReducer";
import { useHistory } from "react-router";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  address: "",
  companyName: "",
  balance: 0,
  accountType: {
    value: "",
    label: "",
  },
};

const AddEntry: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [amount, setAmount] = useState<any>(0);
  const [formFields, setFormFields] = useState<any>({ ...INITIAL_STATE });
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
  const { invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchInvoices());
    }
  }, [invoices, dispatch]);

  const updateUserDetail = (user: any) => {
    setFormFields(user);
  };

  const submit = () => {
    const account = {
      ...formFields,
      balance: Number(formFields.balance) + Number(amount),
      updatedAt: Date.now(),
    };
    try {
      dispatch(
        updateAccountAsync(account as any, () => {
          push("/home/entries");
        })
      );
    } catch (error) {}
  };

  return (
    <AddEntryView
      isEdit={false}
      accounts={accounts}
      userData={userData}
      setUserData={setUserData}
      updateUserDetail={updateUserDetail}
      amount={amount}
      setAmount={setAmount}
      formFields={formFields}
      submit={submit}
    />
  );
};

export default AddEntry;
