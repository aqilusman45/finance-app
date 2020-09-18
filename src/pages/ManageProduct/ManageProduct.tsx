import React from 'react'
import './ManageProduct.css'
import img from './../images/moble.jpeg'
import './../GlobalCss.css'

import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonSearchbar, IonImg } from '@ionic/react';
const ManageProduct = (Props: any) => {
    return (
        <>
            <IonContent >
                <IonGrid className="bgDark">
                    <IonRow>
                        <IonCol className="displayFlex ion-justify-content-center customMargin">
                            <IonButton className="CustomBtn" color="light">Update</IonButton>
                            <IonButton className="CustomBtn" color="light">Delete</IonButton>
                            <IonSearchbar className="searchBarWidth" showCancelButton="focus" debounce={1000}></IonSearchbar>
                            <button className="globalBtn">Clear</button>

                        </IonCol>

                    </IonRow>
                    <IonRow>
                        <IonCol size="2">
                            <div className="borderDiv">

                                {/* <img src={img}/> */}
                                <IonImg className="imgSize" src={img} />
                            </div>
                        </IonCol>
                        <IonCol size="10">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>some</th>
                                        <th>some</th>
                                        <th>Quantity</th>
                                        <th>UpdatedOn</th>
                                        <th>Discription</th>
                                        <th>Brand Name</th>
                                        <th>Company Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                    <tr>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                    <tr>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                    <tr>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                    <tr>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                    <tr>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                        <td>Germany</td>

                                    </tr>
                                </tbody>
                            </table>
                        </IonCol>

                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ManageProduct
