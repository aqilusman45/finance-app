import React from "react";
import "./ManageProducts.css";
import img from "./../../Images/moble.jpeg";

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSearchbar,
  IonImg,
} from "@ionic/react";
const ManageProduct = (Props: any) => {
  return (
    <>
      <IonContent>
        <IonGrid className="updatebgDark">
          <IonRow>
            <IonCol className="displayFlex ion-justify-content-center customMargin">
              <IonButton className="CustomBtn updateBtn" color="light">
                Update
              </IonButton>
              <IonButton className="CustomBtn deleteBtn" color="light">
                Delete
              </IonButton>
              <IonSearchbar
                className="searchBarWidth"
                showCancelButton="focus"
                debounce={1000}
              ></IonSearchbar>
              {/* <button className="globalBtn">Clear</button> */}
              <IonButton className="ion-margin">Clear</IonButton>
              {/* <IonButton className="CustomBtn " color="light">Delete</IonButton> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2">
              <div className="updateborderDiv">
                {/* <img src={img}/> */}
                <IonImg className="UpdateimgSize" src={img} />
              </div>
            </IonCol>
            <IonCol size="10" className="manageDataTable">
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>UpdatedOn</th>
                    <th>Discription</th>
                    <th>Brand Name</th>
                    <th>Company Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Redmi 9C</td>
                    <td>10,000</td>
                    <td>9,000</td>
                    <td>1</td>
                    <td>August</td>
                    <td>Red Color</td>
                    <td>RedMi</td>
                    <td>RedMi</td>
                  </tr>
                </tbody>
              </table>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default ManageProduct;
