import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonItem,
  IonInput,
  IonPage,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { closeSharp } from "ionicons/icons";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import Table from "react-bootstrap/Table";
import "./InvoicView.css";
import { RootState } from "../../store/rootReducer";
import { IonLoading } from "@ionic/react";
import { fetchProducts } from "../../store/reducers/products";
import { fetchAccounts } from "../../store/reducers/accounts";
import ProductSearchModel from "../ProductSearchModel/ProductSearchModel";
const keys = ["Description", "Quantity", "Unit Price", "Total", "Discount"];
const invoideDetail = ["Sub Total", "Discount", "Tax", "Total"];

interface InvoiceViewProps {
  RemoveItem?: any;
  AddProduct?: any;
  selectedProducts?: any;
  UpdateQuantity?: any;
  calculateSubTotal?: any;
  handleTaxInput?: any;
  isEdit?: boolean;
  getDiscountValue?: any;
  calculateDiscount?: any;
  calculateTax?: any;
  calculateTotal?: any;
  userData?: any;
  setCurrentUser?: any;
  searchText?: any;
  setSearchText?: any;
  setUserData?: any;
  currentUser?: any;
  setSelectedProducts?: any
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  RemoveItem,
  AddProduct,
  selectedProducts,
  isEdit,
  UpdateQuantity,
  calculateSubTotal,
  handleTaxInput,
  getDiscountValue,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  userData,
  setCurrentUser,
  searchText,
  setSearchText,
  setUserData,
  currentUser,
  setSelectedProducts,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
  const { products } = useSelector((state: RootState) => {
    return state.products;
  });

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }

    if (!products) {
      dispatch(fetchProducts());
    }
  }, [accounts, products, dispatch]);
  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={isLoading} message={"Please wait..."} />
        <UserSearchModel
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
          userData={userData}
          setUserData={setUserData}
          setCurrentUser={setCurrentUser}
        />
        <ProductSearchModel
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
          products={products}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                showCancelButton="focus"
                debounce={1000}
                value={currentUser.name}
                placeholder="Select User"
                onClick={() => setShowModal(!showModal)}
              />
            </IonCol>
          </IonRow>
          {products?.length ? (
            <IonRow>
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
                    {selectedProducts?.length
                      ? selectedProducts.map((product: any, index: number) => {
                          return (
                            <tr
                              key={index}
                              className="table-row-hover"
                            >
                              <td>{index + 1}</td>
                              <td>
                                <input
                                  placeholder="select Product"
                                  className="inputStyle txtCenter cursor"
                                  name="productName"
                                  onClick={() =>
                                    setShowProductModal(!showProductModal)
                                  }
                                />
                              </td>
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
                              {selectedProducts.length === 1 ? (
                                <td></td>
                              ) : (
                                <td>
                                  <IonIcon
                                    onClick={() =>
                                      RemoveItem(product.productID)
                                    }
                                    icon={closeSharp}
                                  />
                                </td>
                              )}
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </Table>
                {selectedProducts.length && (
                  <IonButton
                    onClick={() => AddProduct()}
                    className="btnPosition"
                  >
                    +
                  </IonButton>
                )}
              </IonCol>

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
                      {invoideDetail.map((key, index) => {
                        return <th key={index}>{key.toLocaleUpperCase()}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SubTotal: {calculateSubTotal()}</td>
                      <td>Discount: {calculateDiscount()} </td>
                      <td>
                        {" "}
                        <input
                          placeholder="Enter Tax"
                          className="inputStyle txtCenter cursor"
                          name="tax"
                          
                          onChange={(e: any) => {
                            handleTaxInput(e.target.value);
                          }}
                        />
                        {/* <span className="spanTaxStyle">{calculateTax()}</span> */}
                      </td>
                      <td>Total: {calculateTotal()}</td>
                    </tr>
                  </tbody>
                </Table>
              </IonCol>
              {/* <IonCol size="8"></IonCol>
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
              </IonCol> */}
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
