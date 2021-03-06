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
import {
  text,
  cube,
  keyOutline,
  callOutline,
  walletOutline,
  calendar,
  cashOutline,
} from "ionicons/icons";
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
  const {
    invoiceNumber,
    subTotal,
    taxRate,
    total,
    totalDiscount,
    detail,
    paymentOption,
    currentBalance,
    date,
    uid,
    products,
  } = invoice;
  console.log("invoice", invoice);

  return (
    <IonModal isOpen={showModel}>
      <IonPage>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonIcon icon={keyOutline} slot="start" />
              <IonLabel>Invoide Number: {invoiceNumber} </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Name: {detail.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={callOutline} slot="start" />
              <IonLabel>Phone: {detail.phone}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={walletOutline} slot="start" />
              <IonLabel>Current Balance: {currentBalance}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={calendar} slot="start" />
              <IonLabel>Date: {date}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Discount: {totalDiscount}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Tax: {taxRate}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>SubTotal: {subTotal}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Total: {total}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cashOutline} slot="start" />
              <IonLabel>Payment Option: {paymentOption.value}</IonLabel>
            </IonItem>
            {products.map((prod: any) => {
              return (
                <IonItem key={prod.product}>
                  <IonIcon icon={cube} slot="start" />
                  <IonLabel>
                    <h2>{prod.name}</h2>
                    <h3>Quantity: {prod.quantity}</h3>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonCard>
          <IonCard>
            <IonCardContent>
              <Link to={`/home/edit-invoice/${uid}`}>
                <IonButton fill="outline">Edit</IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModel(!showModel)}>Close</IonButton>
      </IonPage>
    </IonModal>
  );
};
export default InvoiceViewModel;
