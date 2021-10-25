import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function OrganizationManagementPageLinkCard({accessRoleData}) {
  if (
       accessRoleData.Administrator !== true
    && accessRoleData.OpseraAdministrator !== true
    && accessRoleData.SassPowerUser !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"organizationManagement"}
    />
  );
}

OrganizationManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default OrganizationManagementPageLinkCard;
