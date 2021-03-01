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
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import { PaymentOptions, EntryTypes } from "../../lib/enum";
import { IOption } from "../../lib/attributes";
import { useHistory } from "react-router";

const optionsForPayment: IOption[] = [
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

const options: IOption[] = [
  {
    value: EntryTypes.CREDIT,
    label: "Credit",
  },
  {
    value: EntryTypes.DEBIT,
    label: "Debit",
  },
];
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
  handleChange?: any;
  entryFields?: any;
  checkEntryType?: any;
  setErrors?: any;
  errors?: any;
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
  handleChange,
  entryFields,
  checkEntryType,
  setErrors,
  errors,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { name, phone, balance } = formFields;
  const { paymentOption, entryType } = entryFields;
  const { push } = useHistory();

  return (
    <IonPage>
      <IonContent>
        <IonToast
          isOpen={!!errors}
          message={errors && errors.message}
          position="bottom"
          color="danger"
          duration={2000}
          onDidDismiss={() => {
            setErrors(undefined);
          }}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />
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
                  value={amount}
                  name="amount"
                  type="number"
                  onIonChange={(e) => setAmount(e.detail.value!)}
                />
              </IonItem>
              <IonButton className="ion-margin" onClick={() => submit()}>
                {isEdit ? "Update Entry" : "Create Entry"}
              </IonButton>
              <IonButton
                onClick={() => push("/home")}
                className="ion-margin"
                color="danger"
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonSelect
                  onIonChange={(e) => {
                    const option = options.find(
                      ({ value }) => value === e.detail.value
                    );
                    handleChange({
                      currentTarget: {
                        name: "entryType",
                        value: option,
                      },
                    });
                  }}
                  value={entryType.value}
                  name="entryType"
                  multiple={false}
                  placeholder="Entry Type"
                >
                  {options.map(({ value, label }) => (
                    <IonSelectOption key={value} value={value}>
                      {label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem className="ion-margin">
                <IonSelect
                  onIonChange={(e) => {
                    const option = optionsForPayment.find(
                      ({ value }) => value === e.detail.value
                    );
                    handleChange({
                      currentTarget: {
                        name: "paymentOption",
                        value: option,
                      },
                    });
                  }}
                  value={paymentOption.value}
                  name="paymentOption"
                  multiple={false}
                  placeholder="Entry Type"
                >
                  {optionsForPayment.map(({ value, label }) => (
                    <IonSelectOption key={value} value={value}>
                      {label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Receivable Amount</IonLabel>
                <IonInput
                  readonly
                  value={
                    Number(balance) + Number(`${checkEntryType()}${amount}`)
                  }
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
