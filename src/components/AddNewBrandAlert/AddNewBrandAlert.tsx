import React, { useState } from 'react';
import { IonAlert, IonButton, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const AddNewBrandAlert: React.FC = () => {

    const [showAlert4, setShowAlert4] = useState(false);

    return (
        <IonContent style={{height:"47px;"}}>

            <IonGrid className="ion-no-padding	">
                <IonRow className="ion-justify-content-between">
                    <IonCol style={{display:"flex"}} className="ion-justify-content-center">
                        <IonButton style={{width:"width: 30%;"}} onClick={() => setShowAlert4(true)} expand="block">Add New Brand</IonButton>



                        <IonAlert
                            isOpen={showAlert4}
                            onDidDismiss={() => setShowAlert4(false)}
                            cssClass='my-custom-class'
                            header={'Add New Brand'}
                            inputs={[
                                {
                                    name: 'name1',
                                    type: 'text',
                                    placeholder: 'Add New Brand'
                                }
                            ]}
                            buttons={[
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: () => {
                                        console.log('Confirm Cancel');
                                    }
                                },
                                {
                                    text: 'Add Brand',
                                    handler: () => {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]}
                        />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
}

export default AddNewBrandAlert;
