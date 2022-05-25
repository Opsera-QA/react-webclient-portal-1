import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function ToolOwnershipReportsPageLinkCard({accessRoleData}) {
  if (
    accessRoleData.Administrator !== true
    && accessRoleData.OpseraAdministrator !== true
    && accessRoleData.PowerUser !== true
    && accessRoleData.SassPowerUser !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"toolOwnershipReport"}
    />
  );
}

ToolOwnershipReportsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ToolOwnershipReportsPageLinkCard;
