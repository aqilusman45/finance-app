import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
  IonButton,
} from "@ionic/react";
import InoviceViewModel from "./../InvoiceViewModel/InoviceViewModel";

import { IEditInvoice } from "./../../lib/editInvoice";
  const invoice1 = {
    name: "Hamza",
    phone: "453480593045",
    invoideID: "234",
    total: 1000,
    discount: 5,
    tax: 10
    
  }
  const invoice2 = {
    name: "Ali",
    phone: "05893059",
    invoideID: "089",
    total: 3000,
    discount: 10,
    tax: 14

  }

const SearchInvoice: React.FC = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [invoices] = useState<IEditInvoice[] | null>([{...invoice1}, {...invoice2}])
  return (
    <IonContent>
      <InoviceViewModel invoices={invoices} showModel={showModel} setShowModel={setShowModel} />
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonSearchbar showCancelButton="focus" debounce={1000} />

          </IonCol>
          <IonCol>
              <IonButton onClick={() => setShowModel(!showModel)}>

              </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default SearchInvoice;
