import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import UserSearchModel from "./../UserSearchModel/UserSearchModel";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../../store/reducers/accounts";
import { RootState } from "../../store/rootReducer";

interface AddEntryViewProps {
  isEdit?: boolean;
}
const AddEntryView: React.FC<AddEntryViewProps> = ({ isEdit }) => {
  const [selected, setSelected] = React.useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<any>({})
  const dispatch = useDispatch();

  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  const updateUserDetail = (user: any) => {
    setSelectedUser(user)
  console.log("user", user);

    
  }

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);
  
  return (
    <IonPage>
      <IonContent>
      <UserSearchModel
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
          userData={userData}
          setUserData={setUserData}
          updateUserDetail={updateUserDetail}

        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                showCancelButton="focus"
                debounce={1000}
                placeholder="Select User"
                onClick={() => setShowModal(!showModal)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Holder Name</IonLabel>
                <IonInput value={selectedUser.name} name="name" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput value={selectedUser.phone} name="phone" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Balance</IonLabel>
                <IonInput value={selectedUser.balance} name="phone" />
              </IonItem>
             
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput value="" name="amount" />
              </IonItem>
              <IonItem>
                <IonSelect
                  name="accountType"
                  value={selected}
                  placeholder="Entry Type"
                  onIonChange={(e) => setSelected(e.detail.value)}
                >
                  <IonSelectOption value="credit">Credit</IonSelectOption>
                  <IonSelectOption value="debit">Debit</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonButton className="ion-margin">
                {isEdit ? "Update Entry" : "Create Entry"}
              </IonButton>
              <IonButton className="ion-margin" color="danger">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol size="6">
            <IonItem className="ion-margin">
                <IonLabel position="stacked">invoice ID</IonLabel>
                <IonInput value="" name="invoiceID" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Account Type</IonLabel>
                <IonInput value="" name="acountType" />
              </IonItem>
              <IonItem className="ion-margin">
                <IonLabel position="stacked">Receivable Amount</IonLabel>
                <IonInput value="" name="receivableAmount" />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryView;
