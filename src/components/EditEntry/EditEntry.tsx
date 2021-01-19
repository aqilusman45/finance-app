import React from "react";
import { useParams } from "react-router";
import AddEntryView from "../AddEntryView/AddEntryView";

const EditEntry: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  return <AddEntryView isEdit={true} />;
};

export default EditEntry;
