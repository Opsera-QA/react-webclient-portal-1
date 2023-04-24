import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const CONFIGURATION_TYPES = [
  {
    name: "Release",
    value: "Release",
  },
  {
    name: "Debug",
    value: "Debug",
  },  
];

function JenkinsXcodeContentTypeSelectInput({model, setModel, disabled}) {
  return (
    <SelectInputBase      
      textField={"name"}
      valueField={"value"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={CONFIGURATION_TYPES}
      fieldName={"configurationType"}
      disabled={disabled}
    />
  );
}

JenkinsXcodeContentTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JenkinsXcodeContentTypeSelectInput;