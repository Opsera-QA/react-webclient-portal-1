import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const DIRECTION_TYPES = [
    {name: "First N Characters", value: "prefix"},
    {name: "Last N Characters", value: "suffix"},    
  ];

const DockerCommitShaTrimDirectionSelectionInput = ({dataObject, setDataObject, fieldName, disabled}) => {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}      
      selectOptions={DIRECTION_TYPES}      
      valueField="value"
      textField="name"      
      disabled={disabled}
    />
  );
};

DockerCommitShaTrimDirectionSelectionInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
    fieldName: PropTypes.string,
  listOfSteps: PropTypes.array,
};

DockerCommitShaTrimDirectionSelectionInput.defaultProps = {
  fieldName: "commitIdCharDirection",
  visible: true,
};

export default DockerCommitShaTrimDirectionSelectionInput;
