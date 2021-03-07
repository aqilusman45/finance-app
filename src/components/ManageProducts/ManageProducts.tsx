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
import * as JsSearch from "js-search";
import PaginationView from "../Pagination/Pagination";

const keys = ["name", "sku", "price", "description", "enabled"];

const ManageProduct: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<any>();
  const [product, setProduct] = useState<IProduct | undefined>();
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector((state: RootState) => {
    return state.products;
  });
  // pagination code start here

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("uid");
  search.addIndex("name");
  search.addIndex("sku");
  search.addIndex("price");
  search.addIndex("quantity");

  if (products) {
    search.addDocuments(products);
  }

  const searchedProducts = (input: any) => {
    search.search(input);
    setFilteredProducts(search.search(input));
  };

  // js-search code end here

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
              <IonSearchbar
                onIonChange={(e) => searchedProducts(e.detail.value!)}
                showCancelButton="focus"
                debounce={1000}
              />
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
                      {filteredProducts?.length
                        ? filteredProducts.map(
                            (product: IProduct, index: any) => (
                              <tr
                                className="table-row-hover"
                                onClick={() => {
                                  setProduct(() =>
                                    products.find(
                                      (prod) => prod.uid === product.uid
                                    )
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
                            )
                          )
                        : currentItems?.map((product: IProduct, index: any) => (
                            <tr
                              className="table-row-hover"
                              onClick={() => {
                                setProduct(() =>
                                  products.find(
                                    (prod) => prod.uid === product.uid
                                  )
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

          {filteredProducts?.length ? (
            ""
          ) : (
            <PaginationView
              itemsPerPage={itemsPerPage}
              data={products}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageProduct;
