import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonLoading,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import Badge from "react-bootstrap/Badge";
import AccountModal from "../ViewAccount/ViewAccount";
import { fetchAccounts } from "../../store/reducers/accounts";
import { IAccount } from "../../lib/accounts";
import PaginationView from "../Pagination/Pagination";
import * as JsSearch from "js-search";

const headers = ["name", "phone", "email", "accountTitle", "accountType"];

const ManageAccounts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState<any>();
  const [account, setAccount] = useState<IAccount | undefined>();
  const dispatch = useDispatch();
  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
  
  // pagination code start here

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accounts?.slice(indexOfFirstItem, indexOfLastItem);

  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("uid");
  search.addIndex("name");
  search.addIndex("phone");
  search.addIndex("email");

  if (accounts) {
    search.addDocuments(accounts);
  }

  const searchAccount = (input: any) => {
    search.search(input);
    setFilteredAccounts(search.search(input));
  };

  // js-search code end here

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [accounts, dispatch]);

  return (
    <>
      <IonContent>
        <AccountModal
          setShowModal={setShowModal}
          showModal={showModal}
          account={account}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                onIonChange={(e) => searchAccount(e.detail.value!)}
                showCancelButton="focus"
                debounce={1000}
              />
            </IonCol>
          </IonRow>
          <IonLoading isOpen={isLoading} message={"Please wait..."} />
          {!!accounts?.length ? (
            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        {headers.map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts?.length
                        ? filteredAccounts?.map(
                            (account: IAccount, index: any) => (
                              <tr
                                className="table-row-hover"
                                onClick={() => {
                                  setAccount(() =>
                                    accounts.find(
                                      (acc) => acc.uid === account.uid
                                    )
                                  );
                                  setShowModal(!showModal);
                                }}
                                key={account.uid}
                              >
                                <td>{index + 1}</td>
                                {Object.keys(account).map((key) => {
                                  // @ts-ignore
                                  const accountKey = account[key];

                                  if (headers.includes(key)) {
                                    if (typeof accountKey !== "object") {
                                      return (
                                        <td
                                          key={`${accountKey}`}
                                        >{`${accountKey}`}</td>
                                      );
                                    } else {
                                      const { label } = accountKey;

                                      return (
                                        <td key={accountKey}>
                                          <Badge
                                            key={label}
                                            style={{
                                              fontSize: 10,
                                              padding: "10px 10px",
                                            }}
                                            variant="dark"
                                          >
                                            {label}
                                          </Badge>
                                        </td>
                                      );
                                    }
                                  }
                                  return null;
                                })}
                              </tr>
                            )
                          )
                        : currentItems?.map((account: IAccount, index: any) => (
                            <tr
                              className="table-row-hover"
                              onClick={() => {
                                setAccount(() =>
                                  accounts.find(
                                    (acc) => acc.uid === account.uid
                                  )
                                );
                                setShowModal(!showModal);
                              }}
                              key={account.uid}
                            >
                              <td>{index + 1}</td>
                              {Object.keys(account).map((key) => {
                                // @ts-ignore
                                const accountKey = account[key];

                                if (headers.includes(key)) {
                                  if (typeof accountKey !== "object") {
                                    return (
                                      <td
                                        key={`${accountKey}`}
                                      >{`${accountKey}`}</td>
                                    );
                                  } else {
                                    const { label } = accountKey;

                                    return (
                                      <td key={accountKey}>
                                        <Badge
                                          key={label}
                                          style={{
                                            fontSize: 10,
                                            padding: "10px 10px",
                                          }}
                                          variant="dark"
                                        >
                                          {label}
                                        </Badge>
                                      </td>
                                    );
                                  }
                                }
                                return null;
                              })}
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <p>No accounts found</p>
          )}

          {filteredAccounts?.length ? (
            ""
          ) : (
            <PaginationView
              itemsPerPage={itemsPerPage}
              data={accounts}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageAccounts;
