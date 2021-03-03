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
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./SignUpView.css";
interface SignUpProps {
  handleChange: (e: any) => void;
}
const SignUpView = ({ handleChange }: SignUpProps) => {
  return (
    <IonContent>
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
                  <IonInput
                    type="password"
                    name="password"
                    onIonChange={handleChange}
                  />
                </IonLabel>
              </IonItem>
              <IonItemDivider />
              <Link to="/home">
                <IonButton size="large" expand="block" color="primary">
                  Sign Up
                </IonButton>
              </Link>
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
