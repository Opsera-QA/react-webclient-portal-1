import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

export default function LdapSiteRoleManagementPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapSiteRolesManagement"}
    />
  );
}

LdapSiteRoleManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};
