import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
  IonPage,
  IonItem,
  IonLabel,
  IonSelect,
  IonLoading,
  IonSelectOption,
} from "@ionic/react";
import InoviceViewModel from "../InvoiceViewModel/InoviceViewModel";
import Table from "react-bootstrap/Table";
import "./ManageInvoices.css";
import { IInvoice } from "../../lib/invoice";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../store/reducers/invoices";
import { RootState } from "../../store/rootReducer";

const keys = ["Invoice ID", "Name", "Phone", "Discount", "Tax", "Total"];
const ManageInvoices: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<IInvoice | null>();
  const [gender, setGender] = useState<string>("all");

  const dispatch = useDispatch();
  const {isLoading, invoices} = useSelector((state: RootState) => {
    return state.invoices;
  });
  

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchInvoices());
    }
  }, [invoices, dispatch]);
  return (
    <IonPage>
      <IonContent>
        <InoviceViewModel
          invoice={invoice}
          showModel={showModel}
          setShowModel={setShowModel}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar showCancelButton="focus" debounce={1000} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin">
            <IonCol size="6">
              <input
                className="dateInputStyle shadow-sm"
                type="date"
                name="dateFrom"
              />
              <span className="dateFilterSpan">To</span>
              <input
                className="dateInputStyle shadow-sm"
                type="date"
                name="dateTill"
              />
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>PAYMENT</IonLabel>
                <IonSelect
                  value={gender}
                  onIonChange={(e) => setGender(e.detail.value)}
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  <IonSelectOption value="bank">Bank</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonLoading isOpen={isLoading} message={"Please wait..."} />
          {!!invoices?.length ? (
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
                      {invoices.map((invoice: any, index: number) => {                        
                         const data = {
                          uid: invoice.uid,
                          invoiceNumber: invoice.invoiceNumber,
                          name: invoice.detail.name,
                          phone: invoice.detail.phone,
                          totalDiscount: invoice.totalDiscount,
                          taxRate: invoice.taxRate,
                          total: invoice.total,
                         }

                        return (
                          <tr
                            key={data.uid}
                            className="table-row-hover"
                            onClick={() => {
                              setInvoice(() =>
                                invoices.find(
                                  (account: any) =>
                                    account.uid === invoice.uid
                                )
                              );
                              setShowModel(!showModel);
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{data.invoiceNumber}</td>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.totalDiscount} </td>
                            <td>{data.taxRate} </td>
                            <td>{data.total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <p>No Invoice found</p>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ManageInvoices;
