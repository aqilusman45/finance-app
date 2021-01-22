import React from "react";
import {
  IonContent,
  IonButton,
  IonModal,
  IonCard,
  IonPage,
  IonItem,
  IonLabel,
  IonIcon,
  IonCardContent,
} from "@ionic/react";
import { IEditInvoice } from "./../../lib/editInvoice";

import { text, cube, keyOutline, callOutline } from "ionicons/icons";

interface InvoiceViewModelProps {
  showModel: boolean;
  setShowModel: (show: boolean) => void;
  invoices: any;
}

const InvoiceViewModel: React.FC<InvoiceViewModelProps> = ({
  showModel,
  setShowModel,
  invoices,
}) => {
  if (!invoices) return null;
  const {
    name,
    total,
    invoideID,
    discount,
    phone,
    tax,
  } = invoices;
  console.log("name", invoices);
  
  return (
    <IonModal isOpen={showModel}>
      <IonPage>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Name: {name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Phone: {phone}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Invoide ID: {invoideID}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Discount: {discount}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Tax: {tax}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Total: {total}</IonLabel>
            </IonItem>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModel(!showModel)}>
          Close Modal
        </IonButton>
      </IonPage>
    </IonModal>
  );
};
export default InvoiceViewModel;
