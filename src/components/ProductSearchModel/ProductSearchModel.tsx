import React from "react";
import {
  IonModal,
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

interface IProductSearchModelProps {
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
}

const ProductSearchModel: React.FC<IProductSearchModelProps> = ({
  setShowProductModal,
  showProductModal,
}) => {
  return (
    <IonModal isOpen={showProductModal}>
      <IonPage>
        <IonContent>
        <IonSegment
            color="tertiary"
            // value={segment}
            // onIonChange={(e) => setSegment(e.detail.value!)}
          >
            <IonSegmentButton value="search">
              <IonLabel>Search</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="addNew">
              <IonLabel>Add New</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonSearchbar />
        </IonContent>
        <IonButton onClick={() => setShowProductModal(!showProductModal)}>Cancel</IonButton>
      </IonPage>
    </IonModal>
  );
};

export default ProductSearchModel;
