import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonItemGroup,
  IonItemDivider,
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
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Name</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput name="name" onIonChange={handleChange} />
                </IonLabel>
              </IonItem>
              <IonItemDivider>
                <IonLabel>Email</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput
                    type="email"
                    name="email"
                    onIonChange={handleChange}
                  />
                </IonLabel>
              </IonItem>
              <IonItemDivider>
                <IonLabel>Phone</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput name="phone" onIonChange={handleChange} />
                </IonLabel>
              </IonItem>
              <IonItemDivider>
                <IonLabel>Password</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput name="password" onIonChange={handleChange} />
                </IonLabel>
              </IonItem>
              <IonItemDivider />
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
              <Link to="/" className="ion-margin">
                Already have an Account ?
              </Link>
            </IonItemGroup>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SignUpView;
