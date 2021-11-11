import React from "react";
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

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

function StandaloneRoleAccessTypeInput({ accessRole, updateRoleType, disabled }) {
  if (updateRoleType == null || accessRole == null) {
    return <></>;
  }

  return (
    <StandaloneSelectInput
      selectOptions={ACCESS_ROLE_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      value={accessRole?.role}
      disabled={disabled}
      placeholderText={"Select Role Type"}
      setDataFunction={(value) => updateRoleType(accessRole, "role", value?.value)}
    />
  );
}

StandaloneRoleAccessTypeInput.propTypes = {
  accessRole: PropTypes.object,
  updateRoleType: PropTypes.func,
  disabled: PropTypes.bool,
};

export default StandaloneRoleAccessTypeInput;