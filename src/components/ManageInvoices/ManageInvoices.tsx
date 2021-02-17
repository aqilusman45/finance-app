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

const keys = ["Invoice ID", "Name", "Phone", "Discount", "Tax", "Total"];

const ManageInvoices: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<IInvoice | null>();
  const [gender, setGender] = useState<string>("all");
  const [filteredInvoices, setFilteredInvoices] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { isLoading, invoices } = useSelector((state: RootState) => {
    return state.invoices;
  });

  // pagination code start here

  const todosPerPage = 3;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = invoices?.slice(indexOfFirstTodo, indexOfLastTodo);
  const invoicesLength: any = invoices?.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(invoicesLength / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event: any) => {
    setCurrentPage(Number(event));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className="page-item"
        onClick={() => handleClick(number)}
      >
        <a className="page-link">{number}</a>
      </li>
    );
  });

  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("uid");
  search.addIndex("invoiceNumber");
  search.addIndex("uid");

  if (invoices) {
    search.addDocuments(invoices);
  }

  const searchedInvoic = (input: any) => {
    search.search(input);
    setFilteredInvoices(search.search(input));
  };

  // js-search code end here

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
                onIonChange={(e) => searchedInvoic(e.detail.value!)}
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
                        : currentTodos?.map((invoice: any, index: number) => {
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

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={() => handleClick(1)}>
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {renderPageNumbers}
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ManageInvoices;
