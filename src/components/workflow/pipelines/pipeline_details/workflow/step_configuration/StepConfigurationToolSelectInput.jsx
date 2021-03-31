import React from "react";
import PropTypes from "prop-types";
import PipelineUsageToolSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/PipelineUsageToolSelectInput";

function StepConfigurationToolSelectInput({fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("tool_identifier", selectedOption?.identifier);
    newDataObject.setData("type", selectedOption?.tool_type_identifier);
    newDataObject.setData("tags", []);
    setDataObject({...newDataObject});
  };

  return (
    <PipelineUsageToolSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a Tool"}
      disabled={disabled && dataObject?.getData("tool_identifier").length > 0}
    />
  );
}

StepConfigurationToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

StepConfigurationToolSelectInput.defaultProps = {
  fieldName: "tool_identifier",
};

export default StepConfigurationToolSelectInput;
