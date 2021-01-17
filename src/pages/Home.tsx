import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonSplitPane,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonList,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { Link, match, Route, Switch } from "react-router-dom";
import { nonMenuRoutes, routes } from "../constants/routes";
import React from "react";

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
                        <Link key={link} to={`${match.url}${link}`}>
                          <IonItem>
                            {text}
                          </IonItem>
                        </Link>
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
                <Link to="/">
                  <IonButton
                    fill="solid"
                    size="large"
                    color="primary"
                  >
                    Log out
                  </IonButton>
                </Link>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Switch>
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
            </Switch>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonContent>
  );
};

export default Home;
