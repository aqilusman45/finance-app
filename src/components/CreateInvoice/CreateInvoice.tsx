import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
const product1 = {
  productName: "product1",
  quantity: 100,
  unitPrict: 1000,
  total: 1000,
  productID: 123,
  invoideID: 100,
  discount: 0,
};
const product2 = {
  productName: "product2",
  quantity: 10,
  unitPrict: 100,
  total: 1000,
  productID: 127,
  invoideID: 100,
  discount: 0,
};

const CreateInvoice = () => {
  // const [products, setProducts] = useState<any[]>([product1, product2]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([product1, product2]);
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

 

  const RemoveItem = (ProductID: any) => {
    const filter = selectedProducts.filter(
      (product: any) => product.productID !== ProductID
    );
    setSelectedProducts(filter);
  };

  const AddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      {
        productName: "product3",
        quantity: 10,
        unitPrict: 10,
        total: 50,
        productID: Math.random() * 10000000,
        invoideID: 101,
        discount: 0,
      },
    ]);
  };

  const UpdateQuantity = (value: number, productID: number) => {
    const findIndex = selectedProducts.findIndex(
      (index) => index.productID === productID
    );
    const updatedObject = [...selectedProducts];
    updatedObject[findIndex].quantity = value;
    setSelectedProducts(updatedObject);
  };

  const getDiscountValue = (value: number, productID: number) => {
    const findIndex = selectedProducts.findIndex(
      (index) => index.productID === productID
    );
    const updatedObject = [...selectedProducts];
    updatedObject[findIndex].discount = value;
    setSelectedProducts(updatedObject);
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    selectedProducts.map((item) => {
      return (totalDiscount =
        totalDiscount + (item.discount * item.unitPrict) / 100);
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    selectedProducts.map((item) => {
      return (total = total + item.quantity * item.unitPrict);
    });
    return total;
  };

  const calculateTax = () => {
    let totalTax = 0;
    selectedProducts.map((item) => {
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
      />
    </>
  );
};

export default CreateInvoice;
