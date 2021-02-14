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
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import { PaymentOptions } from "../../lib/enum";

const options = [
  {
    value: PaymentOptions.BANK,
    label: "Bank",
  },
  {
    value: PaymentOptions.CASH,
    label: "Cash",
  },
  {
    value: PaymentOptions.CHEQUE,
    label: "Cheque",
  },
];

interface AddEntryViewProps {
  isEdit?: boolean;
  accounts?: any;
  userData?: any;
  setUserData?: any;
  updateUserDetail?: any;
  selectedUser?: any;
  currentBlnc?: any;
  amount?: any;
  setAmount?: any
  formFields?: any;
  handleChange?: any

}
const AddEntryView: React.FC<AddEntryViewProps> = ({
  isEdit,
  accounts,
  userData,
  setUserData,
  updateUserDetail,
  selectedUser,
  currentBlnc,
  amount,
  setAmount,
  formFields,
  handleChange
}) => {
  const [showModal, setShowModal] = useState(false);

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
                <IonInput value={selectedUser.name} name="name" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput value={selectedUser.phone} name="phone" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Balance</IonLabel>
                <IonInput value={selectedUser && currentBlnc} name="phone" />
              </IonItem>

              <IonItem className="ion-margin">
                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput value={amount} name="amount" onIonChange={(e) => setAmount(e.detail.value)}/>
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
                <IonLabel position="stacked">invoice ID</IonLabel>
                <IonInput value="" name="invoiceID" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonSelect name="paymentOptions" placeholder="Account Type">
                  {options.map(({ value, label }) => (
                    <IonSelectOption key={value} value={value}>
                      {label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Receivable Amount</IonLabel>
                <IonInput value= {currentBlnc-amount} name="receivableAmount" />
               
              </IonItem>
              <IonItem>
                <IonSelect name="entryType" placeholder="Entry Type">
                  <IonSelectOption value="credit">Credit</IonSelectOption>
                  <IonSelectOption value="debit">Debit</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryView;
