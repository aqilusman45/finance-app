import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
  IonButton,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import EntriesViewModel from "../EntriesView/EntriesViewModel";
import { useHistory } from "react-router";
import "./SearchEntry.css";
const INITIAL_STATE = {
  invoiceID: 23,
  productID: 1,
  name: "Ali",
  phone: "032334344443",
  amount: 3000,
  remainingAmount: 23,
};
const INITIAL_STATE1 = {
  invoiceID: 50,
  productID: 1,
  name: "Ahmed",
  phone: "032334344567",
  amount: 3000,
  remainingAmount: 23,
};
const keys = [
  "Invoice ID",
  "product ID",
  "Name",
  "Phone",
  "Payment",
  "Remaining",
];

const SearchEnteryView = () => {
  const { push } = useHistory();

  const [entries] = useState([
    { ...INITIAL_STATE },
    { ...INITIAL_STATE1 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState<any>();

  return (
    <IonContent>
      <EntriesViewModel
        showModel={showModal}
        setShowModel={setShowModal}
        account={account}
      />
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="10">
            <IonSearchbar
              onIonChange={(e) => console.log(e.detail.value!)}
              showCancelButton="focus"
              debounce={1000}
            />
          </IonCol>
          <IonCol size="2">
            <IonButton
              onClick={() => push("/home/add-entry")}
              className="btnStyle"
              color="primary"
            >
              Add Entry
            </IonButton>
          </IonCol>
        </IonRow>
        {/* <IonLoading isOpen={isLoading} message={"Please wait..."} /> */}
        {!!entries?.length ? (
          <>
            <IonRow>
              <IonCol size="12">
                <Table striped hover variant="dark" responsive="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      {keys.map((heading) => {
                        return <th key={heading}>{heading.toUpperCase()}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => {
                      return (
                        <tr
                          key={index}
                          className="table-row-hover"
                          onClick={() => {
                            setAccount(() =>
                              entries.find(
                                (account) =>
                                  account.invoiceID === entry.invoiceID
                              )
                            );
                            setShowModal(!showModal);
                          }}
                        >
                          <td>{index + 1}</td>

                          {Object.values(entry).map((item, index) => {
                            return <td key={index}>{item}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <p>No Entry found</p>
        )}
      </IonGrid>
    </IonContent>
  );
};

export default SearchEnteryView;
