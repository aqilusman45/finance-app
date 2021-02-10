import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
const INITIAL_STATE = {
  uid: "",
  invoiceNumber: "",
  date: "",
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
      name: "",
      quantity: 0,
      unitPrice: 10,
      discount: 0,
      id: 1234,
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

  const updateUserDetail = () => {
    setCreateInvoice({
      ...createInvoice,
      uid: currentUser.uid,
      currentBalance: currentUser.balance,
      detail: {
        ...createInvoice.detail,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        companyName: currentUser.companyName,
      },
    });
  };

  const getProductId = (id: any) => {
    setProductID(id);
  };
  const updateProductDetail = () => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.id === productID
    );

    let updatedObject = [...createInvoice.products];
    updatedObject[findIndex].name = selectedProducts.name;
    updatedObject[findIndex].unitPrice = selectedProducts.price;
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
  // console.log("product id", productID);
  // console.log("selected pro", selectedProducts);
  // console.log("createinvoice", createInvoice);

  const addNewRaw = () => {
    setCreateInvoice({
      ...createInvoice,
      products: [
        ...createInvoice.products,
        {
          name: "",
          quantity: 0,
          unitPrice: 5,
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
    console.log("discoutn value", value);

    const updatedObject = [...createInvoice.products];
    updatedObject[findIndex].discount = Number(value);
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
    console.log("state value", createInvoice);
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
    />
  );
};

export default CreateInvoice;
