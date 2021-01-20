import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonItem,
  IonInput,
  IonPage,
  IonSearchbar,
  IonIcon,
  IonList,
  IonLabel,
  IonButton
} from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import Table from "react-bootstrap/Table";
import { IInvoice } from "./../../lib/invoice";
import "./InvoicView.css";
const keys = ["Description", "Quantity", "Unit Price", "Total"];
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

const InvoiceView = () => {
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

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="5">
              <IonSearchbar
                placeholder="Search User"
                showCancelButton="focus"
                debounce={1000}
              />
            </IonCol>
            <IonCol size="5">
              <IonSearchbar
                onClick={() => {
                  AddProduct();
                }}
                placeholder="Search Product"
                showCancelButton="focus"
                debounce={1000}
              />
            </IonCol>
            <IonCol size="2"></IonCol>
          </IonRow>
          {products?.length ? (
            <IonRow>
              <IonCol size="12">
                <Table striped hover variant="dark" responsive="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      {keys.map((key, index) => {
                        return <th key={index}>{key.toLocaleUpperCase()}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {products.length
                      ? products.map((product: IInvoice, index: number) => {
                          return (
                            <tr
                              key={product.productID}
                              className="table-row-hover"
                            >
                              <td>{index + 1}</td>
                              <td>{product.name}</td>
                              <td>
                                <IonItem>
                                  <IonInput
                                    key={product.productID}
                                    value={product.quantity}
                                  />
                                </IonItem>
                              </td>
                              <td>
                                <IonItem>
                                  <IonInput value={product.unitPrict} />
                                </IonItem>
                              </td>
                              <td>{product.quantity * product.unitPrict}</td>
                              <td>
                                <IonIcon
                                  className="iconSize"
                                  onClick={() => RemoveItem(product.productID)}
                                  icon={closeSharp}
                                />
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </Table>
              </IonCol>
              <IonCol size="8">

              </IonCol>
              <IonCol size="4">
                <IonList lines="inset">
                  <IonItem>
                    <IonLabel>SubTotal: </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Discount: </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Tax: </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Total: </IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
              <IonCol size="12">
              <IonButton
              color="primary"
            >
              Submit
            </IonButton>
            <IonButton
              color="danger"
            >
              Cancel
            </IonButton>
              </IonCol>
            </IonRow>
          ) : (
            ""
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default InvoiceView;
