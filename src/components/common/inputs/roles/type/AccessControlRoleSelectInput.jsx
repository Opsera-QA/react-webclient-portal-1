import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Move to constants library
export const ACCESS_ROLE_TYPES = {
  ADMINISTRATOR: "administrator",
  MANAGER: "manager",
  USER: "user",
  GUEST: "guest",
};

export const ACCESS_ROLE_TYPE_SELECT_OPTIONS = [
  {text: "Administrator", value: "administrator"},
  {text: "Manager", value: "manager"},
  // {text: "SecOps", value: "secops"},
  {text: "User", value: "user"},
  {text: "Guest", value: "guest"},
];

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
      selectOptions={ACCESS_ROLE_TYPE_SELECT_OPTIONS}
      disabled={disabled}
      setDataFunction={setDataFunction}
      singularTopic={"Access Control Type"}
      pluralTopic={"Access Control Types"}
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
