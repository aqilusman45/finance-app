import React from "react";
import { IAccount } from "../../lib/accounts";
import {
  IonModal,
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { mail, text, checkmark, close, cash, cube } from "ionicons/icons";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";

interface IAccountModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  account?: IAccount;
}

export const AccountModal: React.FC<IAccountModalProps> = ({
  setShowModal,
  showModal,
  account,
}) => {
  if (!account) return null;

  const {
    uid,
    name,
    accountNumber,
    accountTitle,
    accountType: { label },
    balance,
    description,
    email,
    enabled,
    phone,
  } = account;

  return (
    <IonModal isOpen={showModal} cssClass="my-custom-class">
      <IonPage>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonIcon icon={text} slot="start" />
              <IonLabel>Name: {name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} slot="start" />
              <IonLabel>Email: {email}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} slot="start" />
              <IonLabel>Phone: {phone}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cash} slot="start" />
              <IonLabel>Account Title: {accountTitle}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Account Number: {accountNumber}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>
                Account Type:{" "}
                <Badge
                  style={{
                    fontSize: 10,
                    padding: "10px 10px",
                  }}
                  variant="dark"
                >
                  {label}
                </Badge>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Balance: {balance}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cube} slot="start" />
              <IonLabel>Description: {description}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={enabled ? checkmark : close} slot="start" />
              <IonLabel>{enabled ? "Enabled" : "Disabled"}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <Link to={`/home/edit-account/${uid}`}>
                <IonButton fill="outline">Edit</IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>
          Close Modal
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default AccountModal;
