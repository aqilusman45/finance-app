import React from "react";
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
import { AttributeType } from "../../lib/enum";

export interface IAttributeInput {
  label: string;
  value: string;
}

interface AddAttributesFormProps {
  state: {
    options: IAttributeInput[];
    attrType: AttributeType;
    attrName: string;
    optionLabel: string;
    required: boolean;
  };
  setType: (val: AttributeType) => void;
  setName: (val: string) => void;
  setRequired: (val: boolean) => void;
  setLabel: (val: string) => void;
  addOption: (val: string) => void;
  removeOption: (val: string) => void;
  submitAttribute: () => void;
}

const AddAttributesForm = ({
  state,
  setType,
  setName,
  setLabel,
  setRequired,
  addOption,
  removeOption,
  submitAttribute,
}: AddAttributesFormProps) => {
  const { attrName, attrType, optionLabel, options, required } = state;
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

export default AddAttributesForm;
