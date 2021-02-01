import React, { useState, useEffect } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { IInvoice } from "./../../lib/invoice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import * as JsSearch from "js-search";
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
  const [products, setProducts] = useState<any[]>([product1, product2]);
  const [taxInput, setTaxInput] = useState<any>(0);
  const [userData, setUserData] = useState<any>();
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();

  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts);
    }
  }, [accounts, dispatch]);

  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("phone");
  search.addIndex("email");
  search.addIndex("accountNumber");
  search.addDocuments(accounts!);
console.log("accounts", accounts);

  // js-search code end here
  const searchUser = (input: any) => {
    search.search(input);
    setUserData(search.search(input));
  };
  console.log("userData", userData);

  const RemoveItem = (ProductID: any) => {
    const filter = products.filter(
      (product: any) => product.productID !== ProductID
    );
    setProducts(filter);
  };

  const AddProduct = () => {
    setProducts([
      ...products,
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
    const findIndex = products.findIndex(
      (index) => index.productID === productID
    );
    const updatedObject = [...products];
    updatedObject[findIndex].quantity = value;
    setProducts(updatedObject);
  };

  const getDiscountValue = (value: number, productID: number) => {
    const findIndex = products.findIndex(
      (index) => index.productID === productID
    );
    const updatedObject = [...products];
    updatedObject[findIndex].discount = value;
    setProducts(updatedObject);
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    products.map((item) => {
      // console.log("discount", totalDiscount =
      // totalDiscount + (item.discount * item.unitPrict) / 100);

      return (totalDiscount =
        totalDiscount + (item.discount * item.unitPrict) / 100);
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    products.map((item) => {
      return (total = total + item.quantity * item.unitPrict);
    });
    return total;
  };

  const calculateTax = () => {
    let totalTax = 0;
    products.map((item) => {
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
    <InvoiceView
      UpdateQuantity={UpdateQuantity}
      isEdit={false}
      products={products}
      RemoveItem={RemoveItem}
      AddProduct={AddProduct}
      calculateSubTotal={calculateSubTotal}
      handleTaxInput={handleTaxInput}
      getDiscountValue={getDiscountValue}
      calculateTax={calculateTax}
      calculateDiscount={calculateDiscount}
      calculateTotal={calculateTotal}
      searchUser={searchUser}
      userData={userData}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
};

export default CreateInvoice;
