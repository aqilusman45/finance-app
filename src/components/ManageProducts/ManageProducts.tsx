import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { getProducts } from "../../utils/api";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

const ManageProduct: React.FC = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const products = await Storage.get({
        key: "products",
      });

      if (products.value) {
        setProducts(JSON.parse(products.value));
      } else {
        const data = await getProducts();
        setProducts(data);
        Storage.set({
          key: "products",
          value: JSON.stringify(data),
        });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <IonContent>
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar showCancelButton="focus" debounce={1000} />
            </IonCol>
          </IonRow>
          {products.length ? (
            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        {Object.keys(products[0]).map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>
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
