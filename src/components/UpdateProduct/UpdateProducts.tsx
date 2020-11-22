import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAttributes } from "../../store/reducers/attributes";
import { fetchProducts } from "../../store/reducers/products";
import { encodeImageFileAsURL } from "../../utils/toBase64";
import { IImages } from "../../lib/products";
import { IOption } from "../../lib/attributes";
import { useHistory, useParams } from "react-router";
import {
  productAttributesCheck,
  productSchema,
} from "../../helpers/validations";
import { ValidationError } from "yup";
import AddProductForm from "../AddProductView/AddProductView";
import { getProductAttatchments } from "../../utils/database";

const INITIAL_STATE = {
  name: "",
  quantity: `0`,
  sku: "",
  price: `0`,
  cost: `0`,
  images: [],
  description: "",
};

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const {
    products: { products, isLoading: productsLoading },
    attributes: { attributes, isLoading: attributesLoading },
  } = useSelector((state: RootState) => state);

  const { push } = useHistory();
  const dispatch = useDispatch();

  const fileIput = useRef<any>(null);

  const [index, setIndex] = useState(0);
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [images, setImages] = useState<IImages[]>([]);
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [selectedAttrs, setAttributes] = useState<any>({});

  const { name, price, quantity, sku, description, cost } = formFields;

  useEffect(() => {
    if (!attributes)
      dispatch(fetchAttributes());
    if (!products)
      dispatch(fetchProducts());
  }, [attributes, dispatch]);

  useEffect(() => {
    if (products) {
      const product = products.find(({ uid }) => uid === id)
      if (product) {
        (async () => {
          const images = (await getProductAttatchments(product)).filter(
            ({ base64 }) => base64
          );
          setImages(images as any);
          setFormFields({
            name: product.name,
            cost: `${product.cost}`,
            description: product.description,
            images: product.images as any,
            price: `${product.price}`,
            quantity: `${product.quantity}`,
            sku: product.sku
          })
        })();
      }
    }
  }, [attributes, id])

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
    const newImages = images.filter((node, index) => idx !== index);
    setIndex(0);
    setImages(newImages);
  };

  const submit = async () => {
    // const attrs = Object.keys(selectedAttrs).map((uid) => {
    //   return {
    //     attributeRef: uid,
    //     options: selectedAttrs[uid],
    //   };
    // });
    const product = {};
    try {
      await productSchema.validate(product);
      // await productAttributesCheck(attributes, product.attributes);
      // dispatch();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
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
      isLoading={productsLoading || attributesLoading}
      onFileSelect={onFileSelect}
      price={price}
      quantity={quantity}
      setErrors={setErrors}
      sku={sku}
      name={name}
      submit={submit}
    />
  );
};

export default UpdateProduct;
