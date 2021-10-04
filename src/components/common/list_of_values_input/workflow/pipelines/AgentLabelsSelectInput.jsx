import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO:  Check with mahantha to get the actual agent label values and update it here
// TODO : un-comment when this feature is pushed - dependency ticket -KI-150 
export const jenkinsAgentArray = [
  {
    "name": "Ubuntu Agent",
    "env" : "linux",
    "value": "generic-linux",
  }
];

function AgentLabelsSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={jenkinsAgentArray}
      setDataFunction={setDataFunction}
      groupBy="env"
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

AgentLabelsSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool
};

export default AgentLabelsSelectInput;