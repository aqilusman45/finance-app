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
import AddProductForm from "../AddProductView/AddProductView";

const INITIAL_STATE = {
  name: "",
  quantity: `0`,
  sku: "",
  price: `0`,
  cost: `0`,
  images: [],
  description: "",
};

const AddProduct: React.FC = () => {
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
  const { name, price, quantity, sku, description, cost} = formFields;

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
          push("/home/manage-products");
        })
      );
    } catch (error) {
      setErrors(error)
    }
  };

  return (
    <AddProductForm 
      removeImage={removeImage}
      attributes={attributes}
      cost={cost}
      selectedAttrs={selectedAttrs}
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
  );
};

export default AddProduct;
