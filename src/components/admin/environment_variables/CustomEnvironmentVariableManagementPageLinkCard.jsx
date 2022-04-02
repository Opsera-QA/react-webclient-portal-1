import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function CustomEnvironmentVariableManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"customEnvironmentVariableManagement"}
    />
  );
}

CustomEnvironmentVariableManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default CustomEnvironmentVariableManagementPageLinkCard;
