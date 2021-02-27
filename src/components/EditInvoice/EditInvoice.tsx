import React, { useState, useEffect } from "react";
import InvoiceView from "../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RootState } from "../../store/rootReducer";
import { v4 as uuidv4 } from "uuid";
import {
  fetchInvoices,
  updateInvoiceAsync,
} from "../../store/reducers/invoices";
import { IAccount } from "../../lib/accounts";
import {
  fetchAccounts,
  updateAccountAsync,
} from "./../../store/reducers/accounts";
import { updateEntryAsync, fetchEntries } from "../../store/reducers/entries";
import { ValidationError } from "yup";
import { updateUserBalanceAtEidtInvoice } from "../../utils/invoice";
const INITIAL_STATE = {
  uid: uuidv4(),
  invoiceNumber: "",
  date: Date.now(),
  paymentOption: {
    value: '',
    label: '',
  },
  detail: {
    name: "",
    companyName: "",
    shippingAddress: "",
    phone: "",
    address: "",
    email: "",
  },
  products: [
    {
      product: "",
      name: "",
      quantity: 0,
      unitPrice: 0,
      discount: 0,
    },
  ],
  totalDiscount: 0,
  subTotal: 0,
  taxRate: 0,
  shipping: 0,
  currentBalance: 0,
  total: 0,
  remarks: "",
  accountRef: "",
  createdAt: 0,
  updatedAt: 0,
  quantity: 0,
};

const EditInvoice: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const [createInvoice, setCreateInvoice] = useState<any>(INITIAL_STATE);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [productID, setProductID] = useState<any>();
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [prevTotal, setPrevTotal] = useState<any>();
  const [userAccont, setUserAccont] = useState<IAccount>();
  const [ledgerEntry, setLedgerEntry] = useState<any>();
  const dispatch = useDispatch();
  const { invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });
  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  const { entries } = useSelector((state: RootState) => {
    return state.entries;
  });

  const { push } = useHistory();

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchInvoices());
    }
    if (!accounts) {
      dispatch(fetchAccounts);
    }

    if (!entries) {
      dispatch(fetchEntries());
    }
  }, [dispatch, invoices, accounts, entries]);

  useEffect(() => {
    if (accounts) {
      const findAccount = accounts.find(
        ({ uid }) => uid === createInvoice.accountRef
      );
      setUserAccont(findAccount);
    }
    if (entries) {
      const findEntry = entries.find(
        ({ invoiceRef }) => invoiceRef === createInvoice.uid
      );
      setLedgerEntry(findEntry);
    }
    if (invoices) {
      const findInvoice = invoices.find(({ uid }) => uid === id);
      setCreateInvoice(findInvoice);
      setPrevTotal(findInvoice?.total);
    }
  }, [
    id,
    invoices,
    accounts,
    createInvoice.accountRef,
    createInvoice.uid,
    entries,
  ]);

  const updateUserDetail = (user: any) => {
    setCreateInvoice({
      ...createInvoice,
      currentBalance: user.balance,
      accountRef: user.uid,
      detail: {
        ...createInvoice.detail,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        companyName: user.companyName,
      },
    });
  };

  const getProductId = (id: any) => {
    setProductID(id);
  };

  const updateProductDetail = (product: any) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.product === productID
    );
    const updatedObject = createInvoice.products.map(
      (node: any, idx: number) => {
        if (findIndex === idx) {
          return {
            ...node,
            product: product.uid,
            name: product.name,
            unitPrice: product.price,
          };
        }
        return node;
      }
    );

    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const RemoveItem = (remItem: any) => {
    const filter = createInvoice.products.filter(
      (item: any) => item.product !== remItem
    );

    setCreateInvoice({
      ...createInvoice,
      products: filter,
    });
  };

  const addNewRaw = () => {
    setCreateInvoice({
      ...createInvoice,
      products: [
        ...createInvoice.products,
        {
          product: Math.floor(Math.random() * 10000000000),
          name: "",
          quantity: 0,
          unitPrice: 0,
          discount: 0,
        },
      ],
    });
  };

  const UpdateQuantity = (value: any, item: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.product === item
    );
    const updatedObject = createInvoice.products.map(
      (node: any, idx: number) => {
        if (findIndex === idx) {
          return {
            ...node,
            quantity: Number(value),
          };
        }
        return node;
      }
    );
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const getDiscountValue = (value: number, item: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.product === item
    );

    const updatedObject = createInvoice.products.map(
      (node: any, idx: number) => {
        if (findIndex === idx) {
          return {
            ...node,
            discount: Number(value),
          };
        }
        return node;
      }
    );
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const handleChange = (e: any) => {
    setCreateInvoice((prevField: any) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;
    createInvoice.products.map((item: any) => {
      return (totalDiscount =
        totalDiscount + (item.discount * item.unitPrice * item.quantity) / 100);
    });
    return Math.round(totalDiscount);
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    createInvoice.products.map((item: any) => {
      return (total = total + item.quantity * item.unitPrice);
    });
    return Math.round(total);
  };

  const calculateTax = () => {
    let totalTax = 0;
    createInvoice.products.map((item: any) => {
      return (totalTax =
        totalTax + (item.quantity * item.unitPrice * createInvoice.taxRate) / 100);
    });
    return Math.round(totalTax);
  };

  const handleTaxInput = (value: number) => {
    setTaxInput(value);
    setCreateInvoice({
      ...createInvoice,
      taxRate: Number(value),
    });
  };

  const calculateTotal = () => {
    return Math.round(
      calculateSubTotal() + calculateTax() - calculateTotalDiscount()
    );
  };

  const calculateQuantities = () => {
    let count = 0;
    createInvoice.products.map(() => {
      return count++;
    });
    return count;
  };

  const submit = async () => {
    const invoice = {
      ...createInvoice,
      currentBalance: updateUserBalanceAtEidtInvoice(
        userAccont?.balance!,
        prevTotal,
        calculateTotal()
      ),
      totalDiscount: calculateTotalDiscount(),
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
      updatedAt: Date.now(),
      quantity: calculateQuantities(),
    };
    const account = {
      ...userAccont,
      balance: updateUserBalanceAtEidtInvoice(
        userAccont?.balance!,
        prevTotal,
        calculateTotal()
      ),
      updatedAt: Date.now(),
    };
    
    const entry = {
      ...ledgerEntry,
      amount: -calculateTotal(),
      updatedAt: Date.now(),
    };

    try {
      dispatch(updateEntryAsync(entry as any));
      dispatch(updateAccountAsync(account as any));
      dispatch(
        updateInvoiceAsync(invoice as any, () => {
          push("/home/manage-invoices");
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <InvoiceView
      UpdateQuantity={UpdateQuantity}
      isEdit={true}
      createInvoice={createInvoice}
      RemoveItem={RemoveItem}
      addNewRaw={addNewRaw}
      calculateSubTotal={calculateSubTotal}
      handleTaxInput={handleTaxInput}
      getDiscountValue={getDiscountValue}
      calculateTotalDiscount={calculateTotalDiscount}
      calculateTotal={calculateTotal}
      userData={userData}
      setUserData={setUserData}
      setCreateInvoice={setCreateInvoice}
      updateUserDetail={updateUserDetail}
      updateProductDetail={updateProductDetail}
      getProductId={getProductId}
      submit={submit}
      errors={errors}
      setErrors={setErrors}
      handleChange={handleChange}
    />
  );
};

export default EditInvoice;
