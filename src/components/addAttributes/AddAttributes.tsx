import React from 'react'
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
} from "@ionic/react";
const AddAttributes: React.FC = () => {
    return (
        <IonContent>
            <IonGrid className="ion-padding">
                <IonRow className="ion-justify-content-between">
                    <IonCol size="3">

                    </IonCol>
                    <IonCol size="6">
                        <IonItem className="ion-margin">
                            <IonLabel position="stacked">Attribute Name</IonLabel>
                            <IonInput> </IonInput>
                        </IonItem>
                        <IonItem className="ion-margin">
                            <IonLabel>Attribute Type</IonLabel>
                            <IonSelect multiple={true} placeholder="Select One">
                                <IonSelectOption value="radio">Radio</IonSelectOption>
                                <IonSelectOption value="checkbox">Check</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className="ion-margin">
                            <IonLabel>List of Options</IonLabel>
                            <IonSelect multiple={true} placeholder="Select One">
                                <IonSelectOption value="option 1">option 1</IonSelectOption>
                                <IonSelectOption value="option 2">option 2</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonContent className="ion-text-center">

                            <IonButton className="ion-margin">Add Attribute</IonButton>
                        </IonContent>
                    </IonCol>
                    <IonCol size="3">

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default AddAttributes
