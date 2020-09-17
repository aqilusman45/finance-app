import React from 'react'
import './AddProduct.css'
import NewIonMenu from './../IonMenu/NewIonMenu'
import { IonGrid, IonRow, IonCol, IonContent, IonItem, IonLabel, IonInput } from '@ionic/react';

const AddProduct = () => {
    return (
        <>

            <IonContent className="ion-text-center ion-padding">
                <NewIonMenu/>
                <IonGrid>
                    <IonRow>
                    <IonCol>ion-col</IonCol>
                        <form className="displayContent">
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Product Name *</IonLabel>
                                    <IonInput type="text" required placeholder="Name"> </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Cost Price *</IonLabel>
                                    <IonInput type="number" required placeholder="100"> </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">List Price *</IonLabel>
                                    <IonInput type="number" required placeholder="200"> </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Quantity *</IonLabel>
                                    <IonInput type="number" required placeholder="100"> </IonInput>
                                </IonItem>

                            </IonCol>
                            <IonCol>
                            <IonItem>
                                    <IonLabel position="stacked">Discription</IonLabel>
                                    <IonInput type="text" required placeholder="(Variant Specs)"> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>ion-col</IonCol>
                        </form>
                    </IonRow>


                </IonGrid>
            </IonContent>
        </>
    )
}

export default AddProduct
