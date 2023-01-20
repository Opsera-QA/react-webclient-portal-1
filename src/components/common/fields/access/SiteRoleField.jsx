import React from "react";
import PropTypes from "prop-types";
import {
  getAccessRolePermissionMessageWithoutRole,
} from "components/common/helpers/role-helpers";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SiteRoleField(
  {
    showDescription,
    className,
  }) {
  const {
    userData,
    accessRoleData,
  } = useComponentStateReference();

  const getDescription = () => {
    if (showDescription === true) {
      return (
        <div className={"mt-1"}>
          {getAccessRolePermissionMessageWithoutRole(accessRoleData)}
        </div>
      );
    }
  };

  if (accessRoleData == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <FieldLabelBase label={"Site Role"} />
        <span>{SiteRoleHelper.getFormattedSiteRoleLevel(userData)}</span>
      </div>
      {getDescription()}
    </FieldContainer>
  );
}

SiteRoleField.propTypes = {
  className: PropTypes.string,
  showDescription: PropTypes.bool,
};