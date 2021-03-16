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
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import { PaymentOptions, EntryTypes } from "../../lib/enum";
import { IOption } from "../../lib/attributes";
import { useHistory } from "react-router";
import { IAccount } from "../../lib/accounts";

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
  accounts?: IAccount[] | null;
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
  pickReceiverAccount?: any;
  receiverAccountFields?: any;
  removeSenderAccount?: any;
  removeReceiverAccount?: any;
}
const AddEntryView: React.FC<AddEntryViewProps> = ({
  isEdit,
  accounts,
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
  pickReceiverAccount,
  receiverAccountFields,
  removeSenderAccount,
  removeReceiverAccount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reveiverAccountModel, setReveiverAccountModel] = useState(false);
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
        {/* Pick Sender Account */}
        <UserSearchModel
          accounts={accounts?.filter(({ uid })=> receiverAccountFields.uid !== uid )}
          showModal={showModal}
          setShowModal={setShowModal}
          pickAccount={updateUserDetail}
        />
        {/* Pick Receiver Account */}

        <UserSearchModel
          accounts={accounts?.filter(({ uid })=> formFields.uid !== uid )}
          showModal={reveiverAccountModel}
          setShowModal={setReveiverAccountModel}
          pickAccount={pickReceiverAccount}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonInput readonly value={name} name="name" />
                {!name ? (
                  <IonButton
                    onFocus={() => setShowModal(!showModal)}
                    color="primary"
                  >
                    Select Sender Account
                  </IonButton>
                ) : (
                  <IonButton onClick={removeSenderAccount} color="danger">
                    Remove Sender Account
                  </IonButton>
                )}
              </IonItem>
            </IonCol>
          
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonInput
                  readonly
                  value={receiverAccountFields.name}
                  name="name"
                />
                {!receiverAccountFields.name ? (
                  <IonButton
                    onFocus={() =>
                      setReveiverAccountModel(!reveiverAccountModel)
                    }
                    color="primary"
                  >
                    Select Receiver Account
                  </IonButton>
                ) : (
                  <IonButton onClick={removeReceiverAccount} color="danger">
                    Remove Receiver Account
                  </IonButton>
                )}
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
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
              {entryType.value === "DEBIT" && (
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
                    placeholder="Payment Method"
                  >
                    {optionsForPayment.map(({ value, label }) => (
                      <IonSelectOption key={value} value={value}>
                        {label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              )}
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
