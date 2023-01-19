import React from "react";
import PropTypes from "prop-types";
import PipelineUsageToolSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/PipelineUsageToolSelectInput";

function StepConfigurationToolIdentifierSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData("tool_identifier", selectedOption?.identifier);
    model?.setData("type", selectedOption?.tool_type_identifier);
    
    if (model?.getData("type") === "deploy") {
      model.setData("tags", []);
    }

    setModel({...model});
  };

  return (
    <PipelineUsageToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled && model?.getData("tool_identifier").length > 0}
    />
  );
}

StepConfigurationToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

StepConfigurationToolIdentifierSelectInput.defaultProps = {
  fieldName: "tool_identifier",
};

export default StepConfigurationToolIdentifierSelectInput;
