import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAccounts } from "./../../store/reducers/accounts";
const product1 = {

  productName: "",
  quantity: 0,
  unitPrict: 0,
  total: 0,
  productID: '',
  invoideID: '',
  discount: 0,
};

const product2 = {
  uid: '',
  invoiceNumber: '',
  date: '',
  paymentOption: {
    value: '',
    label: '',
  },
  detail: {
    name: '',
    companyName: 'string',
    shippingAddress: '',
    phone: '',
    address: '',
    email: '',

  },
  products: [{name: '', quantity: 0, unitPrice: 0, discount: 0}],
  totalDiscount: 0,
  subTotal: 0,
  taxRate: 0,
  shipping: 0,
  currentBalance: 0,
  total: 0,
  remarks: '',
  accountRef: '',
  createdAt: 0,
  updatedAt: 0,
};


const CreateInvoice = () => {
  // const [products, setProducts] = useState<any[]>([product1, product2]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([product1]);
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
        productName: "",
        quantity: 0,
        unitPrict: 0,
        total: 0,
        productID: '',
        invoideID: '',
        discount: 0,
      },
    ]);
  };
console.log("selectedProducts", selectedProducts);


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
        setSelectedProducts={setSelectedProducts}
      />
    </>
  );
};

export default CreateInvoice;
