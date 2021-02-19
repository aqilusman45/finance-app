import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonPage,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";

interface AddEntryViewProps {
  isEdit?: boolean;
  accounts?: any;
  userData?: any;
  setUserData?: any;
  updateUserDetail?: any;
  amount?: any;
  setAmount?: any;
  formFields?: any;
  submit?: any;
}
const AddEntryView: React.FC<AddEntryViewProps> = ({
  isEdit,
  accounts,
  userData,
  setUserData,
  updateUserDetail,
  amount,
  setAmount,
  formFields,
  submit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { name, phone, balance } = formFields;
  console.log("formFields", formFields);

  return (
    <IonPage>
      <IonContent>
        <UserSearchModel
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
          userData={userData}
          setUserData={setUserData}
          updateUserDetail={updateUserDetail}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                showCancelButton="focus"
                debounce={1000}
                placeholder="Select User"
                onClick={() => setShowModal(!showModal)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Holder Name</IonLabel>
                <IonInput readonly value={name} name="name" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput readonly value={phone} name="phone" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Balance</IonLabel>
                <IonInput readonly value={balance} name="phone" />
              </IonItem>

              <IonItem className="ion-margin">
                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput
                  name="amount"
                  type="number"
                  value={amount}
                  onIonChange={(e) => setAmount(e.detail.value!)}
                />
              </IonItem>

              <IonButton className="ion-margin" onClick={() => submit()}>
                {isEdit ? "Update Entry" : "Create Entry"}
              </IonButton>
              <IonButton className="ion-margin" color="danger">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonLabel position="stacked">invoice ID</IonLabel>
                <IonInput readonly value="" name="invoiceID" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Receivable Amount</IonLabel>
                <IonInput
                  readonly
                  value={amount - balance}
                  name="receivableAmount"
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryView;
