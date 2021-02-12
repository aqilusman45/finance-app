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
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "yup";
import { addAccount } from "../../store/reducers/accounts";
import { accountSchema } from "../../helpers/validations";
import * as JsSearch from "js-search";
import OpenAccountView from "../OpenAccountView/OpenAccountView";
import { IAccount } from "../../lib/accounts";
import "./UserSearchModel.css";
const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  description: "",
  accountNumber: "",
  accountTitle: "",
  address: "",
  companyName: "",
  balance: "0",
  accountType: {
    value: "",
    label: "",
  },
};
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
  userData: any;
  setUserData: any;
  updateUserDetail?: any;
}

const UserSearchModel: React.FC<ISearchUserModelProps> = ({
  setShowModal,
  showModal,
  accounts,
  userData,
  setUserData,
  updateUserDetail,
}) => {
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });
  const [errors, setErrors] = useState<ValidationError | undefined>();

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormFields((prevField) => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const submit = async () => {
    const account = {
      ...formFields,
      balance: parseInt(formFields.balance),
      uid: uuidv4(),
      enabled: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await accountSchema.validate(account);
      await accountTypeCheck(account);
      dispatch(
        addAccount(account as any, () => {
          setSegment("search");
        })
      );
    } catch (error) {
      setErrors(error);
    }
  };
  const [segment, setSegment] = useState<string>("search");
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
    search.search(input);
    setUserData(search.search(input));
  };

  // js-search code end here
  return (
    <IonModal isOpen={showModal}>
      <IonPage>
        <IonContent>
          <IonSegment
            color="tertiary"
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value!)}
          >
            <IonSegmentButton value="search">
              <IonLabel>Search</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="addNew">
              <IonLabel>Add New</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {segment === "search" ? (
            <>
              <IonSearchbar
                onIonChange={(e) => searchedUser(e.detail.value!)}
              />
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
                            updateUserDetail(user);
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
            </>
          ) : (
            <OpenAccountView
              errors={errors}
              handleChange={handleChange}
              setErrors={setErrors}
              state={formFields}
              submit={submit}
            />
          )}
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>Cancel</IonButton>
      </IonPage>
    </IonModal>
  );
};
export default UserSearchModel;
