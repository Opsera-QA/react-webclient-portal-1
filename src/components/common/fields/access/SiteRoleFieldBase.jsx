import React from "react";
import PropTypes from "prop-types";
import {
  getAccessRolePermissionMessageWithoutRole,
} from "components/common/helpers/role-helpers";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import HelpDocumentationLink from "components/common/links/HelpDocumentationLink";

export const SITE_ROLE_DOCUMENTATION_LINK = "https://opsera.atlassian.net/wiki/spaces/OE/pages/1330970654";

export default function SiteRoleFieldBase(
  {
    showDescription,
    showExternalHelpDocumentationLink,
    userData,
    className,
  }) {
  const getDescription = () => {
    if (showDescription === true) {
      return (
        <div className={"mt-1 green"}>
          {getAccessRolePermissionMessageWithoutRole(SiteRoleHelper.getAccessRoles(userData))}
        </div>
      // <SuccessMessageFieldBase
      //   className={"mt-1"}
      //   showSuccessLabel={false}
      //   message={getAccessRolePermissionMessageWithoutRole(accessRoleData)}
      // />
      );
    }
  };

  const getHelpDocumentationLinkIcon = () => {
    if (showExternalHelpDocumentationLink !== false) {
      return (
        <HelpDocumentationLink
          link={SITE_ROLE_DOCUMENTATION_LINK}
          className={"ml-2"}
        />
      );
    }
  };

  if (userData == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <FieldLabelBase label={"Site Role"} />
        <div>
          {SiteRoleHelper.getFormattedSiteRoleLevel(userData)}
        </div>
        {getHelpDocumentationLinkIcon()}
      </div>
      {getDescription()}
    </FieldContainer>
  );
}

SiteRoleFieldBase.propTypes = {
  className: PropTypes.string,
  showDescription: PropTypes.bool,
  showExternalHelpDocumentationLink: PropTypes.bool,
  userData: PropTypes.object,
};