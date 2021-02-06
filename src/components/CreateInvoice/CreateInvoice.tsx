import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
import products from "../../store/reducers/products";

const product2 = {
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
      unitPrice: 0,
      discount: 0,
      id: Math.floor(Math.random() * 10000000000).toString(),
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
  // const [products, setProducts] = useState<any[]>([product1, product2]);
  const [selectedProducts, setSelectedProducts] = useState<any>({});
  const [createInvoice, setCreateInvoice] = useState<any>(product2);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchText, setSearchText] = useState("");
  const [productID, setProductID] = useState<number>();
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
    // updatedObject[findIndex].id = selectedProducts.uid;
    updatedObject[findIndex].name = selectedProducts.name;
    setCreateInvoice({
      ...createInvoice,
      products: updatedObject,
    });
  };

  const RemoveItem = (ProductID: any) => {
    const filter = createInvoice.products.filter(
      (item: any) => item.id !== ProductID
    );

    setCreateInvoice({
      ...createInvoice,
      products: filter,
    });
  };

  const AddProduct = () => {
    setCreateInvoice({
      ...createInvoice,
      products: [
        ...createInvoice.products,
        {
          name: "",
          quantity: 0,
          unitPrice: 0,
          discount: 0,
          id: Math.floor(Math.random() * 10000000000).toString(),
        },
      ],
    });
  };

  const UpdateQuantity = (value: number, productID: number) => {
    const findIndex = createInvoice.products.findIndex(
      (index: any) => index.id === productID
    );

    // const updatedObject = [...selectedProducts];
    // updatedObject[findIndex].quantity = value;
    // setSelectedProducts(updatedObject);
    // setCreateInvoice({
    //   ...createInvoice,
    //   products: [...createInvoice.products, createInvoice.products[findIndex].quantity=value]
    // })
  };

  const getDiscountValue = (value: number, productID: number) => {
    const findIndex = createInvoice.findIndex(
      (index: any) => index.productID === productID
    );
    const updatedObject = [...createInvoice];
    updatedObject[findIndex].discount = value;
    setCreateInvoice(updatedObject);
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    createInvoice.products.map((item: any) => {
      return (totalDiscount =
        totalDiscount + (item.discount * item.unitPrict) / 100);
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    createInvoice.products.map((item: any) => {
      return (total = total + item.quantity * item.unitPrict);
    });
    return total;
  };

  const calculateTax = () => {
    let totalTax = 0;
    createInvoice.products.map((item: any) => {
      return (totalTax =
        totalTax + (item.quantity * item.unitPrict * taxInput) / 100);
    });
    return totalTax;
  };

  const handleTaxInput = (value: number) => {
    setTaxInput(value);
  };

  const calculateTotal = () => {
    return calculateSubTotal() + calculateTax() - calculateDiscount();
  };

  return (
    <>
      <InvoiceView
        UpdateQuantity={UpdateQuantity}
        isEdit={false}
        createInvoice={createInvoice}
        RemoveItem={RemoveItem}
        AddProduct={AddProduct}
        calculateSubTotal={calculateSubTotal}
        handleTaxInput={handleTaxInput}
        getDiscountValue={getDiscountValue}
        calculateTax={calculateTax}
        calculateDiscount={calculateDiscount}
        calculateTotal={calculateTotal}
        userData={userData}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        searchText={searchText}
        setSearchText={setSearchText}
        setUserData={setUserData}
        setCreateInvoice={setCreateInvoice}
        updateUserDetail={updateUserDetail}
        updateProductDetail={updateProductDetail}
        setSelectedProducts={setSelectedProducts}
        getProductId={getProductId}
      />
    </>
  );
};

export default CreateInvoice;
