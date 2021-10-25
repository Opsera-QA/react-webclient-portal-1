import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function AnalyticsProfilePageLinkCard({accessRoleData}) {
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
      breadcrumbDestination={"analyticsProfile"}
    />
  );
}

AnalyticsProfilePageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default AnalyticsProfilePageLinkCard;
