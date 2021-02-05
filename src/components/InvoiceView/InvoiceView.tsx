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
import { addProduct, fetchProducts } from "../../store/reducers/products";
import { fetchAccounts } from "../../store/reducers/accounts";
import ProductSearchModel from "../ProductSearchModel/ProductSearchModel";
const keys = ["Description", "Quantity", "Unit Price", "Discount", "Total"];
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
  setSelectedProducts?: any;
  updateUserDetail?: () => void;
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
  updateUserDetail,
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
          {/* {selectedProducts.products?.length ? 'hello' : 'world'} */}
          {selectedProducts.products?.length ? (
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
                    {selectedProducts.products?.length
                      ? selectedProducts.products.map(
                          (product: any, index: number) => {
                            return (
                              <tr key={index} className="table-row-hover">
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
                                        product.id
                                      );
                                    }}
                                    key={product.id}
                                    value={product.quantity}
                                  />
                                </td>
                                <td>{product.unitPrict}</td>

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
                                <td>{product.quantity * product.unitPrice}</td>
                                {selectedProducts.products.length === 1 ? (
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
                    <tr>
                      {/* {selectedProducts.products.length && (
                          <button
                            onClick={() => AddProduct()}
                            className="btnStyle"
                          >
                            Add New
                          </button>
                        )} */}
                      <td></td>
                      <td></td>
                      <td
                        className="txtLeft cursor"
                        onClick={() => AddProduct()}
                      >
                        Add New
                      </td>
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
                      <td> 1000</td>
                    </tr>
                    <tr>
                      <td>Discount </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>10% </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> 1000 </td>
                    </tr>
                    <tr>
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
