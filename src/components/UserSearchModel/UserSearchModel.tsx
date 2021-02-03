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
import * as JsSearch from "js-search";

import { IAccount } from "../../lib/accounts";
import "./UserSearchModel.css";
interface ISearchUserModelProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  accounts: any;
  userData: any;
  setUserData: any;
  setCurrentUser: any;
}

const UserSearchModel: React.FC<ISearchUserModelProps> = ({
  setShowModal,
  showModal,
  accounts,
  userData,
  setUserData,
  setCurrentUser,
}) => {
  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("phone");
  search.addIndex("email");
  search.addIndex("accountNumber");

  search.addDocuments(accounts!);
  const searchedUser = (input: any) => {
    search.search(input);
    console.log(" search.search(input);", search.search(input));
    setUserData(search.search(input));
    console.log("userData", userData);

    console.log("input", input);
  };

  // js-search code end here
  return (
    <IonModal isOpen={showModal}>
      <IonPage>
        <IonContent>
          <IonCard>
            <IonSearchbar onIonChange={(e) => searchedUser(e.detail.value!)} />
            <IonList>
              {userData?.length
                ? userData.map((account: IAccount) => {
                    return (
                      <IonItem
                        key={account.uid}
                        className="cursor"
                        onClick={() => {
                          setShowModal(!showModal);
                          setCurrentUser(
                            userData.find(
                              (filter: any) => filter.uid === account.uid
                            )
                          );
                        }}
                      >
                        <IonLabel>
                          <h2>Name: {account.name}</h2>
                          <h3>Phone: {account.phone}</h3>
                          <p>Email: {account.email}</p>
                        </IonLabel>
                      </IonItem>
                    );
                  })
                : ""}
            </IonList>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>Close</IonButton>
      </IonPage>
    </IonModal>
  );
};
export default UserSearchModel;
