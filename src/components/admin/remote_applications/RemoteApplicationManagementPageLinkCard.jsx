import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function RemoteApplicationManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"remoteApplications"}
    />
  );
}

RemoteApplicationManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default RemoteApplicationManagementPageLinkCard;
