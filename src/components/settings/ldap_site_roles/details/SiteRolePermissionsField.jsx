import React from "react";
import PropTypes from "prop-types";
import {siteRoleHelper} from "components/settings/ldap_site_roles/siteRole.helper";

export default function SiteRolePermissionsField({ model }) {
  const groupPermissionText = siteRoleHelper.getSiteRolePermissionText(model?.getData("name"));

  if (model == null || groupPermissionText == null) {
    return <></>;
  }

  return (
    <div className={"m-3 p-3 text-muted italic pipeline-task-message"}>
      {groupPermissionText}
    </div>
  );
}

SiteRolePermissionsField.propTypes = {
  model: PropTypes.object,
};