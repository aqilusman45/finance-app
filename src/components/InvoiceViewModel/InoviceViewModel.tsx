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
import { Link } from "react-router-dom";
import { text, cube, keyOutline, callOutline } from "ionicons/icons";
interface InvoiceViewModelProps {
  showModel: boolean;
  setShowModel: (show: boolean) => void;
  invoice: any;
}
const InvoiceViewModel: React.FC<InvoiceViewModelProps> = ({
  showModel,
  setShowModel,
  invoice,
}) => {
  if (!invoice) return null;
  const { userName, total, invoiceID, discount, phone, tax } = invoice;

  return (
    <IonModal isOpen={showModel}>
      <IonPage>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonIcon icon={keyOutline} slot="start" />
              <IonLabel>Invoide ID: {invoiceID}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Name: {userName}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={callOutline} slot="start" />
              <IonLabel>Phone: {phone}</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Discount: {discount}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Tax: {tax}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Total: {total}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <Link to={`/home/edit-invoice/${invoiceID}`}>
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
export default InvoiceViewModel;
