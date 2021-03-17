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
const SENDER_INITIAL_STATE = {
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

const RECEIVER_INITIAL_STATE = {
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

const SENDER_ENTRY_INITIAL_STATE = {
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
  const [entryData, setEntryData] = useState({ ...SENDER_ENTRY_INITIAL_STATE });
  const [formFields, setFormFields] = useState({ ...SENDER_INITIAL_STATE });
  const [receiverAccount, setReceiverAccount] = useState<any>({
    ...RECEIVER_INITIAL_STATE,
  });
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

  useEffect(() => {
    if (entryData.entryType.value === "CREDIT") {
      if (accounts) {
        const findAccount = accounts.find(
          (account) => account.name === "Receivable"
        );
        setReceiverAccount(findAccount);
      }
    }

    if (entryData.entryType.value === "DEBIT") {
      if (accounts) {
        const findAccount = accounts.find((account) => account.name === "Cash");
        setReceiverAccount(findAccount);
      }
    }
  }, [accounts, entryData.entryType.value]);

  const updateUserDetail = (user: any) => {
    setFormFields(user);
  };

  const removeSenderAccount = () => {
    setFormFields({ ...SENDER_INITIAL_STATE });
  };

  const removeReceiverAccount = () => {
    setReceiverAccount({ ...RECEIVER_INITIAL_STATE });
  };

  const pickReceiverAccount = (user: any) => {
    setReceiverAccount(user);
  };

  const handleChange = (e: any) => {
    setEntryData((prevField: any) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };
  const checkEntryType = (inverse?: boolean) => {
    if (entryData.entryType.value === "CREDIT" && inverse) {
      return "+";
    }
    if (entryData.entryType.value === "CREDIT" && !inverse) {
      return "-";
    }
    if (entryData.entryType.value === "CREDIT") {
      return "-";
    } else {
      return "+";
    }
  };

  const submit = async () => {
    try {
      const account = {
        ...formFields,
        balance:
          Number(formFields.balance) + Number(`${checkEntryType()}${amount}`),
        updatedAt: Date.now(),
      };
      const receiverAccountData = {
        ...receiverAccount,
        balance: Number(receiverAccount.balance) + Number(amount),
        updatedAt: Date.now(),
      };
      const senderEntry = {
        ...entryData,
        uid: uuidv4(),
        accountRef: formFields.uid,
        amount: Number(`${checkEntryType()}${amount}`),
      };
      const receiverEntry = {
        uid: uuidv4(),
        date: Date.now(),
        paymentOption: entryData.paymentOption,
        entryData: entryData.entryType,
        accountRef: receiverAccount.uid,
        invoiceRef: entryData.invoiceRef,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        amount: Number(`${checkEntryType(true)}${amount}`),
      };
      await addEntrySchema.validate(account);
      await entryTypeCheck(senderEntry);
      if (senderEntry.entryType.value === "DEBIT") {
        await paymentOptionCheck(senderEntry);
      } else {
        delete senderEntry.paymentOption;
      }
      await checkAmount(senderEntry);
      dispatch(addEntry(senderEntry as any));
      dispatch(addEntry(receiverEntry as any));
      // update receiver Account
      dispatch(updateAccountAsync(receiverAccountData as any));
      // update sender Account
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
      pickReceiverAccount={pickReceiverAccount}
      receiverAccountFields={receiverAccount}
      removeSenderAccount={removeSenderAccount}
      removeReceiverAccount={removeReceiverAccount}
    />
  );
};

export default AddEntry;
