import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import EntriesViewModel from "./../EntriesView/EntriesViewModel";
const INITIAL_STATE = {
  invoiceID: 23,
  productID: 1,
  name:"Ali",
  amount: 3000,
  remainingAmount: 23,
};
const INITIAL_STATE1 = {
    invoiceID: 50,
    productID: 1,
    name:"Ahmed",
    amount: 3000,
    remainingAmount: 23,
  };
const keys = ["Invoice ID", "product ID", "Name", "Payment", "Remaining"];

const SearchEntery = () => {
  const [entries, setEntries] = useState([{ ...INITIAL_STATE},{...INITIAL_STATE1}]);
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState<any>()

  return (
    <IonContent>
        <EntriesViewModel
            showModel={showModal}
            setShowModel={setShowModal}
            account={account}
        />
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="12">
            <IonSearchbar
              onIonChange={(e) => console.log(e.detail.value!)}
              showCancelButton="focus"
              debounce={1000}
            />
          </IonCol>
        </IonRow>
        {/* <IonLoading isOpen={isLoading} message={"Please wait..."} /> */}
        {!!entries?.length ? (
          <>
            <IonRow>
              <IonCol size="12">
                <Table striped hover variant="dark" responsive="sm">
                  <thead>
                    <tr
                         
                    >
                      <th>#</th>
                      {keys.map((heading) => {
                        return <th key={heading}>{heading.toUpperCase()}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => {
                      return (
                        <tr key={index}   className="table-row-hover"
                        onClick={() => {
                            setAccount(() => entries.find((account) => account.invoiceID === entry.invoiceID) )
                          setShowModal(!showModal);
                        }}>
                           <td>{index + 1}</td>
                         {/*} <td>{entry.invoiceID}</td>
                          <td>{entry.productID}</td>
                          <td>{entry.name}</td>
                          <td>{entry.amount}</td>
                          <td>{entry.remainingAmount}</td> */}
                            {
                                Object.values(entry).map((item, index) => {
                                   return (
                                    <td key={index}>{item}</td>
                                   )
                                })
                            }
                          
                     
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

export default SearchEntery;
