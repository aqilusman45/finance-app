import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
  IonButton,
  IonLoading
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import EntriesViewModel from "../EntriesView/EntriesViewModel";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchEntries } from "../../store/reducers/entries";
import "./ManageEntries.css";
import { convertDate } from "../../utils/dateConversion";
const keys = [
  "Name",
  "Phone",
  "Date",
  "Amount",
  "Remaining",
];

const ManageEntries = () => {
  const { push } = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState<any>();
  const dispatch = useDispatch();
  const {isLoading, entries } = useSelector((state: RootState) => {
    return state.entries;
  });

  useEffect(() => {
    if (!entries) {
      dispatch(fetchEntries());
    }
  }, [entries, dispatch]);

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
        <IonLoading isOpen={isLoading} message={"Please wait..."} />
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
                    {entries.map((entry: any, index) => {
                      const lastEntry = entry.entries[entry.entries.length - 1];

                      const objValues = {
                        customerName: entry.customerName,
                        phone: entry.phone,
                        date: convertDate(entry.date),
                        payableAmount: lastEntry.payableAmount,
                        receivableAmount: lastEntry.remainingAmount,
                      };
                      return (
                        <tr
                          key={index}
                          className="table-row-hover"
                          // onClick={() => {
                          //   setAccount(() =>
                          //   entries.find(
                          //       (account) =>
                          //         account.invoiceID === entry.invoiceID
                          //     )
                          //   );
                          //   setShowModal(!showModal);
                          // }}
                        >
                          <td>{index + 1}</td>

                          {Object.values(objValues).map((item, index) => {
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

export default ManageEntries;
