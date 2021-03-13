import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { IonApp, IonLoading } from "@ionic/react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Activate from "./pages/Activate";
import { useActivationStatus } from "./hooks/activation";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [status, isLoading] = useActivationStatus();
  const { push } = useHistory();

  useEffect(() => {
    if (!status) {
      push("/");
    } else {
      push("/sign-in");
    }
  }, [status, push]);

  if (isLoading) {
    return <IonLoading isOpen={isLoading} message={"Please wait..."} />;
  }
  return (
    <IonApp>
      <Route path="/" exact component={Activate} />
      <Route path="/home" component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
    </IonApp>
  );
};

export default App;
