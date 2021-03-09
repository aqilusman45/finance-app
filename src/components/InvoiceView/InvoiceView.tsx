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
  IonLabel,
  IonItem,
  IonSelect,
  IonInput,
  IonSelectOption,
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
import { IOption } from "../../lib/attributes";
import { PaymentOptions } from "../../lib/enum";
const keys = ["Description", "Quantity", "Unit Price", "Discount %", "Total"];

const options: IOption[] = [
  {
    value: PaymentOptions.BANK,
    label: "Bank",
  },
  {
    value: PaymentOptions.CASH,
    label: "Cash",
  },
  {
    value: PaymentOptions.CHEQUE,
    label: "Cheque",
  },
];

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
  handleChange?: any;
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
  handleChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const dispatch = useDispatch();
  const { paymentOption, invoiceNumber,taxRate } = createInvoice;
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
                placeholder="Select Account"
                onClick={() => setShowModal(!showModal)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">Invoice Number</IonLabel>
                <IonInput
                  onIonChange={handleChange}
                  name="invoiceNumber"
                  type="number"
                  value={invoiceNumber}
                />
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonSelect
                  onIonChange={(e) => {
                    const option = options.find(
                      ({ value }) => value === e.detail.value
                    );
                    handleChange({
                      currentTarget: {
                        name: "paymentOption",
                        value: option,
                      },
                    });
                  }}
                  value={paymentOption.value}
                  name="paymentOption"
                  multiple={false}
                  placeholder="Pay Option"
                >
                  {options.map(({ value, label }) => (
                    <IonSelectOption key={value} value={value}>
                      {label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
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
                                    placeholder="Select Product"
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
                          value={taxRate}
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
