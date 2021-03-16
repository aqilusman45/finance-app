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
  IonToast,
} from "@ionic/react";
import {
  fetchAccounts,
  updateAccountAsync,
} from "./../../store/reducers/accounts";
import Table from "react-bootstrap/esm/Table";
import {
  create,
  closeCircle,
  addCircleOutline,
  calculator,
} from "ionicons/icons";
import ProductSearchModal from "../ProductSearchModel/ProductSearchModel";
import UserSearchModal from "../UserSearchModel/UserSearchModel";
import { RootState } from "../../store/rootReducer";
import { fetchProducts } from "../../store/reducers/products";
import { IProduct } from "../../lib/products";
import { updateProductAsync } from "../../store/reducers/products";
import { ValidationError } from "yup";
import { fetchInvoices } from "../../store/reducers/invoices";
import { PaymentOptions, EntryTypes } from "../../lib/enum";
import { addInvoice } from "../../store/reducers/invoices";
import { v4 as uuidv4 } from "uuid";
import { addEntry } from "../../store/reducers/entries";
import { useHistory } from "react-router";
import "./AddInvoice.css";
const INITIAL_STATE = {
  shippingAddress: "",
  phone: "",
  remarks: "",
  paymentOption: {
    value: "",
    label: "",
  },
  detail: {
    name: "",
    companyName: "",
    shippingAddress: "",
    phone: "",
    address: "",
    email: "",
  },
  companyName: "",
  products: [] as any,
  totalDiscount: 0,
  subTotal: 0,
  taxRate: 0,
  shipping: 0,
  currentBalance: "",
  total: 0,
  accountRef: "",
  payment: 0,
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
  {
    value: PaymentOptions.WALLET,
    label: "Wallet",
  },
];

const AddInvoice: React.FC = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [userAccount, setUserAccount] = useState<any>({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const { accounts, productList, isLoading, invoices } = useSelector(
    (state: RootState) => {
      return {
        accounts: state.accounts.accounts,
        productList: state.products.products,
        invoices: state.invoices.invoices,
        isLoading:
          state.products.isLoading ||
          state.accounts.isLoading ||
          state.invoices.isLoading,
      };
    }
  );
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchInvoices());
    }
  }, [invoices, dispatch]);

  useEffect(() => {
    if (!productList) {
      dispatch(fetchProducts());
    }
  }, [productList, dispatch]);

  const handleChange = (e: any) => {
    const key = e.target.name;
    let val = e.target.value;
    if (key === "totalDiscount" && parseInt(val || 0) > 100) {
      val = 100;
    }
    setState((prevState) => {
      let update = {
        [key]: val,
      } as any;

      let totalDiscount = prevState.totalDiscount;
      let taxRate = prevState.taxRate;

      if (key === "totalDiscount") {
        totalDiscount = val;
      }

      if (key === "taxRate") {
        taxRate = val;
      }

      let total = getTotal(getSubTotal(products), totalDiscount, taxRate);
      const actual = getSubTotal(products);
      if (key === "total") {
        total = val;
        update = {
          ...update,
          totalDiscount: Math.floor(100 - (total * 100) / actual),
        };
      }

      return {
        ...prevState,
        ...update,
        total,
      };
    });
    setState((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleAccountDetails = (e: any) => {
    const key = e.target.name;
    const val = e.target.value;
    setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        [key]: val,
      },
    }));
  };

  const pickAccount = (data: any) => {
    setUserAccount(data);
    setState((prevState) => ({
      ...prevState,
      detail: {
        ...data,
        shippingAddress: data.address,
      },
      accountRef: data.uid,
      currentBalance: data.balance,
    }));
  };

  const removeAccount = () => {
    setState((prevState) => ({
      ...prevState,
      detail: { ...INITIAL_STATE.detail },
      accountRef: "",
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
          total: 0,
        });
      }
      return { ...prevState, products };
    });
  };

  const handleProductChange = (e: any, idx: number) => {
    const key = e.target.name;
    let val = parseInt(e.target.value || 0);
    if (key === "discount" && val >= 100) {
      val = 100;
    }
    setState((prevState) => {
      let price = products[idx].price;
      let quantity = products[idx].quantity;
      let discount = products[idx].discount;
      if (key === "price") {
        price = val;
      }

      if (key === "quantity") {
        quantity = val;
      }

      if (key === "discount") {
        discount = val;
      }

      let total = calculateTotal(price, quantity, discount);

      let update = {
        [key]: val,
      } as any;

      if (key === "total") {
        discount = calculateDiscount(price, quantity, val);
        total = val;
        update = {
          ...update,
          discount,
        };
      }

      update = {
        ...update,
        total,
      };

      prevState.products[idx] = {
        ...prevState.products[idx],
        ...update,
      };

      return {
        ...prevState,
      };
    });
  };

  const calculateDiscount = (
    price: number,
    quantity: number,
    total: number
  ) => {
    const actual = price * quantity;
    return Math.floor(100 - (total * 100) / actual);
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

  const calculateTotal = (
    price: number,
    quantity: number,
    discount: number
  ) => {
    const total = price * quantity;
    const dis = (total * discount) / 100;
    return total - dis;
  };

  const getSubTotal = (products: any) => {
    return products.reduce((total: number, prod: any) => {
      return total + calculateTotal(prod.price, prod.quantity, prod.discount);
    }, 0);
  };

  const getTotal = (subTotal: number, totalDiscount: number, tax: number) => {
    const dis = (subTotal * totalDiscount) / 100;
    const tx = (dis * tax) / 100;
    return subTotal - dis + tx;
  };

  const updateProductInventory = (product: any) => {
    product.map((product: any) => {
      const updateProduct = {
        ...product.product,
        quantity: product.product?.quantity - product.quantity,
      };
      dispatch(updateProductAsync(updateProduct as any));
      return null;
    });
  };

  const checkQuantity = (products: any) => {
    if (!products.length) {
      throw new Error(`Please add atleast 1 product!`);
    }
    products.map((item: any) => {
      if (item.quantity > item.product.quantity) {
        throw new Error(
          `Quantity for ${item.product.name} exceeds current stock!`
        );
      }
      if (item.quantity === 0) {
        throw new Error(`Quantity for ${item.product.name} atleast be 1!`);
      }
      return null;
    });
  };

  const checkAccountRef = (accRef: any, payOption: any) => {
    if (!payOption.value) {
      throw new Error(`Please select payment option!`);
    }
    if (
      (payOption.value === "PARTIAL" || payOption.value === "CREDIT") &&
      !accRef
    ) {
      throw new Error(`Please select or create a new account!`);
    }
  };

  const submit = () => {
    try {
      const {
        payment,
        products,
        accountRef,
        paymentOption,
        detail: { name, address, companyName, email, phone, shippingAddress },
        currentBalance,
      } = state;
      const account = {
        ...userAccount,
        balance:
          userAccount.balance -
          getTotal(getSubTotal(products), totalDiscount, taxRate),
        updatedAt: Date.now(),
      };
      delete state.payment;
      delete state.companyName;
      delete state.phone;
      delete state.shippingAddress;

      const invoice = {
        ...state,
        uid: uuidv4(),
        detail: { name, email, address, companyName, phone, shippingAddress },
        products: state.products.map((node: any) => {
          return { ...node, product: node.product.uid };
        }),
        currentBalance: Number(currentBalance),
        accountRef,
        subTotal: getSubTotal(products),
        total: getTotal(getSubTotal(products), totalDiscount, taxRate),
        invoiceNumber: (
          (invoices && invoices?.length + 1000) ||
          1001
        ).toString(),
        date: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const entry = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        uid: uuidv4(),
        date: Date.now(),
        accountRef,
        invoiceRef: invoice.uid,
        amount: payment,
        paymentOption,
        entryType: {
          value: EntryTypes.CREDIT,
          label: EntryTypes.CREDIT,
        },
      };
      checkQuantity(products);
      checkAccountRef(accountRef, paymentOption);
      updateProductInventory(products);
      if (
        paymentOption.value === "PARTIAL" ||
        paymentOption.value === "CREDIT"
      ) {
        dispatch(addEntry(entry as any));
      }
      if (paymentOption.value === "WALLET") {
        dispatch(updateAccountAsync(account as any));
      }
      dispatch(
        addInvoice(invoice as any, () => {
          push("/home/manage-invoices");
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };

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

  if (isLoading) {
    return <IonLoading isOpen={isLoading} message={"Please wait..."} />;
  }

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
                {PAYMENT_OPTIONS.map((node) => {
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

export default AddInvoice;
