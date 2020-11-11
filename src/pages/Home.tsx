import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonSplitPane,
  IonRouterOutlet,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonList,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { match, Route } from "react-router-dom";
import { routes,nonMenuRoutes } from "../constants/routes";

import React from "react";

console.log(routes);
const Home: React.FC<{
  match: match;
  location: {
    pathname: string;
  };
}> = ({ match, location }) => {
  return (
    <IonContent>
      <IonSplitPane when="lg" contentId="main">
        <IonMenu side="start" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Finance App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {routes.map(({ menuItem, subMenuLinks }) => {
                return (
                  <div key={menuItem}>
                    <IonItemDivider>
                      <IonLabel
                        style={{
                          fontSize: 22,
                        }}
                      >
                        {menuItem}
                      </IonLabel>
                    </IonItemDivider>
                    {subMenuLinks.map(({ text, link }) => {
                      return (
                        <IonItem routerLink={`${match.url}${link}`} key={link}>
                          {text}
                        </IonItem>
                      );
                    })}
                      
                  </div>
                );
              })}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {location.pathname
                  .replace(/[^\w\s]/gi, " ")
                  .replace("home", "")
                  .toUpperCase()}
              </IonTitle>
              <IonButtons slot="primary">
                <IonButton
                  routerLink="/"
                  fill="solid"
                  size="large"
                  color="primary"
                >
                  Log out
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonRouterOutlet>
              {routes.map(({ subMenuLinks }) =>
                subMenuLinks.map(({ component, link }) => {
                  return (
                    <Route
                      key={link}
                      exact
                      path={`${match.url}${link}`}
                      component={component}
                    />
                  );
                })
              )}
              {nonMenuRoutes.map(({ component, link }) => {
                  return (
                    <Route
                      key={link}
                      exact
                      path={`${match.url}${link}`}
                      component={component}
                    />
                  );
               })}
            </IonRouterOutlet>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonContent>
  );
};

export default Home;
