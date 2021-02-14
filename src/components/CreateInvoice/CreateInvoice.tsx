import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
import { addInvoice } from "../../store/reducers/invoices";
import { v4 as uuidv4 } from "uuid";
import { PaymentOptions, EntryTypes } from "../../lib/enum";
import { ValidationError } from "yup";
import { invoiceSchema } from "../../helpers/validations";
import { useHistory } from "react-router";
import { updateUserBalance } from "../../utils/invoice";
import { addEntry } from "../../store/reducers/entries";

const INITIAL_STATE = {
  uid: uuidv4(),
  invoiceNumber: "999999999",
  date: Date.now(),
  paymentOption: {
    value: PaymentOptions.BANK,
    label: PaymentOptions.BANK,
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
      product: 12345,
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
};

const ENTRY_INITIAL_STATE = {
  uid: uuidv4(),
  date: Date.now(),
  paymentOptions: {
    value: PaymentOptions.BANK,
    label: PaymentOptions.BANK,
  },
  entryType: {
    value: EntryTypes.CREDIT,
    label: EntryTypes.DEBIT,
  },
  accountRef: "",
  invoiceRef: "",
  customerName: "",
  phone: "",
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
const CreateInvoice = () => {
  const [createInvoice, setCreateInvoice] = useState<any>(INITIAL_STATE);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [productID, setProductID] = useState<any>();
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [addEntry, setAddEntry] = useState<any>(ENTRY_INITIAL_STATE);

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
        totalTax + (item.quantity * item.unitPrice * taxInput) / 100);
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

  const submit = async () => {
    const invoice = {
      ...createInvoice,
      currentBalance: updatedBalance,
      totalDiscount: calculateTotalDiscount(),
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
    };
    try {
      await invoiceSchema.validate(invoice);
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
    />
  );
};

export default CreateInvoice;
