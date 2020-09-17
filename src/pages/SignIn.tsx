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
  IonButton
} from "@ionic/react";

const SignIn: React.FC = () => {
  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{ height: "96vh" }}
          class="ion-justify-content-start ion-align-items-center"
        >
          <IonCol class="ion-text-center" size="6" offset="3">
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Email</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput />
                </IonLabel>
              </IonItem>
              <IonItemDivider>
                <IonLabel>Password</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel>
                  <IonInput />
                </IonLabel>
              </IonItem>
              <IonItemDivider />
              <IonButton
                routerLink="/home"
                size="large"
                expand="block"
                color="primary"
              >
                Sign In
              </IonButton>
            </IonItemGroup>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SignIn;
