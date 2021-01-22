import React, {useState} from "react";
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


const ManageInvoice:React.FC = () => {
  const [products, setProducts] = useState<IInvoice[]>([product1, product2]);

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


    return <InvoiceView isEdit={true} products={products}  RemoveItem={RemoveItem} AddProduct={AddProduct}/>
}

export default ManageInvoice