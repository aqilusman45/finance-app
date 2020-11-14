import { IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AttributeType } from "../../lib/enum";
import { fetchAttributes, updateAttributeAsync } from "../../store/reducers/attributes";
import { RootState } from "../../store/rootReducer";
import { slugify } from "../../utils/slugify";
import AddAttributesForm, {
  IAttributeInput,
} from "../AddAttributesView/AddAttributesView";
import { IAttributeDocument } from "../../lib/attributes";

const EditAttribute = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { push } = useHistory();
  const { isLoading, attributes } = useSelector((state: RootState) => state.attributes);
  const dispatch = useDispatch();

  const [options, setOpions] = useState<IAttributeInput[]>([]);
  const [attrType, setType] = useState<AttributeType>(AttributeType.CHECKBOXES);
  const [attrName, setName] = useState<string>("");
  const [optionLabel, setLabel] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);

  useEffect(() => {
    if (!attributes) {
      dispatch(fetchAttributes());
    }
  }, [attributes, dispatch]);

  useEffect(() => {
    if (attributes) {
      const attribute = attributes.find(({ uid }) => uid === id)
      if (attribute) {
        const { attributeName, attributeType, options } = attribute
        setOpions(options);
        setName(attributeName.name)
        setType(attributeType)
      }
    }
  }, [attributes, id])

  if (isLoading)
    return <IonLoading isOpen={isLoading} message={"Please wait..."} />;

  const submit = () => {
    const attribute = attributes?.find(({ uid }) => uid === id)
    if (attribute) {
      const { uid, attributeName, createdAt, attributeType } = attribute;
      const attr = {
        uid,
        attributeName,
        attributeType,
        options,
        required,
        createdAt,
        updatedAt: Date.now(),
      };
      dispatch(updateAttributeAsync(attr as IAttributeDocument, () => {
        push("/home/manage-attributes");
      }))
    }
  };

  const removeOption = (optValue: string) => {
    setOpions((prevOptions) => {
      const opts = prevOptions.filter(({ value }) => value !== optValue);
      return [...opts];
    });
  };

  const addOption = (option: string) => {
    setLabel("");
    if (!options.some(({ label }) => label.toLowerCase() === option)) {
      setOpions((prevOptions) => {
        const options = [...prevOptions]
        options.push({
          label: option,
          value: slugify(option),
        });
        return [...options];
      });
    }
  };

  return (
    <AddAttributesForm
      isEdit
      addOption={addOption}
      removeOption={removeOption}
      setLabel={setLabel}
      setName={setName}
      submitAttribute={submit}
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

export default EditAttribute;
