import React from "react";
import { IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { IOption } from "../../lib/attributes";

interface ICustomCheckBox {
  label: string;
  multiple: boolean;
  options: IOption[];
  selected: IOption[];
  uid: string;
  handleChange: (options: IOption[], uid: string) => void;
}

const CheckBox = ({
  label,
  multiple,
  options,
  handleChange,
  uid,
  selected = [
    {
      value: "",
      label: "",
    },
  ],
}: ICustomCheckBox) => {
  const values = multiple
    ? selected.map((node) => node.value)
    : (selected[0].value as any);
  return (
    <>
      <IonLabel>{label}</IonLabel>
      <IonSelect
        value={values}
        onIonChange={(e) => {
          let optionsArr = [];
          let isSame = false;
          if (Array.isArray(e.detail.value)) {
            optionsArr = options.filter(({ value }) =>
              e.detail.value.some((val: string) => val === value)
            );
            isSame =
              optionsArr
                .map((node) => node.value)
                .sort()
                .join(",") === values.sort().join(",");
          } else {
            const option = options.filter(
              ({ value }) => e.detail.value === value
            );
            optionsArr = option;
            isSame = optionsArr[0].value === values;
          }

          if (!isSame) {
            handleChange(optionsArr, uid);
          }
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
