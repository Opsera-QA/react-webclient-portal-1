import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const FEED_TOOLS = [
  {
    id: "nexus",
    name: "Nexus"
  },
  {
    id: "jfrog",
    name: "JFrog"
  },
  {
    id: "azure_account",
    name: "Azure"
  }
];

const FeedToolTypeSelectInput = ({ dataObject, setDataObject, fieldName, disabled, isLoading }) => {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption.id);
    newDataObject.setData("nexusToolId", "");
    newDataObject.setData("nexusRepository", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("nexusToolId", "");
    newDataObject.setData("nexusRepository", "");
    setDataObject({...newDataObject});
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        selectOptions={FEED_TOOLS}
        busy={isLoading}
        valueField="id"
        textField="name"
        placeholderText="Select a Tool Type"
        disabled={disabled || isLoading}
      />
    </div>
  );
};

FeedToolTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FeedToolTypeSelectInput;
