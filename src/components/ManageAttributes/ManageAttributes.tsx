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
import { fetchAttributes } from "../../store/reducers/attributes";
import { IAttribute } from "../../lib/attributes";
import Badge from "react-bootstrap/Badge";
import "./ManageAttributes.css";
import AttributeModal from "../ViewAttribute/ViewAttribute";
import PaginationView from "../Pagination/Pagination";
import { serialNumber } from "../../utils/utilities";
import * as JsSearch from "js-search";

const headers = ["attributeName", "attributeType", "required", "options"];

const ManageAttributes: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [attribute, setAttribute] = useState<IAttribute | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAttributes, setFilteredAttributes] = useState<any>();
  const dispatch = useDispatch();
  const { isLoading, attributes } = useSelector((state: RootState) => {
    return state.attributes;
  });

  // pagination code start here

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attributes?.slice(indexOfFirstItem, indexOfLastItem);
  // pagination code end here

  // js-search code start here
  var search = new JsSearch.Search("uid");
  search.addIndex(["attributeName", "name"]);

  if (attributes) {
    search.addDocuments(attributes);
  }

  const searcheAttributes = (input: any) => {
    setFilteredAttributes(search.search(input));
  };

  // js-search code end here

  useEffect(() => {
    if (!attributes) {
      dispatch(fetchAttributes());
    }
  }, [attributes, dispatch]);

  return (
    <>
      <IonContent>
        <AttributeModal
          attribute={attribute}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                onIonChange={(e) => searcheAttributes(e.detail.value!)}
                showCancelButton="focus"
                debounce={1000}
              />
            </IonCol>
          </IonRow>
          <IonLoading isOpen={isLoading} message={"Please wait..."} />
          {!!attributes?.length ? (
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
                      {filteredAttributes?.length
                        ? filteredAttributes?.map(
                            (attribute: IAttribute) => (
                              <tr
                                className="table-row-hover"
                                onClick={() => {
                                  setAttribute(() =>
                                    attributes.find(
                                      (attr) => attr.uid === attribute.uid
                                    )
                                  );
                                  setShowModal(!showModal);
                                }}
                                key={attribute.uid}
                              >
                                <td>{serialNumber(attributes, attribute.uid)}</td>
                                {Object.keys(attribute).map((key) => {
                                  // @ts-ignore
                                  const attributeKey = attribute[key];
                                  if (headers.includes(key)) {
                                    if (typeof attributeKey !== "object") {
                                      return (
                                        <td
                                          key={`${attributeKey}`}
                                        >{`${attributeKey}`}</td>
                                      );
                                    } else if (Array.isArray(attributeKey)) {
                                      return (
                                        <td key={attributeKey[0]}>
                                          {attributeKey.map(
                                            ({ label }, idx) => {
                                              if (idx < 2) {
                                                return (
                                                  <Badge
                                                    key={label}
                                                    style={{
                                                      fontSize: 10,
                                                      padding: "10px 10px",
                                                      margin:
                                                        idx === 0
                                                          ? "0"
                                                          : "0 10px",
                                                    }}
                                                    variant="dark"
                                                  >
                                                    {label}
                                                  </Badge>
                                                );
                                              }
                                              return null;
                                            }
                                          )}
                                        </td>
                                      );
                                    } else {
                                      return (
                                        <td
                                          key={`${attributeKey.name}`}
                                        >{`${attributeKey.name}`}</td>
                                      );
                                    }
                                  }
                                  return null;
                                })}
                              </tr>
                            )
                          )
                        : currentItems?.map(
                            (attribute: IAttribute) => (
                              <tr
                                className="table-row-hover"
                                onClick={() => {
                                  setAttribute(() =>
                                    attributes.find(
                                      (attr) => attr.uid === attribute.uid
                                    )
                                  );
                                  setShowModal(!showModal);
                                }}
                                key={attribute.uid}
                              >
                                <td>{serialNumber(attributes, attribute.uid)}</td>
                                {Object.keys(attribute).map((key) => {
                                  // @ts-ignore
                                  const attributeKey = attribute[key];
                                  if (headers.includes(key)) {
                                    if (typeof attributeKey !== "object") {
                                      return (
                                        <td
                                          key={`${attributeKey}`}
                                        >{`${attributeKey}`}</td>
                                      );
                                    } else if (Array.isArray(attributeKey)) {
                                      return (
                                        <td key={attributeKey[0]}>
                                          {attributeKey.map(
                                            ({ label }, idx) => {
                                              if (idx < 2) {
                                                return (
                                                  <Badge
                                                    key={label}
                                                    style={{
                                                      fontSize: 10,
                                                      padding: "10px 10px",
                                                      margin:
                                                        idx === 0
                                                          ? "0"
                                                          : "0 10px",
                                                    }}
                                                    variant="dark"
                                                  >
                                                    {label}
                                                  </Badge>
                                                );
                                              }
                                              return null;
                                            }
                                          )}
                                        </td>
                                      );
                                    } else {
                                      return (
                                        <td
                                          key={`${attributeKey.name}`}
                                        >{`${attributeKey.name}`}</td>
                                      );
                                    }
                                  }
                                  return null;
                                })}
                              </tr>
                            )
                          )}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <p>No attributes found</p>
          )}

          {filteredAttributes?.length ? (
            ""
          ) : (
            <PaginationView
              setCurrentPage={setCurrentPage}
              data={attributes}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          )}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageAttributes;
