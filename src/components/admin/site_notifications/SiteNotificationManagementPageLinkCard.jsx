import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function SiteNotificationManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"siteNotificationManager"}
    />
  );
}

SiteNotificationManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default SiteNotificationManagementPageLinkCard;
