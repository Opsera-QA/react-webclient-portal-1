import React from "react";
import PropTypes from "prop-types";
import ToolTypeSelectInput from "components/common/list_of_values_input/admin/tools/ToolTypeSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

const USER_ACTION_STEPS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION,
  toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL,
];

export default function StepConfigurationTypeSelectInput(
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
      requireUserEnable={USER_ACTION_STEPS.includes(model?.getData("tool_identifier"))}
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
