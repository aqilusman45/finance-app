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
import { text, cube, keyOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

interface EntriesViewProps {
  showModel: boolean;
  setShowModel: (show: boolean) => void;
  account?: any;
}
const EntriesViewModel: React.FC<EntriesViewProps> = ({
  showModel,
  setShowModel,
  account,
}) => {
  if (!account) return null;
  const { name, invoiceID, productID, amount, remainingAmount } = account;
  return (
    <IonModal isOpen={showModel} cssClass="my-custom-class">
      <IonPage>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Name: {name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={keyOutline} slot="start" />
              <IonLabel>Invoice ID: {invoiceID}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={keyOutline} slot="start" />
              <IonLabel>Product ID: {productID}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Amount: {amount}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Remaining Amount: {remainingAmount}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <Link to={`/home/edit-entry/${invoiceID}`}>
                <IonButton fill="outline">Edit</IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModel(!showModel)}>
          Close Modal
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default EntriesViewModel;
