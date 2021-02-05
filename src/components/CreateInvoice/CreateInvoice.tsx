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
      id: 123,
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
  const [selectedProducts, setSelectedProducts] = useState<any>(product2);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchText, setSearchText] = useState("");
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
    console.log("currentUser", currentUser);
    console.log("selectedProducts", selectedProducts);
    setSelectedProducts({
      ...selectedProducts,
      uid: currentUser.uid,
      currentBalance: currentUser.balance,
      detail: {
        ...selectedProducts.detail,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        companyName: currentUser.companyName,
      },
    });
    console.log("selectedProducts", selectedProducts);
  };
  const RemoveItem = (ProductID: any) => {
    console.log("ProductID", ProductID);

    const filter = selectedProducts.products.filter(
      (item: any) => item.id !== ProductID
    );
    console.log("filter", filter);

    setSelectedProducts({
      ...selectedProducts,
      products: filter,
    });
  };

  const AddProduct = () => {
    setSelectedProducts({
      ...selectedProducts,
      products: [...selectedProducts.products, {
        name: "",
        quantity: 0,
        unitPrice: 0,
        discount: 0,
        id: Math.floor(Math.random() * 10000000000),
      }],
    });
  };
  console.log("selectedProducts", selectedProducts.products);

  const UpdateQuantity = (value: number, productID: number) => {
    const findIndex = selectedProducts.products.findIndex(
      (index: any) => index.id === productID
    );
    
    
    // const updatedObject = [...selectedProducts];
    // updatedObject[findIndex].quantity = value;
    // setSelectedProducts(updatedObject);
    setSelectedProducts({
      ...selectedProducts,
      products: [...selectedProducts.products, selectedProducts.products[findIndex].quantity=value]
    })
  };

  const getDiscountValue = (value: number, productID: number) => {
    const findIndex = selectedProducts.findIndex(
      (index: any) => index.productID === productID
    );
    const updatedObject = [...selectedProducts];
    updatedObject[findIndex].discount = value;
    setSelectedProducts(updatedObject);
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    selectedProducts.products.map((item: any) => {
      return (totalDiscount =
        totalDiscount + (item.discount * item.unitPrict) / 100);
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    selectedProducts.products.map((item: any) => {
      return (total = total + item.quantity * item.unitPrict);
    });
    return total;
  };

  const calculateTax = () => {
    let totalTax = 0;
    selectedProducts.products.map((item: any) => {
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
        selectedProducts={selectedProducts}
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
        setSelectedProducts={setSelectedProducts}
        updateUserDetail={updateUserDetail}
      />
    </>
  );
};

export default CreateInvoice;
