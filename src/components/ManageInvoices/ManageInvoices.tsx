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
import * as JsSearch from "js-search";
import PaginationView from "../Pagination/Pagination";
const keys = ["Invoice ID", "Name", "Phone", "Discount", "Tax", "Total"];

const ManageInvoices: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTill, setDateTill] = useState<any>();
  const [invoice, setInvoice] = useState<IInvoice | null>();
  const [payment, setPayment] = useState<string>("all");
  const [filteredInvoices, setFilteredInvoices] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { isLoading, invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });

  // pagination code start here

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices?.slice(indexOfFirstItem, indexOfLastItem);

  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("uid");
  search.addIndex("invoiceNumber");
  search.addIndex(["detail", "phone"]);
  search.addIndex(["detail", "name"]);
  search.addIndex(["paymentOption", "label"]);
  if (invoices) {
    search.addDocuments(invoices);
  }

  const searchedInvoice = (input: any) => {
    search.search(input);
    setFilteredInvoices(search.search(input));
  };

  // js-search code end here

  useEffect(() => {
    if (invoices) {
      const convertFrom = Number(new Date(dateFrom?.toString()));
      const convertTill = Number(new Date(dateTill?.toString()));
      const filter = invoices.filter((inv) => {
        return inv.updatedAt > convertFrom && inv.updatedAt < convertTill;
      });
      setFilteredInvoices(filter);
    }
  }, [dateFrom, dateTill, invoices]);

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
              <IonSearchbar
                onIonChange={(e) => searchedInvoice(e.detail.value!)}
                showCancelButton="focus"
                debounce={1000}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin">
            <IonCol size="6">
              <input
                className="dateInputStyle shadow-sm"
                type="date"
                name="dateFrom"
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <span className="dateFilterSpan">To</span>
              <input
                className="dateInputStyle shadow-sm"
                type="date"
                name="dateTill"
                onChange={(e) => setDateTill(e.target.value)}
              />
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>PAYMENT</IonLabel>
                <IonSelect
                  value={payment}
                  onIonChange={(e) => {
                    setPayment(e.detail.value);
                    searchedInvoice(e.detail.value!);
                  }}
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  <IonSelectOption value="bank">Bank</IonSelectOption>
                  <IonSelectOption value="cash">CASH</IonSelectOption>
                  <IonSelectOption value="cheque">CHEQUE</IonSelectOption>
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
                      {filteredInvoices?.length
                        ? filteredInvoices.map(
                            (invoice: any, index: number) => {
                              const data = {
                                uid: invoice.uid,
                                invoiceNumber: invoice.invoiceNumber,
                                phone: invoice.detail.phone,
                                name: invoice.detail.name,
                                totalDiscount: invoice.totalDiscount,
                                taxRate: invoice.taxRate,
                                total: invoice.total,
                              };

                              return (
                                <tr
                                  key={data.uid}
                                  className="table-row-hover"
                                  onClick={() => {
                                    setInvoice(() =>
                                      filteredInvoices.find(
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
                            }
                          )
                        : currentItems?.map((invoice: any, index: number) => {
                            const data = {
                              uid: invoice.uid,
                              invoiceNumber: invoice.invoiceNumber,
                              phone: invoice.detail.phone,
                              name: invoice.detail.name,
                              totalDiscount: invoice.totalDiscount,
                              taxRate: invoice.taxRate,
                              total: invoice.total,
                            };

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

          {filteredInvoices?.length ? (
            ""
          ) : (
            <PaginationView
              itemsPerPage={itemsPerPage}
              data={invoices}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ManageInvoices;
