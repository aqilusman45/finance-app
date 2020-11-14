import React from "react";
import { IAttribute } from "../../lib/attributes";
import {
  IonModal,
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton
} from "@ionic/react";
import {
  checkbox,
  radio,
  options as optionsIcon,
  checkmark,
} from "ionicons/icons";
import { AttributeType } from "../../lib/enum";
import Badge from "react-bootstrap/Badge";




interface IAttributeModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  attribute?: IAttribute;
}

export const AttributeModal: React.FC<IAttributeModalProps> = ({
  setShowModal,
  showModal,
  attribute
}) => {

  if (!attribute) return null

  const {
    attributeName: { name },
    attributeType,
    options,
    required,
    uid
  } = attribute;
  
  return (
    
    <IonModal isOpen={showModal} cssClass="my-custom-class">
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonIcon
                  icon={
                    attributeType === AttributeType.CHECKBOXES
                      ? checkbox
                      : radio
                  }
                  slot="start"
                />
                <IonLabel>{attributeType}</IonLabel>
                {/* <IonButton fill="outline" slot="end" routerLink="../EditProduct/EditProduct.tsx"> */}
                <IonButton fill="outline" slot="end" routerLink={`/home/edit-attribute/${uid}`}>
                  
                        Edit
                </IonButton>
              </IonItem>
              <IonItem>
                <IonIcon icon={optionsIcon} slot="start" />
                <IonLabel>Options</IonLabel>
              </IonItem>
              {options.map(({ label }) => (
                <Badge
                  style={{
                    fontSize: 18,
                    padding: "10px 10px",
                  }}
                  key={label}
                  variant="dark"
                  className="ion-margin"
                >
                  {label}
                </Badge>
              ))}
              <IonItem>
                <IonIcon icon={checkmark} slot="start" />
                <IonLabel>{required ? "Required" : "Not Required"}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>
          Close Modal
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default AttributeModal;
