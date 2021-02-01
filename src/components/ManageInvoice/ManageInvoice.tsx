import React, { useState } from "react";
import InvoiceView from "./../InvoiceView/InvoiceView";
import { useParams } from "react-router";
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

const ManageInvoice: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  console.log("id", id);
  
  const [products, setProducts] = useState<any[]>([product1, product2]);
  const [taxInput, setTaxInput] = useState<any>(0);

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
  };

  const calculateDiscount = () => {
    let totalDiscount = 0;
    products.map((item: any) => {
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
    return calculateSubTotal() - calculateTax();
  };

  return (
    <InvoiceView
      isEdit={true}
      UpdateQuantity={UpdateQuantity}
      products={products}
      RemoveItem={RemoveItem}
      AddProduct={AddProduct}
      calculateSubTotal={calculateSubTotal}
      handleTaxInput={handleTaxInput}
      getDiscountValue={getDiscountValue}
      calculateTax={calculateTax}
      calculateDiscount={calculateDiscount}
      calculateTotal={calculateTotal}
    />
  );
};

export default ManageInvoice;
