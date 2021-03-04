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
  IonText,
  IonToast,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";
import "./SignInView.css";

interface SignInProps {
  handleChange: (e: any) => void;
  submit: () => void;
  errors: ValidationError | undefined;
  setErrors: (value: ValidationError | undefined) => void;
}
const SignIn = ({ errors, setErrors, handleChange, submit }: SignInProps) => {
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
              <h1 className="fontSize">Sign In</h1>
            </IonText>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" name="email" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Password</IonLabel>
              <IonLabel>
                <IonInput name="password" onIonChange={handleChange} />
              </IonLabel>
            </IonItem>
            <IonButton
              onClick={() => submit()}
              size="large"
              expand="block"
              color="primary"
            >
              Sign In
            </IonButton>
            <Link to="/sign-up" className="ion-margin">
              Create New Account
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SignIn;
