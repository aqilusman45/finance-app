import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

import { closeSharp } from "ionicons/icons";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import Table from "react-bootstrap/Table";
import "./InvoicView.css";
import { RootState } from "../../store/rootReducer";
import { IonLoading } from "@ionic/react";
import { fetchAccounts } from "../../store/reducers/accounts";

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
  setCurrentUser?: any;
  searchText?: any;
  setSearchText?: any;
  setUserData?: any;
  currentUser?: any;
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
  setCurrentUser,
  searchText,
  setSearchText,
  setUserData,
  currentUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);
  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={isLoading} message={"Please wait..."} />
        <UserSearchModel
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                value={searchText}
                placeholder="Search User"
                showCancelButton="focus"
                debounce={1000}
                onClick={() => setShowModal(!showModal)}
                onIonChange={(e) => {
                  searchUser(e.detail.value!);
                  setSearchText(e.detail.value!);
                }}
              />
              {currentUser.name}
              {userData?.length ? (
                <div className="filteredUser">
                  <IonList>
                    {userData?.map((item: any) => {
                      return (
                        <IonItem key={item.uid}>
                          <IonLabel
                            onClick={() => {
                              setUserData("");
                              setSearchText();
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
                </div>
              ) : (
                ""
              )}
            </IonCol>
          </IonRow>
          {products?.length ? (
            <IonRow className="productsTable">
              <IonCol size="12">
                <Table
                  striped
                  hover
                  variant="dark"
                  responsive="sm"
                  className="txtCenter"
                >
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
                              <td className="">
                                <input
                                  className="inputStyle txtCenter"
                                  name="quantity"
                                  onChange={(e: any) => {
                                    UpdateQuantity(
                                      e.target.value,
                                      product.productID
                                    );
                                  }}
                                  key={product.productID}
                                  value={product.quantity}
                                />
                              </td>
                              <td>{product.unitPrict}</td>
                              <td>{product.quantity * product.unitPrict}</td>
                              <td className="">
                                <input
                                  className="inputStyle txtCenter"
                                  name="discount"
                                  value={product.discount}
                                  onChange={(e: any) => {
                                    getDiscountValue(
                                      e.target.value,
                                      product.productID
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                <IonIcon
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
