import React from "react";
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
  IonToast,
  IonIcon
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import CheckBox from "../CheckBox/Checkbox";
import { AttributeType } from "../../lib/enum";
import { IImages, IOption } from "../../lib/products";
import { IAttribute } from "../../lib/attributes";
import { ValidationError } from "yup";

interface AddProductFormProps {
    isLoading: boolean;
    errors: ValidationError | undefined;
    setErrors: (value: ValidationError | undefined) => void;
    handleChange: (e: any) => void;
    fileIput: any;
    onFileSelect: (e: any) => void;
    submit: () => void;
    images: IImages[];
    attributes: IAttribute[] | null;
    handleAttributes: (options: IOption[], uid: string) => void;
    handleSelect: (idx: number) => void;
    removeImage: (idx: number) => void;
    index: number;
    sku: string;
    price: string;
    cost: string;
    description: string;
    quantity: string;
    name: string;
}

const AddProductForm = ({
    isLoading,
    errors,
    setErrors,
    handleChange,
    fileIput,
    onFileSelect,
    submit,
    images,
    attributes,
    handleAttributes,
    handleSelect,
    index,
    sku,
    price,
    description,
    cost,
    quantity,
    name,
    removeImage
}: AddProductFormProps) => {
  return (
    <IonContent>
      <IonLoading isOpen={isLoading} message={"Please wait..."} />
      <IonToast
        isOpen={!!errors}
        message={errors && errors.message}
        position="bottom"
        color="danger"
        duration={2000}
        onDidDismiss={() => {
          setErrors(undefined);
        }}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
        ]}
      />
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
                {images.map(({ base64, name }, idx) => (
                  <CarouselItem key={name}>
                    <IonIcon
                      onClick={() => {
                        removeImage(idx);
                      }}
                      style={{
                        fontSize: "30px",
                        color: "black",
                        position: "absolute",
                        zIndex: "99999999999",
                        cursor: "pointer",
                      }}
                      icon={closeCircle}
                    />
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

export default AddProductForm;
