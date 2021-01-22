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
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

interface AddEntryViewProps {
  isEdit?: boolean
}
const AddEntryView: React.FC<AddEntryViewProps> = ({isEdit}) => {
  const [selected, setSelected] = React.useState<string>();
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
                <IonSelect
                name="accountType"
                  value={selected}
                  placeholder="Entry Type"
                  onIonChange={(e) => setSelected(e.detail.value)}
                >
                  <IonSelectOption value="credit">Credit</IonSelectOption>
                  <IonSelectOption value="debit">Debit</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonButton className="ion-margin">
                {isEdit ? "Update Entry" : "Create Entry"}
              </IonButton>
              <IonButton className="ion-margin" color="danger">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput value="" name="phone" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Type</IonLabel>
                <IonInput value="" name="acountType" />
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

export default AddEntryView;
