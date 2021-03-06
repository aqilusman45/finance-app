import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import {
  fetchAccounts,
  updateAccountAsync,
} from "./../../store/reducers/accounts";
import { addInvoice } from "../../store/reducers/invoices";
import { v4 as uuidv4 } from "uuid";
import { EntryTypes } from "../../lib/enum";
import { ValidationError } from "yup";
import { useHistory } from "react-router";
import { updateUserBalance } from "../../utils/invoice";
import { addEntry } from "../../store/reducers/entries";
import {
  addEntrySchema,
  accountTypeCheck,
  checkProduct,
  invoiceSchema,
} from "../../helpers/validations";
const INITIAL_STATE = {
  uid: uuidv4(),
  invoiceNumber: "",
  date: Date.now(),
  paymentOption: {
    value: "",
    label: "",
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
  createdAt: Date.now(),
  updatedAt: Date.now(),
  quantity: 0,
};

const ENTRY_INITIAL_STATE = {
  uid: uuidv4(),
  date: Date.now(),
  paymentOption: {
    value: "",
    label: "",
  },
  entryType: {
    value: EntryTypes.CREDIT,
    label: EntryTypes.CREDIT,
  },
  accountRef: "",
  invoiceRef: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  amount: "",
};

const CreateInvoice = () => {
  const [createInvoice, setCreateInvoice] = useState<any>(INITIAL_STATE);
  const [, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [productID, setProductID] = useState<any>();
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [entryData] = useState<any>(ENTRY_INITIAL_STATE);
  const [accountData, setAccountData] = useState({});

  const dispatch = useDispatch();
  const { push } = useHistory();
  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts);
    }
  }, [accounts, dispatch]);

  const updateUserDetail = (user: any) => {
    setAccountData(user);

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
    let updatedObject = [...createInvoice.products];

    updatedObject[findIndex].product = product.uid;
    updatedObject[findIndex].unitPrice = product.price;
    updatedObject[findIndex].name = product.name;

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
          product: Math.floor(Math.random() * 100000000000),
          name: "",
          quantity: 0,
          unitPrice: 0,
          discount: 0,
        },
      ],
    });
  };
  const handleChange = (e: any) => {
    setCreateInvoice((prevField: any) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };
  const UpdateQuantity = (value: any, item: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.product === item
    );
    const updatedObject = [...createInvoice.products];
    updatedObject[findIndex].quantity = Number(value);
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const getDiscountValue = (value: number, item: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.product === item
    );

    const updatedObject = [...createInvoice.products];
    updatedObject[findIndex].discount = Number(value);
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
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
        totalTax +
        (item.quantity * item.unitPrice * createInvoice.taxRate) / 100);
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

  const updatedBalance = updateUserBalance(
    createInvoice.currentBalance,
    calculateTotal()
  );

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
      currentBalance: updatedBalance,
      totalDiscount: calculateTotalDiscount(),
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
      quantity: calculateQuantities(),
    };
    const entry = {
      ...entryData,
      accountRef: createInvoice.accountRef,
      invoiceRef: createInvoice.uid,
      amount: -calculateTotal(),
      paymentOption: createInvoice.paymentOption,
    };
    const account = {
      ...accountData,
      balance: createInvoice.currentBalance - calculateTotal(),
    };
    try {
      await accountTypeCheck(invoice);
      await invoiceSchema(invoice);
      await addEntrySchema.validate(invoice.detail);
      await checkProduct(invoice);
      dispatch(updateAccountAsync(account as any));
      dispatch(addEntry(entry));
      dispatch(
        addInvoice(invoice, () => {
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
      isEdit={false}
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

export default CreateInvoice;
