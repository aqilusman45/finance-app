import React, { useState } from "react";
import { slugify } from "../../utils/slugify";
import { insertAttribute } from "../../store/reducers/attributes";
import { AttributeType } from "../../lib/enum";
import { IAttributeDocument } from "../../lib/attributes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import AddAttributesForm, {
  IAttributeInput,
} from "../AddAttributesView/AddAttributesView";

const AddAttributes: React.FC = () => {
  const [options, setOpions] = useState<IAttributeInput[]>([]);
  const [attrType, setType] = useState<AttributeType>(AttributeType.CHECKBOXES);
  const [attrName, setName] = useState<string>("");
  const [optionLabel, setLabel] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);

  const { push } = useHistory();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => {
    return state.attributes;
  });

  const addOption = (option: string) => {
    setLabel("");
    if (!options.some(({ label }) => label.toLowerCase() === option)) {
      setOpions((prevOptions) => {
        prevOptions.push({
          label: option,
          value: slugify(option),
        });
        return [...prevOptions];
      });
    }
  };

  const removeOption = (optValue: string) => {
    setOpions((prevOptions) => {
      const opts = prevOptions.filter(({ value }) => value !== optValue);
      return [...opts];
    });
  };

  const submitAttribute = () => {
    const attr = {
      uid: uuidv4(),
      attributeName: {
        name: attrName,
        key: slugify(attrName),
      },
      attributeType: attrType,
      options,
      required,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch(
      insertAttribute(attr as IAttributeDocument, () => {
        push("/home/manage-attributes");
      })
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <AddAttributesForm
      addOption={addOption}
      removeOption={removeOption}
      setLabel={setLabel}
      setName={setName}
      submitAttribute={submitAttribute}
      setRequired={setRequired}
      setType={setType}
      state={{
        attrName,
        attrType,
        optionLabel,
        options,
        required,
      }}
    />
  );
};

export default AddAttributes;
