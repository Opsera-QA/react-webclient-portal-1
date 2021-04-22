import React, {useContext} from "react";
import PropTypes from "prop-types";
import {getUserRoleLevel} from "components/common/helpers/role-helpers";
import {AuthContext} from "contexts/AuthContext";

function AccessRoleLevelField({accessRoleData, objectRoles, dataObject, className}) {
  const { isSassUser } = useContext(AuthContext);

  if (accessRoleData == null || isSassUser() === true) {
    return null;
  }

  return (
    <span className={className}>
      <label className="mr-2 text-muted">Role Access:</label>
      {getUserRoleLevel(accessRoleData, objectRoles, dataObject)}
    </span>
  );
}

AccessRoleLevelField.propTypes = {
  objectRoles: PropTypes.array,
  accessRoleData: PropTypes.object,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default AccessRoleLevelField;