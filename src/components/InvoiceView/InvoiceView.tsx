import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonIcon,
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
import { addProduct, fetchProducts } from "../../store/reducers/products";
import { fetchAccounts } from "../../store/reducers/accounts";
import ProductSearchModel from "../ProductSearchModel/ProductSearchModel";
const keys = ["Description", "Quantity", "Unit Price", "Discount", "Total"];

interface InvoiceViewProps {
  RemoveItem?: any;
  addNewRaw?: any;
  createInvoice?: any;
  UpdateQuantity?: any;
  calculateSubTotal?: any;
  handleTaxInput?: any;
  isEdit?: boolean;
  getDiscountValue?: any;
  calculateTotalDiscount?: any;
  calculateTotal?: any;
  userData?: any;
  setCurrentUser?: any;
  setUserData?: any;
  currentUser?: any;
  setCreateInvoice?: any;
  updateUserDetail?: () => void;
  updateProductDetail?: any;
  setSelectedProducts?: any;
  getProductId?: any;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  RemoveItem,
  addNewRaw,
  createInvoice,
  isEdit,
  UpdateQuantity,
  calculateSubTotal,
  handleTaxInput,
  getDiscountValue,
  calculateTotalDiscount,
  calculateTotal,
  userData,
  setCurrentUser,
  setUserData,
  currentUser,
  setCreateInvoice,
  updateUserDetail,
  updateProductDetail,
  setSelectedProducts,
  getProductId,
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
          updateUserDetail={updateUserDetail}
        />
        <ProductSearchModel
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
          products={products}
          setCreateInvoice={setCreateInvoice}
          createInvoice={createInvoice}
          updateProductDetail={updateProductDetail}
          setSelectedProducts={setSelectedProducts}
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
          {createInvoice.products?.length ? (
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
                    {createInvoice.products?.length
                      ? createInvoice.products.map(
                          (product: any, index: number) => {
                            const totalPrice =
                              product.quantity * product.unitPrice;
                            const discount =
                              (product.discount * totalPrice) / 100;
                            return (
                              <tr key={index} className="table-row-hover">
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    placeholder="select Product"
                                    className="inputStyle txtCenter cursor"
                                    name="productName"
                                    onClick={() => {
                                      setShowProductModal(!showProductModal);
                                      getProductId(product.id);
                                    }}
                                    defaultValue={product.name}
                                  />
                                </td>
                                <td className="">
                                  <input
                                    className="inputStyle txtCenter"
                                    name="quantity"
                                    onChange={(e: any) => {
                                      UpdateQuantity(
                                        e.target.value,
                                        product.id
                                      );
                                    }}
                                    key={product.id}
                                    value={product.quantity}
                                  />
                                </td>
                                <td>{product.unitPrice}</td>

                                <td className="">
                                  <input
                                    className="inputStyle txtCenter"
                                    name="discount"
                                    value={product.discount}
                                    onChange={(e: any) => {
                                      getDiscountValue(
                                        e.target.value,
                                        product.id
                                      );
                                    }}
                                  />
                                </td>
                                <td>{totalPrice - discount}</td>
                                {createInvoice.products.length === 1 ? (
                                  <td></td>
                                ) : (
                                  <td>
                                    <IonIcon
                                      onClick={() => RemoveItem(product.id)}
                                      icon={closeSharp}
                                    />
                                  </td>
                                )}
                              </tr>
                            );
                          }
                        )
                      : ""}
                    <tr className="cursor" onClick={() => addNewRaw()}>
                      <td></td>
                      <td></td>
                      <td className="txtLeft ">Add New</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>SubTotal</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> {calculateSubTotal()}</td>
                    </tr>
                    <tr>
                      <td>Discount </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{calculateTotalDiscount()} </td>
                    </tr>
                    <tr>
                      <td>Tax</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <input
                          placeholder="Enter Tax"
                          className="inputStyle txtCenter cursor"
                          name="tax"
                          onChange={(e: any) => {
                            handleTaxInput(e.target.value);
                          }}
                        />
                      </td>

                    </tr>
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{calculateTotal()} </td>
                    </tr>
                  </tbody>
                </Table>
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
