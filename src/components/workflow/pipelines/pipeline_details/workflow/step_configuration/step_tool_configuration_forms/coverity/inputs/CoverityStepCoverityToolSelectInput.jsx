import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedCoverityToolSelectInput
  from "components/common/list_of_values_input/tools/coverity/tool/RoleRestrictedCoverityToolSelectInput";

function CoverityStepCoverityToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField
  }) {
  return (
    <RoleRestrictedCoverityToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      textField={textField}
      valueField={valueField}
    />
  );
}

CoverityStepCoverityToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

CoverityStepCoverityToolSelectInput.defaultProps = {
  fieldName: "coverityToolId",
};

export default CoverityStepCoverityToolSelectInput;
