import React, { useState, useEffect } from "react";
import AddEntryView from "../AddEntryView/AddEntryView";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccounts,
  updateAccountAsync,
} from "../../store/reducers/accounts";
import { addEntrySchema } from "../../helpers/validations";
import { fetchInvoices } from "../../store/reducers/invoices";
import { RootState } from "../../store/rootReducer";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "yup";

import { addEntry } from "../../store/reducers/entries";
export const entryTypeCheck = async (entry: any) => {
  if (!entry) return;
  if (!entry.entryType.value) {
    throw new Error(`Entry type is a required field`);
  }
};

export const paymentOptionCheck = async (entry: any) => {
  if (!entry) return;
  if (!entry.paymentOption.value) {
    throw new Error(`Payment Option is a required field`);
  }
};

export const checkAmount = async (entry: any) => {
  if (!entry) return;
  if (entry.amount === 0 || entry.amount === -0) {
    throw new Error(`Amount should be greather than 0`);
  }
};
const INITIAL_STATE = {
  uid: "",
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

const ENTRY_INITIAL_STATE = {
  date: Date.now(),
  paymentOption: {
    value: "",
    label: "",
  },
  entryType: {
    value: "",
    label: "",
  },
  accountRef: "",
  invoiceRef: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  amount: 0,
};

const AddEntry: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [amount, setAmount] = useState<any>(0);
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [entryData, setEntryData] = useState({ ...ENTRY_INITIAL_STATE });
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
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

  const handleChange = (e: any) => {
    setEntryData((prevField: any) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };
  const checkEntryType = () => {
    if (entryData.entryType.value === "CREDIT") {
      return "-";
    } else {
      return "+";
    }
  };

  const submit = async () => {
    const account = {
      ...formFields,
      balance:
        Number(formFields.balance) + Number(`${checkEntryType()}${amount}`),
      updatedAt: Date.now(),
    };
    const entry = {
      ...entryData,
      uid: uuidv4(),
      accountRef: formFields.uid,
      amount: Number(`${checkEntryType()}${amount}`),
    };

    try {
      await addEntrySchema.validate(account);
      await entryTypeCheck(entry);
      if (entry.entryType.value === "Debit") {
        await paymentOptionCheck(entry);
      } else {
        delete entry.paymentOption
      }
      await checkAmount(entry);
      dispatch(addEntry(entry as any));
      dispatch(
        updateAccountAsync(account as any, () => {
          push("/home/entries");
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <AddEntryView
      isEdit={false}
      accounts={accounts}
      userData={userData}
      setUserData={setUserData}
      updateUserDetail={updateUserDetail}
      setAmount={setAmount}
      amount={amount}
      formFields={formFields}
      entryFields={entryData}
      submit={submit}
      handleChange={handleChange}
      checkEntryType={checkEntryType}
      setErrors={setErrors}
      errors={errors}
    />
  );
};

export default AddEntry;
