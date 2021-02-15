import React from "react";
import PropTypes from "prop-types";
import {getAccessRolePermissionMessage} from "components/common/helpers/role-helpers";

function AccessRoleField({accessRole}) {
  if (accessRole == null) {
    return <></>;
  }

  return (<span><label className="mr-2 text-muted">Platform Access Role:</label>{getAccessRolePermissionMessage(accessRole)}</span>);
}

AccessRoleField.propTypes = {
  accessRole: PropTypes.object,
};

export default AccessRoleField;