import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const dockerNameTypes = [
    {name: "Branch Name", value: "branch_name"},    
  ];

const DockerDynamicNameTypeSelectionInput = ({model, setModel, fieldName, disabled}) => {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}      
      selectOptions={dockerNameTypes}      
      valueField="value"
      textField="name"      
      disabled={disabled}
    />
  );
};

DockerDynamicNameTypeSelectionInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

DockerDynamicNameTypeSelectionInput.defaultProps = {
  fieldName: "dockerDynamicName",
};

export default DockerDynamicNameTypeSelectionInput;
