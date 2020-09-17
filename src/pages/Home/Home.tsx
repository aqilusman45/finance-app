

import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonButton,
  IonMenuToggle,
  IonModal,
} from '@ionic/react';

const HomePage = (props: any) => {
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
      <IonPage id='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot='start' color='primary' />

            <IonTitle>WorkKarr</IonTitle>
            <IonButton routerLink='post' size='small' slot='end'>
              Post
            </IonButton>

          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};
export default HomePage;