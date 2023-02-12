import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import accessControlRuleRoleConstants from "@opsera/know-your-role/constants/accessControlRuleRole.constants";

export default function AccessControlRoleSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    fieldName,
    disabled,
    className,
  }) {
  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      className={className}
      selectOptions={accessControlRuleRoleConstants.ACCESS_CONTROL_RULE_ROLE_SELECT_OPTIONS}
      disabled={disabled}
      setDataFunction={setDataFunction}
      singularTopic={"Access Control Role"}
      pluralTopic={"Access Control Roles"}
      textField={"text"}
      valueField={"value"}
    />
  );
}

AccessControlRoleSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};
