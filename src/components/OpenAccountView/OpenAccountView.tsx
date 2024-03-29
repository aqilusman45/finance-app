import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { ValidationError } from "yup";
import { IOption } from "../../lib/attributes";
import { AccountTypes } from "../../lib/enum";
import './OpenAccountView.css'
interface OpenAccountViewProps {
  errors: ValidationError | undefined;
  setErrors: (value: ValidationError | undefined) => void;
  handleChange: (e: any) => void;
  isEdit?: boolean;
  submit: () => void;
  state: {
    name: string;
    email: string;
    phone: string;
    description: string;
    accountNumber: string;
    accountTitle: string;
    address: string;
    companyName: string;
    balance: string;
    accountType: {
      value: string;
      label: string;
    };
  };
}


const options: IOption[] = [{
  value: AccountTypes.CUSTOMER,
  label: "Customer"
}, {
  value: AccountTypes.PURCHASE,
  label: "Purchase"
}, {
  value: AccountTypes.BANK,
  label: "Bank"
}, {
  value: AccountTypes.EXPENSES,
  label: "Expenses"
}, {
  value: AccountTypes.SALES,
  label: "Sales"
}]

const OpenAccountForm = ({
  errors,
  setErrors,
  handleChange,
  submit,
  state,
  isEdit
}: OpenAccountViewProps) => {

  const { name, description, accountNumber, accountTitle, balance, email, phone, accountType, companyName, address } = state;

  return (
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
      <IonGrid className="ion-padding">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6" className="mb">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Account Holder Name</IonLabel>
              <IonInput value={name} name="name" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={email}
                name="email"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                value={phone}
                name="phone"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                value={description}
                name="description"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Company Name</IonLabel>
              <IonInput
                value={companyName}
                name="companyName"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Address</IonLabel>
              <IonInput
                value={address}
                name="address"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonButton
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
              className="ion-margin"
            >
              {isEdit ? "Update Account" : "Open Account"}
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Bank Account Title</IonLabel>
              <IonInput
                value={accountTitle}
                name="accountTitle"
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Bank Account Number</IonLabel>
              <IonInput value={accountNumber} name="accountNumber" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonSelect
                onIonChange={(e) => {
                  const option = options.find(({ value }) => value === e.detail.value)
                  handleChange({
                    currentTarget: {
                      name: "accountType",
                      value: option
                    }
                  })
                }}
                value={accountType.value}
                name="accountType"
                multiple={false}
                placeholder="Account Type"
              >
                {options.map(({ value, label }) => (
                  <IonSelectOption key={value} value={value}>
                    {label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel  position="stacked">Balance</IonLabel>
              <IonInput
                disabled={isEdit ? true : false}
                value={balance}
                name="balance"
                onIonChange={handleChange}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default OpenAccountForm;
