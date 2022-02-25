import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function LdapOrganizationManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"ldapOrganizationManagement"}
    />
  );
}

LdapOrganizationManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default LdapOrganizationManagementPageLinkCard;
