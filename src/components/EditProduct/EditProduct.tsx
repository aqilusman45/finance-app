import React, { useRef, useState, useEffect } from "react";
import "./EditProduct.css";
import { IOption } from "../../lib/attributes";
import { IImages } from "../../lib/products";
import { ValidationError } from "yup";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import AddProductForm from "../AddProductView/AddProductView";
import { fetchProducts } from "../../store/reducers/products";
import { updateProductAsync } from "../../store/reducers/products";
import { getProductAttatchments } from "../../utils/database";
import {
  productAttributesCheck,
  productSchema,
} from "../../helpers/validations";
import { encodeImageFileAsURL } from "../../utils/toBase64";
import { fetchAttributes } from "../../store/reducers/attributes";
const INITIAL_STATE = {
  name: "",
  quantity: `0`,
  sku: "",
  price: `0`,
  cost: `0`,
  images: [],
  description: "",
};

const EditProduct: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const fileIput = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [images, setImages] = useState<IImages[]>([]);
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const [selectedAttrs, setAttributes] = useState<any>({});

  const { products } = useSelector((state: RootState) => {
    return state.products;
  });
  const { attributes, isLoading } = useSelector(
    (state: RootState) => state.attributes
  );
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { name, price, quantity, sku, description, cost } = formFields;

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }

    if (!attributes) {
      dispatch(fetchAttributes());
    }
  }, [attributes, products, dispatch]);

  useEffect(() => {
    if (products) {
      const product = products.find(({ uid }) => uid === id);
      if (product) {
        setAttributes(() => {
          let attr = {};
          for (const { attributeRef, options } of product.attributes) {
            attr = {
              ...attr,
              [attributeRef]: options
            }
          }
          return attr;
        })
        setFormFields({ ...(product as any) });
        (async () => {
          const images = (await getProductAttatchments(product)).filter(
            ({ base64 }) => base64
          );
          setImages(images as any);
        })();
      }
    }
  }, [products, id]);

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
    const attrs = Object.keys(selectedAttrs).map((uid) => {
      return {
        attributeRef: uid,
        options: selectedAttrs[uid],
      };
    });
    const product = {
      ...formFields,
      quantity: parseInt(`${quantity}`),
      price: parseInt(`${price}`),
      cost: parseInt(cost),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attributes: attrs,
      images: images.map(({ name }) => ({ name })),
    };
    try {
      await productSchema.validate(product);
      await productAttributesCheck(attributes, product.attributes);
      dispatch(
        updateProductAsync(product as any, images, () => {
          push("/home/manage-products");
        })
      );
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
      selectedAttrs={selectedAttrs}
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
  );
};

export default EditProduct;
