import React from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonCard,
  IonItem,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonList,
} from "@ionic/react";
import { IAccount } from "../../lib/accounts";
import "./UserSearchModel.css";
interface ISearchUserModelProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  accounts: any;
}

const UserSearchModel: React.FC<ISearchUserModelProps> = ({
  setShowModal,
  showModal,
  accounts,
}) => {
  return (
    <IonModal isOpen={showModal}>
      <IonPage>
        <IonContent>
          <IonCard>
            <IonSearchbar />
            <IonList>
              {accounts?.length ? (
                accounts.map((account: IAccount) => {
                  return (
                    <IonItem
                      onClick={() => console.log("click")}
                      key={account.uid}
                      className="cursor"
                    >
                      <IonLabel>
                        <h2>Name: {account.name}</h2>
                        <h3>Phone: {account.phone}</h3>
                        <p>Email: {account.email}</p>
                      </IonLabel>
                    </IonItem>
                  );
                })
              ) : (
                <p>No user found</p>
              )}
            </IonList>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>Close</IonButton>
      </IonPage>
    </IonModal>
  );
};
export default UserSearchModel;
