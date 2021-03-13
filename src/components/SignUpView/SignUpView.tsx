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
import "./SignUpView.css";
import { ValidationError } from "yup";

interface SignUpProps {
  handleChange: (e: any) => void;
  submit: () => void;
  errors: ValidationError | undefined;
  setErrors: (value: ValidationError | undefined) => void;
}
const SignUpView = ({
  errors,
  setErrors,
  handleChange,
  submit,
}: SignUpProps) => {
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
              <h1 className="fontSize">Sign Up</h1>
            </IonText>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput name="name" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" name="email" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput name="phone" onIonChange={handleChange} />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" name="password" onIonChange={handleChange} />
            </IonItem>
            <IonButton
              onClick={() => {
                submit();
              }}
              size="large"
              expand="block"
              color="primary"
            >
              Sign Up
            </IonButton>
            <Link to="/sign-in" className="ion-margin">
              Already have an Account ?
            </Link>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SignUpView;
