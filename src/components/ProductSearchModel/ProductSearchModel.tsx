import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { v4 as uuidv4 } from "uuid";
import { fetchAttributes } from "../../store/reducers/attributes";
import { insertProduct } from "../../store/reducers/products";
import { encodeImageFileAsURL } from "../../utils/toBase64";
import { IImages } from "../../lib/products";
import { IOption } from "../../lib/attributes";
import { useHistory } from "react-router";
import { productAttributesCheck, productSchema } from "../../helpers/validations";
import { ValidationError } from "yup";

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
import AddProductForm from "../AddProductView/AddProductView";
import * as JsSearch from "js-search";
const INITIAL_STATE = {
  name: "",
  quantity: `0`,
  sku: "",
  price: `0`,
  cost: `0`,
  images: [],
  description: "",
};
interface IProductSearchModelProps {
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  products: any;
  setCreateInvoice: any;
  createInvoice: any;
  updateProductDetail: any;
  setSelectedProducts: any;
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
  const fileIput = useRef<any>(null);

  const [index, setIndex] = useState(0);
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [images, setImages] = useState<IImages[]>([]);
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [selectedAttrs, setAttributes] = useState<any>({});

  const { push } = useHistory();
  const dispatch = useDispatch();
  const { attributes, isLoading } = useSelector(
    (state: RootState) => state.attributes
  );
  const { name, price, quantity, sku, description, cost } = formFields;

  useEffect(() => {
    if (!attributes) {
      dispatch(fetchAttributes());
    }
  }, [attributes, dispatch]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const onFileSelect = (e: any) => {
    encodeImageFileAsURL(e.target, (image) => {
      setImages((prevState) => prevState.concat({ ...image }));
    });
  };

  const handleAttributes = (options: IOption[], uid: string) => {
    setAttributes((prevState: any) => {
      return {
        ...prevState,
        [uid]: options,
      };
    });
  };

  const removeImage = (idx: number) => {
    const newImages = images.filter((node, index)=> idx !== index)
    setIndex(0)
    setImages(newImages)
  }

  const submit = async () => {
    const attrs = Object.keys(selectedAttrs).map((uid) => {
      return {
        attributeRef: uid,
        options: selectedAttrs[uid],
      };
    });
    const product = {
      name,
      uid: uuidv4(),
      quantity: parseInt(`${quantity}`),
      price: parseInt(`${price}`),
      sku,
      cost: parseInt(cost),
      description,
      enabled: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attributes: attrs,
      images: images.map(({ name }) => ({ name })),
    };
    try {
      await productSchema.validate(product)
      await productAttributesCheck(attributes, product.attributes)
      dispatch(
        insertProduct(product as any, images, () => {
          push("/home/create-invoice");
        })
      );
    } catch (error) {
      setErrors(error)
    }
  };
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
                              )
                            );
                            updateProductDetail();
                            setShowProductModal(!showProductModal);
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
            <AddProductForm
              removeImage={removeImage}
              attributes={attributes}
              cost={cost}
              description={description}
              errors={errors}
              fileIput={fileIput}
              handleAttributes={handleAttributes}
              handleChange={handleChange}
              handleSelect={handleSelect}
              images={images}
              index={index}
              isLoading={isLoading}
              onFileSelect={onFileSelect}
              price={price}
              quantity={quantity}
              setErrors={setErrors}
              sku={sku}
              name={name}
              submit={submit}
            />
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
