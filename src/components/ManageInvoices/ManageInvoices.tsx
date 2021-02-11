import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import InoviceViewModel from "../InvoiceViewModel/InoviceViewModel";
import Table from "react-bootstrap/Table";

import { IEditInvoice } from "../../lib/editInvoice";
const invoice1 = {
  invoiceID: "234",
  userName: "Hamza",
  phone: "453480593045",
  total: 1000,
  discount: 5,
  tax: 10,
};
const invoice2 = {
  invoiceID: "089",
  userName: "Ali",
  phone: "05893059",
  total: 3000,
  discount: 10,
  tax: 14,
};

const keys = ["Invoice ID", "Name", "Phone", "Discount", "Tax", "Total"];

const ManageInvoices: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<IEditInvoice[] | null>();

  const [invoices] = useState<any>([{ ...invoice1 }, { ...invoice2 }]);
  return (
    <IonContent>
      <InoviceViewModel
        invoice={invoice}
        showModel={showModel}
        setShowModel={setShowModel}
      />
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonSearchbar showCancelButton="focus" debounce={1000} />
          </IonCol>
        </IonRow>
        {/* <IonLoading isOpen={isLoading} message={"Please wait..."} /> */}
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
                      return (
                        <tr
                          key={index}
                          className="table-row-hover"
                          onClick={() => {
                            console.log("open model");
                            
                            setInvoice(() =>
                              invoices.find(
                                (account: any) =>
                                  account.invoiceID === invoice.invoiceID
                              )
                            );
                            setShowModel(!showModel);
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{invoice.invoiceID}</td>
                          <td>{invoice.userName}</td>
                          <td>{invoice.phone}</td>
                          <td>{invoice.discount} %</td>
                          <td>{invoice.tax} %</td>
                          <td>{invoice.total}</td>
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
  );
};
export default ManageInvoices;
