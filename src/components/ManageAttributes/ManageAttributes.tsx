import React, { useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAttributes } from "../../store/reducers/attributes";
import { IAttribute } from "../../lib/attributes";

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
          {isLoading ? (
            <p>Loading...</p>
          ) : attributes && attributes.length ? (
            <>
              <IonRow>
                <IonCol size="12">
                  <Table striped hover variant="dark" responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        {Object.keys(attributes[0]).map((heading) => {
                          return <th key={heading}>{heading.toUpperCase()}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {attributes.map((attribute: IAttribute, index: any) => (
                        <tr key={attribute.uid}>
                          <td>{index}</td>
                          {Object.values(attribute).map((value) => (
                            <td key={`${value}`}>{`${value}`}</td>
                          ))}
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
