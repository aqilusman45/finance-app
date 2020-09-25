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
import { productDataValues} from "./../../Feature/ManageProductSlice/ManageProductSlice";

const ManageProduct: React.FC = () => {
  // code by huzaifa start
  const data = useSelector(productDataValues)
  const dispatchFunc = useDispatch()
  // code by huzaifa end

  const dispatch = useDispatch();

  // const { isLoading, products } = useSelector((state: RootState) => {
  //   return state.products;
  // });

  // useEffect(() => {
  //   if (!products) {
  //     dispatch(fetchProducts());
  //   }
  // }, [products, dispatch]);

  return (
    <>
      <IonContent>
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar showCancelButton="focus" debounce={1000} />
            </IonCol>
          </IonRow>

            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>

                      {/* <th>#</th> */}
                      {/* {Object.keys(products[0]).map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>;
                        })} */}
                        <tr>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Sku</th>
                          <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {products.map((product: any, index: any) => (
                        <tr key={product.name}>
                          <td>{index}</td>
                          {Object.values(product).map((value) => (
                            <td>{`${value}`}</td>
                          ))}
                        </tr>
                      ))} */}
                      { data.value.map((item:any, index:number) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.sku}</td>
                            <td>{item.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>

        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageProduct;
