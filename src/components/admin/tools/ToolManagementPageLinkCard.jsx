import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function ToolManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"toolManagement"}
    />
  );
}

ToolManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ToolManagementPageLinkCard;
