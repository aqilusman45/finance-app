import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonPage,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
IonItemDivider
} from "@ionic/react";
const EditEntryView: React.FC = () => {
    const [selected, setSelected] = React.useState<string>('biff');
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Holder Name</IonLabel>
                <IonInput value="" name="name" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">invoice ID</IonLabel>
                <IonInput value="" name="invoiceID" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput value="" name="amount" />
              </IonItem>
              <IonItem>
          <IonRadioGroup  value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Select Transaction Type</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Credit</IonLabel>
              <IonRadio slot="start" value="credit" />
            </IonItem>

            <IonItem>
              <IonLabel>Debit</IonLabel>
              <IonRadio slot="start" value="debit" />
            </IonItem>

         
          </IonRadioGroup>
    
              </IonItem>
            </IonCol>
            <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                value=""
                name="phone"
              />
            </IonItem>
            <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Type</IonLabel>
                <IonInput value="" name="accountType" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Receivable Amount</IonLabel>
                <IonInput value="" name="receivableAmount" />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditEntryView;
