import React from "react";
import PropTypes from "prop-types";
import {getUserRoleLevel} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function AccessRoleLevelField({objectRoles, dataObject, className}) {
  const {
    isSaasUser,
    accessRoleData,
  } = useComponentStateReference();

  if (accessRoleData == null || isSaasUser !== false) {
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