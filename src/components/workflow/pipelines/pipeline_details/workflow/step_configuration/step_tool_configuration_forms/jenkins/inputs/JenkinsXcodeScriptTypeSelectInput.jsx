import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SCRIPT_TYPES = [
  {
    name: "Opsera",
    value: "opsera",
  },
  {
    name: "Custom",
    value: "custom",
  },  
];

function JenkinsXcodeScriptTypeSelectInput({model, setModel, disabled}) {
  return (
    <SelectInputBase      
      textField={"name"}
      valueField={"value"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SCRIPT_TYPES}
      fieldName={"scriptType"}
      disabled={disabled}
    />
  );
}

JenkinsXcodeScriptTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JenkinsXcodeScriptTypeSelectInput;