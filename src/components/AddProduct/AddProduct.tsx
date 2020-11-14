import React, { useEffect, useRef, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonLoading,
  IonButton,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { v4 as uuidv4 } from "uuid";
import { fetchAttributes } from "../../store/reducers/attributes";
import { insertProduct } from "../../store/reducers/products";
import CheckBox from "../CheckBox/Checkbox";
import { AttributeType } from "../../lib/enum";
import { encodeImageFileAsURL } from "../../utils/toBase64";
import { IImages } from "../../lib/products";
import { IOption } from "../../lib/attributes";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

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
  const [selectedAttrs, setAttributes] = useState<any>({});
  const [errors,setErrors] = useState<any>({});


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
    console.log(e.target.value);
        
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


  const Example = () => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = (values:any) => console.log(values);
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}
  
        <input
          name="username"
          ref={register({
            validate: value => value !== "admin" || "Nice try!"
          })}
        />
        {errors.username && errors.username.message}
  
        <button type="submit">Submit</button>
      </form>
    );
  };

  // const valid = (e: any)=>{
  //   const {name, value} = e.target;
  //   switch(name){
  //     case 'productname':
  //       errors.name = 
  //       value.length < 5
  //         ? 'Full Name must be 8 characters long!'
  //         : '';
  //     break;
  //   case 'SKU': 
  //     errors.name = 
  //       value.length < 8
  //         ? 'SKU must be 8characters long!'
  //         : '';
  //     break;
  //   case 'Price': 
  //     errors.name = 
  //       value.length < 8
  //         ? 'SKU must be 8characters long!'
  //         : '';
  //     break;
  //   case 'Cost': 
  //     errors.name = 
  //       value.length < 8
  //         ? 'SKU must be 8characters long!'
  //         : '';
  //     break;
  //   default:
  //     break;
  //   }
  // }


  const handleAttributes = (options: IOption[], uid: string) => {
    setAttributes((prevState: any) => {
      return {
        ...prevState,
        [uid]: options,
      };
    });
  };

  const submit = () => {
    // if(!valid){
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
        cost,
        description,
        enabled: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        attributes: attrs,
        images: images.map(({ name }) => ({ name })),
      };
      dispatch(
        insertProduct(product as any, images, () => {
          push("/home/manage-products");
        })
      );
    };
    // }

  return (
    <IonContent>
      <Example />
      <IonLoading isOpen={isLoading} message={"Please wait..."} />
      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Product Name</IonLabel>
              <IonInput value={name} name="name" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">SKU</IonLabel>
              <IonInput value={sku} name="sku" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput value={price} name="price" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Cost</IonLabel>
              <IonInput value={cost} name="cost" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                value={description}
                name="description"
                onIonChange={handleChange}
              />
            </IonItem>
            <input
              ref={fileIput}
              onChange={onFileSelect}
              style={{ display: "none" }}
              type="file"
            />
            <IonButton
              onClick={() => {
                fileIput.current.click();
              }}
              className="ion-margin"
            >
              Upload image
            </IonButton>
            <IonButton
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              Add Product
            </IonButton>
            {!!images.length && (
              <Carousel
                slide={false}
                activeIndex={index}
                onSelect={handleSelect}
              >
                {images.map(({ base64, name }) => (
                  <CarouselItem key={name}>
                    <IonThumbnail
                      key={name}
                      style={{
                        height: "230px",
                        width: "100%",
                      }}
                    >
                      <IonImg alt={name} src={base64} />
                    </IonThumbnail>
                  </CarouselItem>
                ))}
              </Carousel>
            )}
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Quantity</IonLabel>
              <IonInput
                value={quantity}
                name="quantity"
                onIonChange={handleChange}
              />
            </IonItem>
            {!!attributes?.length &&
              attributes.map(
                ({
                  attributeName: { key, name },
                  options,
                  attributeType,
                  uid,
                }) => (
                  <IonItem key={key} className="ion-margin">
                    <CheckBox
                      handleChange={handleAttributes}
                      multiple={attributeType === AttributeType.CHECKBOXES}
                      label={name}
                      uid={uid}
                      options={options}
                    />
                  </IonItem>
                )
              )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddProduct;
