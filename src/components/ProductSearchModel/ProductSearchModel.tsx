import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonList,
  IonItem,
} from "@ionic/react";
import "./ProductSearchModel.css";
import * as JsSearch from "js-search";

interface IProductSearchModelProps {
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  products: any;
  pickProduct?: any;
}

const ProductSearchModel: React.FC<IProductSearchModelProps> = ({
  setShowProductModal,
  showProductModal,
  products,
  pickProduct,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<any>();

  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("sku");
  search.addIndex("uid");

  if (products) {
    search.addDocuments(products);
  }

  const searchedProduct = (input: any) => {
    search.search(input);
    setFilteredProducts(search.search(input));
  };

  return (
    <IonModal isOpen={showProductModal}>
      <IonPage>
        <IonContent>
          <>
            <IonSearchbar
              onIonChange={(e) => searchedProduct(e.detail.value!)}
            />
            <IonList>
              {filteredProducts?.length
                ? filteredProducts.map((product: any, index: number) => {
                    if (product.quantity === 0) {
                      return null;
                    } else {
                      return (
                        <IonItem
                          key={index}
                          className="cursor"
                          onClick={() => {
                            const prod = filteredProducts.find(
                              (filter: any) => filter.uid === product.uid
                            );
                            setShowProductModal(!showProductModal);
                            pickProduct(prod);
                          }}
                        >
                          <IonLabel>
                            <h2>Name: {product.name}</h2>
                            <h3>Price: {product.price}</h3>
                            <p>Description: {product.description}</p>
                          </IonLabel>
                        </IonItem>
                      );
                    }
                  })
                : products?.map((product: any, index: number) => {
                    if (product.quantity === 0) {
                      return null;
                    } else {
                      return (
                        <IonItem
                          key={index}
                          className="cursor"
                          onClick={() => {
                            const prod = products.find(
                              (filter: any) => filter.uid === product.uid
                            );
                            setShowProductModal(!showProductModal);
                            pickProduct(prod);
                          }}
                        >
                          <IonLabel>
                            <h2>Name: {product.name}</h2>
                            <h3>Price: {product.price}</h3>
                            <p>Description: {product.description}</p>
                          </IonLabel>
                        </IonItem>
                      );
                    }
                  })}
            </IonList>
          </>
        </IonContent>
        <IonButton onClick={() => setShowProductModal(!showProductModal)}>
          Cancel
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default ProductSearchModel;
