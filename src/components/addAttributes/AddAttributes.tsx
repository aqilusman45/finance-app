import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { trashBin } from "ionicons/icons";
import Badge from "react-bootstrap/Badge";
import { slugify } from "../../utils/slugify";
import { insertAttribute } from "../../store/reducers/attributes";
import { AttributeType } from "../../lib/enum";
import { IAttributeDocument } from "../../lib/attributes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { v4 as uuidv4 } from "uuid";

interface IAttribute {
  label: string;
  value: string;
}

const AddAttributes: React.FC = () => {
  const [options, setOpions] = useState<IAttribute[]>([]);
  const [attrType, setType] = useState<AttributeType>(AttributeType.CHECKBOXES);
  const [attrName, setName] = useState<string>("");
  const [optionLabel, setLabel] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => {
    return state.attributes;
  });

  const addOption = (option: string) => {
    setLabel("");
    if (!options.some(({ label }) => label.toLowerCase() === option)) {
      setOpions((prevOptions) => {
        prevOptions.push({
          label: option,
          value: slugify(option),
        });
        return [...prevOptions];
      });
    }
  };

  const removeOption = (optValue: string) => {
    setOpions((prevOptions) => {
      const opts = prevOptions.filter(({ value }) => value !== optValue);
      return [...opts];
    });
  };

  const submitAttribute = () => {
    const attr = {
      uid: uuidv4(),
      attributeName: attrName,
      attributeType: attrType,
      options,
      required,
    };
    dispatch(insertAttribute(attr as IAttributeDocument));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <IonContent>
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-between">
          <IonCol size="6">
            <IonItem className="ion-margin">
              <IonLabel>Attribute Type</IonLabel>
              <IonSelect
                onIonChange={(e) => {
                  setType(e.detail.value);
                }}
                value={attrType}
                placeholder="Select One"
              >
                <IonSelectOption value={AttributeType.RADIO}>
                  Radio ( single option )
                </IonSelectOption>
                <IonSelectOption value={AttributeType.CHECKBOXES}>
                  Checkboxes ( multiple options )
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="stacked">Attribute Name</IonLabel>
              <IonInput
                value={attrName}
                onIonChange={(e) => {
                  setName(e.detail.value || "");
                }}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="fixed">Reqiured</IonLabel>
              <IonToggle
                checked={required}
                onIonChange={() => {
                  setRequired(!required);
                }}
              />
            </IonItem>
            <IonItem className="ion-margin">
              <IonLabel position="fixed">Options</IonLabel>
              <IonInput
                value={optionLabel}
                onIonChange={(e) => {
                  setLabel(e.detail.value || "");
                }}
              />
              <IonButton
                onClick={() => addOption(optionLabel)}
                disabled={optionLabel === ""}
                className="ion-margin"
              >
                Add Option
              </IonButton>
            </IonItem>
            {options.map(({ label, value }) => (
              <Badge
                key={value}
                className="ion-margin"
                style={{
                  fontSize: 18,
                  padding: "10px 10px",
                }}
                variant="dark"
              >
                {label}
                <IonIcon
                  style={{
                    margin: "0 0px 0 10px",
                    fontSize: 10,
                  }}
                  onClick={() => removeOption(value)}
                  icon={trashBin}
                />
              </Badge>
            ))}
            <IonContent>
              <IonButton
                onClick={() => {
                  submitAttribute();
                }}
                disabled={!attrName || !attrType || !options.length}
                className="ion-margin"
              >
                Add Attribute
              </IonButton>
            </IonContent>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddAttributes;
