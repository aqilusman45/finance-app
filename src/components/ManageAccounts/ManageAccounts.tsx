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

const headers = ["name", "phone", "email", "accountTitle", "accountType"];

const ManageAccounts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState<IAccount | undefined>();
  const dispatch = useDispatch();
  const { isLoading, accounts } = useSelector((state: RootState) => {
    return state.accounts;
  });
console.log("account", account);

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
              <IonSearchbar showCancelButton="focus" debounce={1000} />
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
                      {accounts.map((account: IAccount, index: any) => (
                        <tr
                          className="table-row-hover"
                          onClick={() => {
                            setAccount(() =>
                              accounts.find((acc) => acc.uid === account.uid)
                              
                              
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
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageAccounts;
