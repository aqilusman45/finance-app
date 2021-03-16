import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonItem,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonButton,
  IonToast,
} from "@ionic/react";
import Table from "react-bootstrap/esm/Table";
import { ValidationError } from "yup";
import {
  create,
  closeCircle,
  addCircleOutline,
  calculator,
} from "ionicons/icons";
import ProductSearchModal from "../ProductSearchModel/ProductSearchModel";
import UserSearchModal from "../UserSearchModel/UserSearchModel";
import { PaymentOptions } from "../../lib/enum";
import "./AddInvoice.css";

interface AddInvoiceViewProps {
  errors: ValidationError | undefined;
  setErrors: (value: ValidationError | undefined) => void;
  accounts: any;
  showAccountModal: boolean;
  setShowAccountModal: (input: boolean) => void;
  pickAccount: (data: any) => void;
  showProductModal: boolean;
  setShowProductModal: (input: boolean) => void;
  productList: any;
  pickProduct: (data: any) => any;
  handleAccountDetails: (input: any) => void;
  state: any;
  invoices: any;
  removeAccount: () => void;
  handleChange: (input: any) => any;
  handleProductChange: (e: any, idx: number) => any;
  handleRemove: (idx: number) => any;
  submit: () => any;
  getTotal: (subTotal: number, totalDiscount: number, tax: number) => number;
  getSubTotal: (products: any) => number;
}

const PAYMENT_OPTIONS = [
  {
    value: PaymentOptions.CASH,
    label: "Cash",
  },
  {
    value: PaymentOptions.PARTIAL,
    label: "Partial",
  },
  {
    value: PaymentOptions.CREDIT,
    label: "Credit",
  },
  {
    value: PaymentOptions.WALLET,
    label: "Wallet",
  },
];

const AddInvoiceView = ({
  errors,
  setErrors,
  accounts,
  showAccountModal,
  setShowAccountModal,
  pickAccount,
  showProductModal,
  setShowProductModal,
  productList,
  pickProduct,
  handleAccountDetails,
  state,
  removeAccount,
  invoices,
  handleChange,
  handleProductChange,
  handleRemove,
  submit,
  getTotal,
  getSubTotal,
}: AddInvoiceViewProps) => {
  const {
    detail: { name, shippingAddress, phone, companyName, email },
    remarks,
    paymentOption,
    products,
    taxRate,
    totalDiscount,
    payment,
    total,
  } = state;

  return (
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
      <UserSearchModal
        accounts={accounts}
        showModal={showAccountModal}
        setShowModal={setShowAccountModal}
        pickAccount={pickAccount}
      />
      <ProductSearchModal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        products={productList}
        pickProduct={pickProduct}
      />
      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6" className="mb">
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleAccountDetails}
                name="name"
                value={name}
                placeholder="Particulars"
              />
              {!state.accountRef ? (
                <IonButton
                  onClick={() => setShowAccountModal(!showAccountModal)}
                  color="primary"
                >
                  Select Account
                </IonButton>
              ) : (
                <IonButton onClick={() => removeAccount()} color="danger">
                  Remove Account
                </IonButton>
              )}
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleAccountDetails}
                name="email"
                value={email}
                placeholder="Email"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                name="invoiceNumber"
                value={`Invoice Number: ${
                  invoices && invoices?.length ? invoices?.length + 1000 : 1001
                }`}
                disabled={true}
                placeholder="Invoice Number"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonSelect
                onIonChange={handleChange}
                name="paymentOption"
                value={paymentOption}
                placeholder="Payment Option"
              >
                {PAYMENT_OPTIONS.map((node: any) => {
                  return (
                    <IonSelectOption key={node.value} value={node}>
                      {node.label}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleAccountDetails}
                name="shippingAddress"
                value={shippingAddress}
                placeholder="Shipping Address"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleAccountDetails}
                name="phone"
                value={phone}
                placeholder="Phone"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleAccountDetails}
                name="companyName"
                value={companyName}
                placeholder="Company Name"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleChange}
                name="remarks"
                value={remarks}
                placeholder="Remarks"
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
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
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {products.map(
                    (
                      {
                        discount,
                        product: { name, uid },
                        quantity,
                        price,
                        total,
                      }: any,
                      idx: number
                    ) => {
                      return (
                        <tr key={uid}>
                          <td>{idx + 1}</td>
                          <td>{name}</td>
                          <td>Rs. {price} </td>
                          <td>
                            <input
                              value={quantity}
                              name="quantity"
                              onChange={(e) => handleProductChange(e, idx)}
                              className="inputStyle txtCenter"
                              type="number"
                            />
                            <IonIcon slot="start" icon={create} />
                          </td>
                          <td>
                            <input
                              value={discount}
                              name="discount"
                              onChange={(e) => handleProductChange(e, idx)}
                              className="inputStyle txtCenter"
                              type="number"
                            />
                            <IonIcon slot="start" icon={create} />
                          </td>
                          <td
                            style={{
                              width: "23%",
                            }}
                          >
                            <input
                              value={total}
                              name="total"
                              onChange={(e) => handleProductChange(e, idx)}
                              className="inputStyle txtCenter"
                              type="number"
                            />
                            <IonIcon slot="start" icon={create} />
                          </td>
                          <td>
                            <IonIcon
                              onClick={() => handleRemove(idx)}
                              style={{
                                marginTop: "2px",
                                fontSize: "20px",
                              }}
                              icon={closeCircle}
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "10px",
                }}
              >
                <IonButton
                  onClick={() => setShowProductModal(!showProductModal)}
                  color="primary"
                >
                  <IonIcon
                    style={{
                      marginTop: "2px",
                      fontSize: "20px",
                    }}
                    icon={addCircleOutline}
                  />
                </IonButton>
              </div>
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol offset="8" size="4">
            <Table
              striped
              hover
              variant="dark"
              responsive="sm"
              className="txtCenter"
            >
              <tbody>
                <tr>
                  <td>SubTotal (Rs.)</td>
                  <td>
                    <input
                      value={products.length && getSubTotal(products)}
                      className="inputStyle txtCenter"
                      type="number"
                      disabled={true}
                    />
                    <IonIcon slot="start" icon={calculator} />
                  </td>
                </tr>
                <tr>
                  <td>Discount %</td>
                  <td>
                    <input
                      value={totalDiscount}
                      name="totalDiscount"
                      onChange={handleChange}
                      className="inputStyle txtCenter"
                      type="number"
                    />
                    <IonIcon slot="start" icon={create} />
                  </td>
                </tr>
                <tr>
                  <td>Tax %</td>
                  <td>
                    <input
                      value={taxRate}
                      name="taxRate"
                      onChange={handleChange}
                      className="inputStyle txtCenter"
                      type="number"
                    />
                    <IonIcon slot="start" icon={create} />
                  </td>
                </tr>
                <tr>
                  <td>Total (Rs.)</td>
                  <td>
                    <input
                      value={
                        total ||
                        getTotal(getSubTotal(products), totalDiscount, taxRate)
                      }
                      name="total"
                      onChange={handleChange}
                      className="inputStyle txtCenter"
                      type="number"
                    />
                    <IonIcon slot="start" icon={create} />
                  </td>
                </tr>
                {paymentOption.value === PaymentOptions.PARTIAL && (
                  <tr>
                    <td>Payment (Rs.)</td>
                    <td>
                      <input
                        value={payment}
                        name="payment"
                        onChange={handleChange}
                        className="inputStyle txtCenter"
                        type="number"
                      />
                      <IonIcon slot="start" icon={create} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <IonButton onClick={submit} color="primary">
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default AddInvoiceView;
