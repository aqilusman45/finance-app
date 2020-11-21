import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonLoading,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchProducts } from "../../store/reducers/products";
import { IProduct } from "../../lib/products";
import ProductModal from "../ViewProduct/ViewProduct";

const keys = ["name", "sku", "price", "description", "enabled"];

const ManageProduct: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>();
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector((state: RootState) => {
    return state.products;
  });

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  return (
    <>
      <IonContent>
        <ProductModal
          setShowModal={setShowModal}
          showModal={showModal}
          product={product}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar showCancelButton="focus" debounce={1000} />
            </IonCol>
          </IonRow>
          <IonLoading isOpen={isLoading} message={"Please wait..."} />
          {!!products?.length ? (
            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        {keys.map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product: IProduct, index: any) => (
                        <tr
                          className="table-row-hover"
                          onClick={() => {
                            setProduct(() =>
                              products.find((prod) => prod.uid === product.uid)
                            );
                            setShowModal(!showModal);
                          }}
                          key={product.uid}
                        >
                          <td>{index + 1}</td>
                          {keys.map((key) => {
                            // @ts-ignore
                            const productKey = product[key];
                            if (keys.includes(key)) {
                              if (typeof productKey !== "object") {
                                return (
                                  <td
                                    key={`${productKey}`}
                                  >{`${productKey}`}</td>
                                );
                              }
                            }
                            return null;
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <p>No products found</p>
          )}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageProduct;
