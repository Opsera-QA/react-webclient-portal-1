import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// Make constants
export const jobTypes = [
  {value: "build", text: "Build"},
  {value: "scan", text: "Scan"},
  {value: "deploy", text: "Deploy"},
];

function PipelineMockStepTypeSelectInput({ model, setModel, setDataFunction, disabled}) {
  return (
    <SelectInputBase
      dataObject={model}
      fieldName={"type"}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={jobTypes}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

PipelineMockStepTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
};

export default PipelineMockStepTypeSelectInput;