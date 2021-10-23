import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function CoverityStepJenkinsToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField
  }) {
  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

CoverityStepJenkinsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

CoverityStepJenkinsToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default CoverityStepJenkinsToolSelectInput;
