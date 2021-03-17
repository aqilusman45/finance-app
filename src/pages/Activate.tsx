import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonToast,
} from "@ionic/react";
import { useHistory } from "react-router";
import { activationSchema } from "../helpers/validations";
import { ValidationError } from "yup";
import { updateActivationAsync } from "../store/reducers/activation";
import { useDispatch } from "react-redux";
import { addAccount } from "../store/reducers/accounts";
import { AccountTypes } from "../lib/enum";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  key: "",
};
const ACCOUNT_INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  address: "",
  companyName: "",
  balance: 0,
  accountType: {
    value: "",
    label: "",
  },
};
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [accountState] = useState({
    ...ACCOUNT_INITIAL_STATE,
  });
  const [errors, setErrors] = useState<ValidationError | undefined>();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    try {
      await activationSchema.validate(formFields);
      const cashAccountData = {
        ...accountState,
        uid: uuidv4(),
        enabled: true,
        name: "Cash",
        accountType: { value: AccountTypes.CASH, label: "Cash" },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const expenseAccountData = {
        ...accountState,
        uid: uuidv4(),
        enabled: true,
        name: "Expenses",
        accountType: { value: AccountTypes.EXPENSES, label: "Expenses" },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const receivableAccountData = {
        ...accountState,
        uid: uuidv4(),
        enabled: true,
        name: "Receivable",
        accountType: { value: AccountTypes.RECEIVABLE, label: "Receivable" },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const data = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        activated: true,
      };

      dispatch(addAccount(cashAccountData as any));
      dispatch(addAccount(expenseAccountData as any));
      dispatch(addAccount(receivableAccountData as any));
      dispatch(
        updateActivationAsync(data as any, () => {
          if (formFields.key === "12345678") {
            push("/sign-up");
          }
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };

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
      <IonGrid>
        <IonRow
          style={{ height: "96vh" }}
          class="ion-justify-content-start ion-align-items-center"
        >
          <IonCol class="ion-text-center" size="4" offset="4">
            <IonText>
              <h1 className="fontSize">Activate App</h1>
            </IonText>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Activation Key</IonLabel>
              <IonInput
                type="text"
                name="key"
                value={formFields.key}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonButton
              onClick={() => submit()}
              size="large"
              expand="block"
              color="primary"
            >
              Activate
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SignIn;
