import React, { useState, useEffect } from "react";
import { IProduct } from "../../lib/products";
import {
  IonModal,
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonThumbnail,
  IonImg,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  pricetag,
  cashOutline,
  logoStackoverflow,
  documentTextOutline,
  fingerPrint,
  checkmark,
  close,
} from "ionicons/icons";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import { getProductAttatchments } from "../../utils/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchAttributes } from "../../store/reducers/attributes";

interface IProductModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  product?: IProduct;
}

export const ProductModal: React.FC<IProductModalProps> = ({
  setShowModal,
  showModal,
  product,
}) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  const { isLoading, attributes: attrs } = useSelector((state: RootState) => {
    return state.attributes;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!attrs) {
      dispatch(fetchAttributes());
    }
  }, [attrs, dispatch]);

  useEffect(() => {
    if (product)
      (async () => {
        const images = (await getProductAttatchments(product)).filter(
          ({ base64 }) => base64
        );
        setImages(images as any);
      })();
  }, [product]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  if (!product || isLoading) return null;

  const {
    uid,
    name,
    attributes,
    price,
    cost,
    quantity,
    description,
    enabled,
    sku,
  } = product;

  return (
    <IonModal isOpen={showModal} cssClass="my-custom-class">
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            {!!images.length && (
              <Carousel
                slide={false}
                activeIndex={index}
                onSelect={handleSelect}
              >
                {images.map(({ base64, name }) => (
                  <CarouselItem key={name}>
                    <IonThumbnail
                      key={name}
                      style={{
                        height: "230px",
                        width: "100%",
                      }}
                    >
                      <IonImg alt={name} src={base64} />
                    </IonThumbnail>
                  </CarouselItem>
                ))}
              </Carousel>
            )}
          </IonCard>
          <IonCard>
            <IonItem>
              <IonIcon icon={pricetag} slot="start" />
              <IonLabel>Price: {price}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cashOutline} slot="start" />
              <IonLabel>Cost: {cost}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={logoStackoverflow} slot="start" />
              <IonLabel>Quality: {quantity}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={documentTextOutline} slot="start" />
              <IonLabel>Description: {description}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={fingerPrint} slot="start" />
              <IonLabel>SKU: {sku}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={enabled ? checkmark : close} slot="start" />
              <IonLabel>{enabled ? "Enabled" : "Disabled"}</IonLabel>
            </IonItem>
          </IonCard>
          {attributes.map(({ attributeRef, options }) => {
            const current = attrs?.filter(({ uid }) => attributeRef === uid)[0];
            if (current) {
              return (
                <IonCard key={attributeRef}>
                  <IonItem>{current.attributeName.name}</IonItem>
                  {options.map(({ label }) => {
                    return (
                      <Badge
                        style={{
                          fontSize: 18,
                          padding: "10px 10px",
                        }}
                        key={label}
                        variant="dark"
                        className="ion-margin"
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </IonCard>
              );
            }
            return null;
          })}
          <IonCard>
            <IonCardContent>
              <Link to={`/home/edit-product/${uid}`}>
                <IonButton fill="outline">Edit</IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowModal(!showModal)}>
          Close Modal
        </IonButton>
      </IonPage>
    </IonModal>
  );
};

export default ProductModal;
