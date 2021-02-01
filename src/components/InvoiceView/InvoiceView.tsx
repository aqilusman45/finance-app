import React from "react";
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
  IonButton,
} from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import Table from "react-bootstrap/Table";
import { IInvoice } from "./../../lib/invoice";
import "./InvoicView.css";
const keys = ["Description", "Quantity", "Unit Price", "Total", "Discount"];

interface InvoiceViewProps {
  RemoveItem?: any;
  AddProduct?: any;
  products?: any;
  UpdateQuantity?: any;
  calculateSubTotal?: any;
  handleTaxInput?: any;
  isEdit?: boolean;
  getDiscountValue?: any;
  calculateDiscount?: any;
  calculateTax?: any;
  calculateTotal?: any;
  searchUser?: any;
  userData?: any;
  currentUser?: any;
  setCurrentUser?: any;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  RemoveItem,
  AddProduct,
  products,
  isEdit,
  UpdateQuantity,
  calculateSubTotal,
  handleTaxInput,
  getDiscountValue,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  searchUser,
  userData,
  currentUser,
  setCurrentUser,
}) => {
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
                onIonChange={(e) => searchUser(e.detail.value!)}
              />
              {userData?.length ? (
                <IonList>
                  {userData?.map((item: any) => {
                    return (
                      <IonItem key={item.uid}>
                        <IonLabel
                          onClick={() => {
                            setCurrentUser(() =>
                              userData?.find(
                                (filter: any) => filter.uid === item.uid
                              )
                            );
                          }}
                        >
                          {item.name}
                        </IonLabel>
                      </IonItem>
                    );
                  })}
                </IonList>
              ) : (
                ""
              )}
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
                      ? products.map((product: any, index: number) => {
                          return (
                            <tr
                              key={product.productID}
                              className="table-row-hover"
                            >
                              <td>{index + 1}</td>
                              <td>{product.productName}</td>
                              <td className="inputStyle">
                                <IonItem>
                                  <IonInput
                                    name="quantity"
                                    class="ion-text-center"
                                    onIonChange={(e: any) => {
                                      UpdateQuantity(
                                        e.detail.value,
                                        product.productID
                                      );
                                    }}
                                    key={product.productID}
                                    value={product.quantity}
                                  />
                                </IonItem>
                              </td>
                              <td>{product.unitPrict}</td>
                              <td>{product.quantity * product.unitPrict}</td>
                              <td className="inputStyle">
                                <IonItem>
                                  <IonInput
                                    name="discount"
                                    onIonChange={(e: any) => {
                                      getDiscountValue(
                                        e.detail.value,
                                        product.productID
                                      );
                                    }}
                                    class="ion-text-center"
                                  />
                                </IonItem>
                              </td>
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
              <IonCol size="8"></IonCol>
              <IonCol size="4">
                <IonList lines="inset">
                  <IonItem>
                    <IonLabel>SubTotal: {calculateSubTotal()}</IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonLabel>Discount: {calculateDiscount()} </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Tax: </IonLabel>
                    <IonInput
                      class="ion-text-center taxInputStyle"
                      name="tax"
                      onIonChange={(e: any) => {
                        handleTaxInput(e.detail.value);
                      }}
                    />
                    <span className="spanTaxStyle">{calculateTax()} %</span>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Total: {calculateTotal()}</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
              <IonCol size="12">
                <IonButton color="primary">
                  {isEdit ? "Update" : "Submit"}
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
