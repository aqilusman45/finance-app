import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
} from "@ionic/react";
import "./ProductSearchModel.css";
import * as JsSearch from "js-search";
interface IProductSearchModelProps {
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  products: any;
  setCreateInvoice: any;
  createInvoice: any;
  updateProductDetail: any;
  setSelectedProducts: any
}

const ProductSearchModel: React.FC<IProductSearchModelProps> = ({
  setShowProductModal,
  showProductModal,
  products,
  setCreateInvoice,
  createInvoice,
  updateProductDetail,
  setSelectedProducts,
}) => {
  const [segment, setSegment] = useState<string>("search");
  const [filteredProducts, setFilteredProducts] = useState<any>();

  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("sku");
  search.addIndex("uid");

  search.addDocuments(products!);
  const searchedProduct = (input: any) => {
    search.search(input);
    setFilteredProducts(search.search(input));
  };

  // js-search code end here
  return (
    <IonModal isOpen={showProductModal}>
      <IonPage>
        <IonContent>
          <IonSegment
            color="tertiary"
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value!)}
          >
            <IonSegmentButton value="search">
              <IonLabel>Search</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="addNew">
              <IonLabel>Add New</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {segment === "search" ? (
            <>
              <IonSearchbar
                onIonChange={(e) => searchedProduct(e.detail.value!)}
              />
              <IonList>
                {filteredProducts?.length
                  ? filteredProducts.map((product: any, index: number) => {
                    
                      return (
                        <IonItem
                          key={index}
                          className="cursor"
                          onClick={() => {
                            setSelectedProducts(
                              filteredProducts.find(
                                (filter: any) => filter.uid === product.uid
                              ),
                            );
                            updateProductDetail()
                            setShowProductModal(!showProductModal)

                          }}
                        >
                          <IonLabel>
                            <h2>Name: {product.name}</h2>
                            <h3>Price: {product.price}</h3>
                            <p>Description: {product.description}</p>
                          </IonLabel>
                        </IonItem>
                      );
                    })
                  : ""}
              </IonList>
            </>
          ) : (
            "hello"
          )}
        </IonContent>
        <IonButton onClick={() => setShowProductModal(!showProductModal)}>
          Cancel
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default ProductSearchModel;
