import React, { FormEvent, useRef, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { addProductFunc } from "./../../Feature/ManageProductSlice/ManageProductSlice";
import { useDispatch } from "react-redux";
const INITIAL_STATE = {
  name: '',
  quantity: 0,
  sku: '',
  price: 0,
  images: []
}

const AddProduct: React.FC = () => {

  // code added by huzaifa start
  const [name, setName] = useState<String>('');
  const [quantity, setQuantity] = useState<Number>();
  const [sku, setSku] = useState<Number>();
  const [price, setprice] = useState<Number>();
  const dispatch=useDispatch()
  // code added by huzaifa end
  const fileIput = useRef<any>(null);
  // const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  // const { name, price, quantity, sku } = formFields

  // const handleChange = (e: FormEvent<HTMLIonInputElement>) => {
  //   setFormFields((prevField) => ({
  //     ...prevField,
  //     [e.currentTarget.name]: e.currentTarget.value
  //   }))
  // }

  return (
    <IonContent>
      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6">
            <IonItem className="ion-margin">
  <IonLabel position="stacked">Product Name</IonLabel>
              <IonInput name='name' onChange={(ev:any) => {
                setName(ev.target.value)

              }} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">SKU</IonLabel>
              <IonInput  name='sku' onChange={(ev: any) => {
                setSku(ev.target.value)

              }} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput  name='price' onChange={(ev: any) => {
                setprice(ev.target.value)

              }} />
            </IonItem>
            <input ref={fileIput} style={{ display: "none" }} type="file" />
            <IonButton
              onClick={() => {
                fileIput.current.click();
              }}
              className="ion-margin"
            >
              Upload image
            </IonButton>
            <IonButton onClick={() => {dispatch(addProductFunc({name,quantity,sku,price})) }}>Add Product</IonButton>
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Quantity</IonLabel>
              <IonInput  name='quantity' onChange={(ev: any) => {
                setQuantity(ev.target.value)

              }} />
            </IonItem>
            {/* <IonItem className="ion-margin">
              <IonLabel>Categories</IonLabel>
              <IonSelect multiple={true} placeholder="Select One">
                <IonSelectOption value="t-shirt">T-shirt</IonSelectOption>
                <IonSelectOption value="shirt">Shirt</IonSelectOption>
              </IonSelect>
            </IonItem> */}
            {/* <IonItem className="ion-margin">
              <IonLabel>Sizes</IonLabel>
              <IonSelect multiple={true} placeholder="Select One">
                <IonSelectOption value="small">Small</IonSelectOption>
                <IonSelectOption value="medium">Medium</IonSelectOption>
                <IonSelectOption value="large">Large</IonSelectOption>
              </IonSelect>
            </IonItem> */}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddProduct;
