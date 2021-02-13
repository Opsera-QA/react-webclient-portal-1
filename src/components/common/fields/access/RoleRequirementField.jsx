import React from "react";
import PropTypes from "prop-types";
import {getAccessRoleRequirementMessage} from "components/common/helpers/role-helpers";

function RoleRequirementField({roleRequirement, className}) {
  if (roleRequirement == null) {
    return null;
  }

  return (<span className={className}><label className="mr-2 text-muted">Role Requirement:</label>{getAccessRoleRequirementMessage(roleRequirement)}</span>);
}

RoleRequirementField.propTypes = {
  roleRequirement: PropTypes.string,
  className: PropTypes.string
};

export default RoleRequirementField;