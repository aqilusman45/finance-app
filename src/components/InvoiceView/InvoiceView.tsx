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
  IonToast,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { closeSharp, create } from "ionicons/icons";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import Table from "react-bootstrap/Table";
import "./InvoicView.css";
import { RootState } from "../../store/rootReducer";
import { IonLoading } from "@ionic/react";
import { fetchProducts } from "../../store/reducers/products";
import { fetchAccounts } from "../../store/reducers/accounts";
import ProductSearchModel from "../ProductSearchModel/ProductSearchModel";
const keys = ["Description", "Quantity", "Unit Price", "Discount %", "Total"];

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
  setUserData?: any;
  setCreateInvoice?: any;
  updateUserDetail?: any;
  updateProductDetail?: any;
  getProductId?: any;
  submit?: any;
  errors?: any;
  setErrors?: any;
  taxInput?: any
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
  setUserData,
  updateUserDetail,
  updateProductDetail,
  getProductId,
  submit,
  errors,
  setErrors,
  taxInput,
  
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
        <IonToast
          isOpen={!!errors}
          message={errors && errors.message}
          position="bottom"
          color="danger"
          duration={2000}
          onDidDismiss={() => {
            setErrors(undefined);
          }}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />
        <IonLoading isOpen={isLoading} message={"Please wait..."} />
        <UserSearchModel
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
          userData={userData}
          setUserData={setUserData}
          updateUserDetail={updateUserDetail}
        />
        <ProductSearchModel
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
          products={products}
          updateProductDetail={updateProductDetail}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                showCancelButton="focus"
                debounce={1000}
                value={createInvoice ? createInvoice.detail.name : ""}
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
                                    onClick={() => {
                                      setShowProductModal(!showProductModal);
                                      getProductId(product.product);
                                    }}
                                    defaultValue={product.name}
                                  />
                                </td>
                                <td className="position-relative">
                                  <input
                                    className="inputStyle txtCenter position-relative"
                                    name="quantity"
                                    type="number"
                                    onChange={(e: any) => {
                                      UpdateQuantity(
                                        e.target.value,
                                        product.product
                                      );
                                    }}
                                    key={product.product}
                                    value={product.quantity}
                                  />
                                  <IonIcon
                                    className=" position-absolute createIcon"
                                    slot="start"
                                    icon={create}
                                  />
                                </td>
                                <td>{product.unitPrice}</td>

                                <td className="position-relative">
                                  <input
                                    className="inputStyle txtCenter "
                                    name="discount"
                                    value={product.discount}
                                    type="number"
                                    onChange={(e: any) => {
                                      getDiscountValue(
                                        e.target.value,
                                        product.product
                                      );
                                    }}
                                  />
                                  <IonIcon
                                    className=" position-absolute createIcon"
                                    slot="start"
                                    icon={create}
                                  />
                                </td>
                                <td>{Math.round(totalPrice - discount)}</td>
                                {createInvoice.products.length === 1 ? (
                                  <td></td>
                                ) : (
                                  <td>
                                    <IonIcon
                                      onClick={() =>
                                        RemoveItem(product.product)
                                      }
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
                      <td></td>
                      <td>Add New</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>SubTotal</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> {calculateSubTotal()}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Discount </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{calculateTotalDiscount()} </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Tax %</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="position-relative">
                        <input
                          placeholder="Enter Tax"
                          className="inputStyle txtCenter cursor"
                          name="tax"
                          type="number"
                          onChange={(e: any) => {
                            handleTaxInput(e.target.value);
                          }}
                          value={taxInput}
                        />
                        <IonIcon
                          className=" position-absolute createIcon"
                          slot="start"
                          icon={create}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{calculateTotal()} </td>
                    </tr>
                  </tbody>
                </Table>
              </IonCol>

              <IonCol size="12">
                <IonButton onClick={() => submit()} color="primary">
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
