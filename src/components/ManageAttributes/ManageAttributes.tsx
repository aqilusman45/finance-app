import React, { useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButton,
  IonLoading,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAttributes } from "../../store/reducers/attributes";
import { IAttribute } from "../../lib/attributes";

const headers = ["attributeName", "attributeType", "required"];

const ManageAttributes: React.FC = () => {
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
                        <tr key={attribute.uid}>
                          <td>{index + 1}</td>
                          {Object.keys(attribute).map((key) => {
                            if (headers.includes(key)) {
                              console.log(attribute);
                              // @ts-ignore
                              if (typeof attribute[key] !== "object") {
                                return (
                                  <td
                                    // @ts-ignore
                                    key={`${attribute[key]}`}
                                    // @ts-ignore
                                  >{`${attribute[key]}`}</td>
                                );
                              } else {
                                return (
                                  <td
                                    // @ts-ignore
                                    key={`${attribute[key].name}`}
                                    // @ts-ignore
                                  >{`${attribute[key].name}`}</td>
                                );
                              }
                            }
                            return null;
                          })}
                          <td>
                            <IonButton>View</IonButton>
                          </td>
                          <td>
                            <IonButton>Edit</IonButton>
                          </td>
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
