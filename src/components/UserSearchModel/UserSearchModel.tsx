import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonList,
} from "@ionic/react";
import * as JsSearch from "js-search";
import { IAccount } from "../../lib/accounts";
import "./UserSearchModel.css";

export const accountTypeCheck = async (account: any) => {
  if (!account) return;
  if (!account.accountType) {
    throw new Error(`Account type is a required field`);
  }
};
interface ISearchUserModelProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  accounts: any;
  pickAccount?: any;
}

const UserSearchModal: React.FC<ISearchUserModelProps> = ({
  setShowModal,
  showModal,
  accounts,
  pickAccount,
}) => {
  const [userData, setUserData] = useState<IAccount[] | null>(null);

  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("phone");
  search.addIndex("email");
  search.addIndex("accountNumber");

  if (accounts) {
    search.addDocuments(accounts);
  }
  const searchedUser = (input: any) => {
    setUserData(search.search(input) as any);
  };

  // js-search code end here
  return (
    <IonModal isOpen={showModal}>
      <IonPage>
        <IonContent>
          <>
            <IonSearchbar onIonChange={(e) => searchedUser(e.detail.value!)} />
            <IonList>
              {userData?.length
                ? userData.map((account: IAccount) => {
                    return (
                      <IonItem
                        key={account.uid}
                        className="cursor"
                        onClick={() => {
                          const user = userData.find(
                            (filter: any) => filter.uid === account.uid
                          );
                          setShowModal(!showModal);
                          pickAccount(user);
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
                : accounts?.map((account: IAccount) => {
                    return (
                      <IonItem
                        key={account.uid}
                        className="cursor"
                        onClick={() => {
                          const user = accounts.find(
                            (filter: any) => filter.uid === account.uid
                          );
                          setShowModal(!showModal);
                          pickAccount(user);
                        }}
                      >
                        <IonLabel>
                          <h2>Name: {account.name}</h2>
                          <h3>Phone: {account.phone}</h3>
                          <p>Email: {account.email}</p>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
            </IonList>
          </>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>Cancel</IonButton>
      </IonPage>
    </IonModal>
  );
};
export default UserSearchModal;
