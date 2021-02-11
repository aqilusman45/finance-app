import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
import { addInvoice } from "../../store/reducers/invoices";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  uid: "",
  invoiceNumber: "098",
  date: Date.now(),
  paymentOption: {
    value: "BANK",
    label: "BANK;",
  },
  detail: {
    name: "",
    companyName: "dlsf",
    shippingAddress: "ldf",
    phone: "",
    address: "",
    email: "",
  },
  products: [
    {
      name: "",
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      id: 12345,
    },
  ],
  totalDiscount: 0,
  subTotal: 0,
  taxRate: 0,
  total: 0,
  shipping: 20,
  currentBalance: 20,
  remarks: "sd",
  accountRef: "sdfl",
  createdAt: 0,
  updatedAt: 0,
};

const CreateInvoice = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>({});
  const [createInvoice, setCreateInvoice] = useState<any>(INITIAL_STATE);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [productID, setProductID] = useState<any>();

  const dispatch = useDispatch();
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
      (index: any) => index.id === productID
    );
    
    let updatedObject = [...createInvoice.products];
    updatedObject[findIndex].name = product.name;
    updatedObject[findIndex].unitPrice = product.price;
    updatedObject[findIndex].id = product.uid;
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const RemoveItem = (remItem: any) => {
    const filter = createInvoice.products.filter(
      (item: any) => item.id !== remItem
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
          name: "",
          quantity: 0,
          unitPrice: 0,
          discount: 0,
          id: Math.floor(Math.random() * 10000000000),
        },
      ],
    });
  };

  const UpdateQuantity = (value: any, item: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.id === item
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
      (index: any) => index.id === item
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
    return totalDiscount;
  };


  const calculateSubTotal = () => {
    let total: number = 0;
    createInvoice.products.map((item: any) => {
      return (total = total + item.quantity * item.unitPrice);
    });
    return total;
  };

  const calculateTax = () => {
    let totalTax = 0;
    createInvoice.products.map((item: any) => {
      return (totalTax =
        totalTax + (item.quantity * item.unitPrice * taxInput) / 100);
    });
    return totalTax;
  };

  const handleTaxInput = (value: number) => {
    setTaxInput(value);
  };

  const calculateTotal = () => {
    return calculateSubTotal() + calculateTax() - calculateTotalDiscount();
  };

  const submit = async () => {
    const invoice = {
      ...createInvoice,
      uid: uuidv4(),
      totalDiscount: Math.round(calculateTotalDiscount()),
      subTotal: Math.round(calculateSubTotal()),
      taxRate: Math.round(calculateTax()),
      total: Math.round(calculateTotal()),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    try {
      dispatch(addInvoice(invoice))
      
    } catch {
      console.log("error inn");
      
    }
  }

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
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
      setUserData={setUserData}
      setCreateInvoice={setCreateInvoice}
      updateUserDetail={updateUserDetail}
      updateProductDetail={updateProductDetail}
      setSelectedProducts={setSelectedProducts}
      getProductId={getProductId}
      submit={submit}
    />
  );
};

export default CreateInvoice;
