import React from "react";
import {useParams} from "react-router";
import AddEntryView from "../AddEntry/AddEntryView";

const EditEntry:React.FC = () => {
    const { id } = useParams<{
        id: string;
      }>();
  console.log("EditEntry params", id);

  return <AddEntryView isEdit={false}/>;
};

export default EditEntry;
