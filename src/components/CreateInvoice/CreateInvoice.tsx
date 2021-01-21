import React, { useState } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { IInvoice } from "./../../lib/invoice";

const product1 = {
  name: "product1",
  quantity: 100,
  unitPrict: 1000,
  total: 1000,
  productID: 123,
  invoideID: 100,
};
const product2 = {
  name: "product2",
  quantity: 10,
  unitPrict: 100,
  total: 1000,
  productID: 127,
  invoideID: 100,
};

const CreateInvoice = () => {
  const [products, setProducts] = useState<any[]>([product1, product2]);
  const [subTotal, setSubTotal] = useState<any>();
  const [tax, setTax] = useState<number | undefined>();

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
        name: "product3",
        quantity: 10,
        unitPrict: 10,
        total: 50,
        productID: Math.random() * 10000000,
        invoideID: 101,
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
    updatedObject[findIndex]["discount"] = value;
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    products.map((item) => {
      totalDiscount = item.discount / item.unitPrict / 100 + totalDiscount;
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let total: number = 0;
    products.map((item) => {
      total = total + item.quantity * item.unitPrict;
    });
    setSubTotal(total);
    return total;
  };

  const calculateTax = (value: number) => {
    const totalTax = (subTotal * value) / 100;
    setTax(totalTax);
  };
  return (
    <InvoiceView
      UpdateQuantity={UpdateQuantity}
      isEdit={false}
      products={products}
      RemoveItem={RemoveItem}
      AddProduct={AddProduct}
      calculateSubTotal={calculateSubTotal}
      calculateTax={calculateTax}
      tax={tax}
      getDiscountValue={getDiscountValue}
    />
  );
};

export default CreateInvoice;
