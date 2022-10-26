import React from "react";
import PropTypes from "prop-types";
import { getAccessRolePermissionMessage } from "components/common/helpers/role-helpers";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

export default function AccessRoleField(
  {
    accessRole,
    className,
  }) {
  if (accessRole == null) {
    return <></>;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabelBase label={"Site Role"} />
        <span>{getAccessRolePermissionMessage(accessRole)}</span>
      </div>
    </FieldContainer>
  );
}

AccessRoleField.propTypes = {
  accessRole: PropTypes.object,
  className: PropTypes.string,
};