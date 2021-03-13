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

const INITIAL_STATE = {
  key: "",
};
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
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
      const data = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        activated: true,
      };
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
