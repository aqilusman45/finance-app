import React from 'react'
import './UpdateProduct.css'
import NewIonMenu from '../IonMenu/NewIonMenu'
import img from './../images/moble.jpeg'
import './../GlobalCss.css'

import { IonGrid, IonRow, IonCol, IonContent, IonItem, IonLabel, IonInput, IonImg, } from '@ionic/react';

const UpdateProduct = () => {
    return (
        <>

            <IonContent className="ion-padding">
                <IonGrid className="">
                    <IonRow>
                        <IonCol size="1"></IonCol>

                        <form className="displayContent">

                            <IonCol size="3">
                                <IonItem className="InutField">
                                    <IonLabel position="stacked">Product Name *</IonLabel>
                                    <IonInput type="text" required placeholder="Name"> </IonInput>
                                </IonItem>
                                <IonItem className="InutField">
                                    <IonLabel position="stacked">Cost Price *</IonLabel>
                                    <IonInput type="number" required placeholder="100"> </IonInput>
                                </IonItem>
                                <IonItem className="InutField">
                                    <IonLabel position="stacked">List Price *</IonLabel>
                                    <IonInput type="number" required placeholder="200"> </IonInput>
                                </IonItem>
                                <IonItem className="InutField">
                                    <IonLabel position="stacked">Quantity *</IonLabel>
                                    <IonInput type="number" required placeholder="100"> </IonInput>
                                </IonItem>

                            </IonCol>
                            <IonCol size="3">
                                <IonItem className="InutField">
                                    <IonLabel position="stacked">Discription</IonLabel>
                                    <IonInput type="text" required placeholder="(Variant Specs)"> </IonInput>
                                </IonItem>
                                <div className="InutField">
                                    <select required name="cars" className="selectBox">
                                        <option value="volvo">volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                    <button className="globalBtn">Add new Brand</button>
                                    {/* <IonButton color="success"></IonButton> */}
                                </div>
                                <div className="InutField">

                                    <select required name="cars" className="selectBox">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                    <button className="globalBtn">Add new Category</button>

                                </div>
                            </IonCol>
                            <IonCol size="4" className="InutField">

                                <input type="file" />

                                <div className="borderDiv">

                                    {/* <img src={img}/> */}
                                    <IonImg className="imgSize" src={img} />
                                </div>
                                <div className="ion-text-end">

                                <button className="globalBtn">Save Product</button>
                                </div>

                            </IonCol>
                            <IonCol size="1">

                            </IonCol>


                        </form>
                    </IonRow>


                </IonGrid>
            </IonContent>
        </>
    )
}

export default UpdateProduct
