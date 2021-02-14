import React, { useState, useEffect } from "react";
import AddEntryView from "../AddEntryView/AddEntryView";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../../store/reducers/accounts";
import { fetchInvoices } from "../../store/reducers/invoices";
import { RootState } from "../../store/rootReducer";

const INITIAL_STATE = {
  uid: "",
  date: Date.now(),
  paymentOptions: {
    value: "",
    label: "",
  },
  entryType: {
    value: "",
    label: "",
  },
  accountRef: "",
  invoiceRef: "",
  name: "",
  phone: "",
  description: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  entries: [
    {
      payableAmount: 0,
      receivableAmount: 0,
      remainingAmount: 0,
      date: Date.now(),
    },
  ],
};

const AddEntry: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [currentBlnc, setCurrentBlnc] = useState<any>(1000);
  const [amount, setAmount] = useState<any>(0);
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });

  const dispatch = useDispatch();
  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  const { invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });
  console.log("invoices", invoices);
  console.log("formFields", formFields);

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

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const updateUserDetail = (user: any) => {
    setSelectedUser(user);
  };
  const getInvoiceRef = () => {
    invoices?.forEach((invoice, idx) => {
      if (invoice.accountRef === selectedUser.uid) {
        console.log("idx", invoice.accountRef, selectedUser.uid, idx);
      }

      return null;
    });
  };
  getInvoiceRef();

  return (
    <AddEntryView
      isEdit={false}
      accounts={accounts}
      userData={userData}
      setUserData={setUserData}
      updateUserDetail={updateUserDetail}
      selectedUser={selectedUser}
      currentBlnc={currentBlnc}
      amount={amount}
      setAmount={setAmount}
      formFields={formFields}
      handleChange={handleChange}
    />
  );
};

export default AddEntry;
