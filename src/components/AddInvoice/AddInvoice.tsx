import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  IonLoading,
} from "@ionic/react";
import { fetchAccounts } from "./../../store/reducers/accounts";
import Table from "react-bootstrap/esm/Table";
import { create, closeCircle, addCircleOutline } from "ionicons/icons";
import ProductSearchModal from "../ProductSearchModel/ProductSearchModel";
import UserSearchModal from "../UserSearchModel/UserSearchModel";
import { RootState } from "../../store/rootReducer";
import { fetchProducts } from "../../store/reducers/products";
import { IProduct } from "../../lib/products";
import "./AddInvoice.css";
import { PaymentOptions } from "../../lib/enum";

const INITIAL_STATE = {
  name: "",
  invoiceNumber: "",
  shippingAddress: "",
  phone: "",
  remarks: "",
  paymentOption: {
    value: "",
    label: "",
  },
  companyName: "",
  products: [] as any,
};

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
];

const AddInvoice: React.FC = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [userData, setUserData] = useState<any>();

  const { accounts, productList, isLoading } = useSelector(
    (state: RootState) => {
      return {
        accounts: state.accounts.accounts,
        productList: state.products.products,
        isLoading: state.products.isLoading || state.accounts.isLoading,
      };
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

  useEffect(() => {
    if (!productList) {
      dispatch(fetchProducts());
    }
  }, [productList, dispatch]);

  const handleChange = (e: any) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const pickProduct = (data: IProduct) => {
    setState((prevState) => {
      const products = [...prevState.products];
      if (!products.some((node) => node.product.uid === data.uid)) {
        products.push({
          discount: 0,
          product: { ...data },
          quantity: 0,
          price: data.price,
        });
      }
      return { ...prevState, products };
    });
  };

  const handleProductChange = (e: any, idx: number) => {
    const key = e.target.name;
    const val = e.target.value;
    setState((prevState) => {
      prevState.products[idx] = {
        ...prevState.products[idx],
        [key]: parseInt(val),
      };
      return {
        ...prevState,
      };
    });
  };

  const handleRemove = (idx: number) => {
    setState((prevState) => {
      const updatedProducts = prevState.products;
      updatedProducts.splice(idx, 1);
      return {
        ...prevState,
        products: updatedProducts,
      };
    });
  };

  const calculateDiscount = (
    price: number,
    quantity: number,
    discount: number
  ) => {
    const total = price * quantity;
    return (total * discount) / 100;
  };

  const {
    name,
    companyName,
    invoiceNumber,
    phone,
    remarks,
    shippingAddress,
    paymentOption,
    products,
  } = state;

  if (isLoading) {
    return <IonLoading isOpen={isLoading} message={"Please wait..."} />;
  }

  return (
    <IonContent>
      <UserSearchModal
        accounts={accounts}
        showModal={showAccountModal}
        setShowModal={setShowAccountModal}
        userData={userData}
        setUserData={setUserData}
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
                onIonChange={handleChange}
                name="name"
                value={name}
                placeholder="Name"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleChange}
                name="invoiceNumber"
                value={invoiceNumber}
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
                {PAYMENT_OPTIONS.map((node) => {
                  return (
                    <IonSelectOption key={node.value} value={node}>{node.label}</IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleChange}
                name="shippingAddress"
                value={shippingAddress}
                placeholder="Shipping Address"
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleChange}
                name="phone"
                value={phone}
                placeholder="Phone"
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
            <IonItem className="ion-margin">
              <IonInput
                onIonChange={handleChange}
                name="companyName"
                value={companyName}
                placeholder="Company Name"
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
                      { discount, product: { name, uid }, quantity, price }: any,
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
                            Rs. {calculateDiscount(price, quantity, discount)}
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
          <IonCol offset="9" size="3">
            <Table
              striped
              hover
              variant="dark"
              responsive="sm"
              className="txtCenter"
            >
              <tbody>
                <tr>
                  <td>SubTotal</td>
                  <td>Rs. 0</td>
                </tr>
                <tr>
                  <th>Discount (%)</th>
                  <td>
                    <input className="inputStyle txtCenter" type="number" />
                    <IonIcon slot="start" icon={create} />
                  </td>
                </tr>
                <tr>
                  <td>Tax (%)</td>
                  <td>
                    <input className="inputStyle txtCenter" type="number" />
                    <IonIcon slot="start" icon={create} />
                  </td>
                </tr>
                {(paymentOption.value === PaymentOptions.CASH ||
                  paymentOption.value === PaymentOptions.PARTIAL) && (
                  <tr>
                    <td>Cash</td>
                    <td>
                      <input className="inputStyle txtCenter" type="number" />
                      <IonIcon slot="start" icon={create} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddInvoice;
