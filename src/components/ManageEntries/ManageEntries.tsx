import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
  IonButton,
  IonLoading,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import EntriesViewModel from "../EntriesView/EntriesViewModel";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchEntries } from "../../store/reducers/entries";
import { fetchAccounts } from "../../store/reducers/accounts";
import "./ManageEntries.css";
import * as JsSearch from "js-search";
import { convertDate } from "../../utils/dateConversion";
import Pagination from "../Pagination/Pagination";

const keys = ["Name", "Phone", "Date", "Amount"];

const ManageEntries = () => {
  const { push } = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [account] = useState<any>();
  const [filteredEntry,] = useState<any>();
  const dispatch = useDispatch();
  const { isLoading, entries } = useSelector((state: RootState) => {
    return state.entries;
  });

  const { accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });

  // pagination code start here

  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entries?.slice(indexOfFirstItem, indexOfLastItem);

  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("name");
  search.addIndex("name");
  search.addIndex("phone");

  if (accounts) {
    search.addDocuments(accounts);
  }

  const searchEntry = (input: any) => {
    // search.search(input);    
    // setFilteredEntry(search.search(input));
  };
  // js-search code end here
  useEffect(() => {
    if (!entries) {
      dispatch(fetchEntries());
    }
  }, [entries, dispatch]);

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

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
              onIonChange={(e) => searchEntry(e.detail.value!)}
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
                  {filteredEntry?.length
                    ? filteredEntry.map((entry: any, index: any) => {

                        const findAccount = accounts?.find(
                          (account) => account.uid === entry.accountRef
                        );
                        const objValues = {
                          name: findAccount?.name,
                          phone: findAccount?.phone,
                          date: convertDate(entry.date),
                          amount: entry.amount,
                        };
                        return (
                          <tr key={index} className="table-row-hover">
                            <td>{index + 1}</td>

                            {Object.values(objValues).map((item, index) => {
                              return <td key={index}>{item}</td>;
                            })}
                          </tr>
                        );
                      })
                    : currentItems?.map((entry: any, index: any) => {
                      console.log();
                      
                        const findAccount = accounts?.find(
                          (account) => account.uid === entry.accountRef
                        );
                        const objValues = {
                          name: findAccount?.name,
                          phone: findAccount?.phone,
                          date: convertDate(entry.date),
                          amount: entry.amount,
                        };
                        return (
                          <tr key={index} className="table-row-hover">
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
        ) : (
          <p>No Entry found</p>
        )}

        {filteredEntry?.length ? (
          ""
        ) : (
          <Pagination
            itemsPerPage={itemsPerPage}
            data={entries}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </IonGrid>
    </IonContent>
  );
};

export default ManageEntries;
