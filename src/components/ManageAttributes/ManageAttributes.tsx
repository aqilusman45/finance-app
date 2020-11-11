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

const headers = ["attributeName", "attributeType", "required", "options"];

const ManageAttributes: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [attribute, setAttribute] = useState<IAttribute | undefined>();
  const dispatch = useDispatch();
  const { isLoading, attributes } = useSelector((state: RootState) => {
    return state.attributes;
  });

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
              <IonSearchbar showCancelButton="focus" debounce={1000} />
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
                      {attributes.map((attribute: IAttribute, index: any) => (
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
                          <td>{index + 1}</td>
                          {Object.keys(attribute).map((key) => {
                            console.log(key);
                            
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
                                  <td key={attributeKey[0].label}>
                                    {attributeKey.map(({ label }, idx) => {
                                      if (idx < 2) {
                                        return (
                                          <Badge
                                            key={label}
                                            style={{
                                              fontSize: 10,
                                              padding: "10px 10px",
                                              margin:
                                                idx === 0 ? "0" : "0 10px",
                                            }}
                                            variant="dark"
                                          >
                                            {label}
                                          </Badge>
                                        );
                                      }
                                      return null;
                                    })}
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
                      ))}
                    </tbody>
                  </Table>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <p>No attributes found</p>
          )}
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageAttributes;
