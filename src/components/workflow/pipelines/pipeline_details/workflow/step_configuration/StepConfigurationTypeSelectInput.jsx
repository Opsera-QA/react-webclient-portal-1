import React from "react";
import PropTypes from "prop-types";
import ToolTypeSelectInput from "components/common/list_of_values_input/admin/tools/ToolTypeSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function StepConfigurationTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    textField,
    valueField,
  }) {
  return (
    <ToolTypeSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={hasStringValue(model?.getData(fieldName)) && model?.isChanged(fieldName) !== true}
      valueField={valueField}
      textField={textField}
      includeInactive={false}
    />
  );
}

StepConfigurationTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

StepConfigurationTypeSelectInput.defaultProps = {
  fieldName: "type",
  valueField: "identifier",
  textField: "name",
};

export default StepConfigurationTypeSelectInput;
