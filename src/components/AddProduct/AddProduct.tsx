import React, { useRef } from "react";
import './AddProduct.css';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import AddNewBrandAlert from "../AddNewBrandAlert/AddNewBrandAlert";

const AddProduct: React.FC = () => {
  const fileIput = useRef<any>(null);
  return (
    <IonContent>
      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Product Name</IonLabel>
              <IonInput> </IonInput>
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">SKU</IonLabel>
              <IonInput> </IonInput>
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput> </IonInput>
            </IonItem>
            <input ref={fileIput} style={{ display: "none" }} type="file" />
            <IonButton onClick={()=>{
              fileIput.current.click()
            }} className="ion-margin">Upload image</IonButton>
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Quantity</IonLabel>
              <IonInput></IonInput>
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel>Categories</IonLabel>
              <IonSelect multiple={true} placeholder="Select One">
                <IonSelectOption value="t-shirt">T-shirt</IonSelectOption>
                <IonSelectOption value="shirt">Shirt</IonSelectOption>
              </IonSelect>
            <AddNewBrandAlert/>
            </IonItem>

            <IonItem className="ion-margin">
              <IonLabel>Sizes</IonLabel>
              <IonSelect multiple={true} placeholder="Select One">
                <IonSelectOption value="small">Small</IonSelectOption>
                <IonSelectOption value="medium">Medium</IonSelectOption>
                <IonSelectOption value="large">Large</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton  className="addProBtn">Add Product</IonButton>
          </IonCol>

        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddProduct;
