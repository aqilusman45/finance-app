import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonMenuToggle,
} from '@ionic/react';


const NewIonMenu = () => {
  return (
    <>

      <IonMenu side='start' contentId='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>

          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink='/addInventory'>inventory</IonItem>

            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink='/myads'>point of sale</IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
              >
                sale reports
      </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  )
}

export default NewIonMenu