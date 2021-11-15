import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function KpiIdentifierManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"kpiManagement"}
    />
  );
}

KpiIdentifierManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default KpiIdentifierManagementPageLinkCard;
