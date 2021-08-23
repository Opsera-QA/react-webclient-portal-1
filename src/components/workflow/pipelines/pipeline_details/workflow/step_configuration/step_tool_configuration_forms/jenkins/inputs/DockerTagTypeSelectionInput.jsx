import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const dockerTagTypes = [
    {name: "Run Count", value: "run_count"},
    {name: "Date", value: "date"},
    {name: "Timestamp", value: "timestamp"},
    {name: "Custom Tag", value: "other"},
  ];

const DockerTagTypeSelectionInput = ({dataObject, setDataObject, disabled}) => {
  return (
    <SelectInputBase
      fieldName={"dockerTagType"}
      dataObject={dataObject}
      setDataObject={setDataObject}      
      selectOptions={dockerTagTypes}      
      valueField="value"
      textField="name"      
      disabled={disabled || !dataObject.getData("dynamicTag")}
    />
  );
};

DockerTagTypeSelectionInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  listOfSteps: PropTypes.array,
};

DockerTagTypeSelectionInput.defaultProps = {
  visible: true
};

export default DockerTagTypeSelectionInput;
