import React, { useState, useEffect } from "react";
import InvoiceView from "../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RootState } from "../../store/rootReducer";
import { PaymentOptions } from "../../lib/enum";
import { v4 as uuidv4 } from "uuid";
import {
  fetchInvoices,
  updateInvoiceAsync,
} from "../../store/reducers/invoices";
import { ValidationError } from "yup";

const INITIAL_STATE = {
  uid: uuidv4(),
  invoiceNumber: "",
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
  createdAt: 0,
  updatedAt: 0,
};

const EditInvoice: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const [createInvoice, setCreateInvoice] = useState<any>(INITIAL_STATE);
  const [taxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [productID, setProductID] = useState<any>();
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const dispatch = useDispatch();
  const { invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });
  const { push } = useHistory();

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchInvoices());
    }
  }, [dispatch, invoices]);

  useEffect(() => {
    if (invoices) {
      const findInvoice = invoices.find(({ uid }) => uid === id);
      setCreateInvoice(findInvoice);
    }
  }, [id, invoices]);

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
    // const findIndex = createInvoice.products.findIndex(
    //   (index: any) => index.product === productID
    // );

    // let updatedObject = [...createInvoice.products];
    // updatedObject[findIndex].product = product.uid;
    // updatedObject[findIndex].unitPrice = product.price;
    // updatedObject[findIndex].name = product.name;
    // setCreateInvoice({
    //   ...createInvoice,
    //   products: updatedObject,
    // });
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
    // const findIndex = createInvoice.products.findIndex(
    //   (index: any) => index.product === item
    // );
    // const updatedObject = [...createInvoice.products];
    // updatedObject[findIndex].quantity = Number(value);
    // setCreateInvoice({
    //   ...createInvoice,
    //   products: updatedObject,
    // });
  };

  const getDiscountValue = (value: number, item: number) => {
    // const findIndex = createInvoice.products.findIndex(
    //   (index: any) => index.product === item
    // );

    // const updatedObject = [...createInvoice.products];
    // updatedObject[findIndex].discount = Number(value);
    // setCreateInvoice({
    //   ...createInvoice,
    //   products: updatedObject,
    // });
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
    // setTaxInput(value);
  };

  const calculateTotal = () => {
    return Math.round(
      calculateSubTotal() + calculateTax() - calculateTotalDiscount()
    );
  };

  const submit = async  () => {
    const invoice = {
      ...createInvoice,
      updatedAt: Date.now()
      
    }
    try {
      dispatch(updateInvoiceAsync(invoice as any, () => {
        push('/home/create-invoice')
      }))      
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
    />
  );
};

export default EditInvoice;
