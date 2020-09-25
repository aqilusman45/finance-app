import React, { useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchProducts } from "../../store/reducers/products";

const ManageProduct: React.FC = () => {
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
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar showCancelButton="focus" debounce={1000} />
            </IonCol>
          </IonRow>
          {isLoading ? (
            <p>Loading...</p>
          ) : products && products.length ? (
            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        {Object.keys(products[0]).map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product: any, index: any) => (
                        <tr key={product.name}>
                          <td>{index}</td>
                          {Object.values(product).map((value) => (
                            <td>{`${value}`}</td>
                          ))}
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
