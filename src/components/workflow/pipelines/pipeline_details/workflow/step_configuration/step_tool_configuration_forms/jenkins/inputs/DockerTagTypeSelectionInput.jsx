import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const dockerTagTypes = [
    {name: "Run Count", value: "run_count"},
    {name: "Date", value: "date"},
    {name: "Timestamp", value: "timestamp"},
    {name: "Custom Tag", value: "other"},
  ];

const DockerTagTypeSelectionInput = ({dataObject, setDataObject, fieldName, disabled}) => {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}      
      selectOptions={dockerTagTypes}      
      valueField="value"
      textField="name"      
      disabled={disabled}
    />
  );
};

DockerTagTypeSelectionInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool, 
  fieldName: PropTypes.string,
  listOfSteps: PropTypes.array,
};

DockerTagTypeSelectionInput.defaultProps = {
  fieldName: "dockerTagType",
  visible: true
};

export default DockerTagTypeSelectionInput;
