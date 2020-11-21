import React from "react";
import { IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { IOption } from "../../lib/attributes";

interface ICustomCheckBox {
  label: string;
  multiple: boolean;
  options: IOption[];
  uid: string;
  handleChange: (options: IOption[], uid: string) => void;
}

const CheckBox = ({
  label,
  multiple,
  options,
  handleChange,
  uid,
}: ICustomCheckBox) => {
  return (
    <>
      <IonLabel>{label}</IonLabel>
      <IonSelect
        onIonChange={(e) => {
          let optionsArr = [];
          if (Array.isArray(e.detail.value)) {
            optionsArr = options.filter(({ value }) =>
              e.detail.value.some((val: string) => val === value)
            );
          } else {
            const option = options.filter(
              ({ value }) => e.detail.value === value
            );
            optionsArr = option;
          }
          handleChange(optionsArr, uid);
        }}
        multiple={multiple}
        placeholder={multiple ? "Select Multiple" : "Select One"}
      >
        {options.map(({ value, label }) => (
          <IonSelectOption key={value} value={value}>
            {label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </>
  );
};

export default CheckBox;
