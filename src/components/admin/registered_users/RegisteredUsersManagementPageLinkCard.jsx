import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function RegisteredUsersManagementPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"registeredUsersManagement"}
    />
  );
}

RegisteredUsersManagementPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default RegisteredUsersManagementPageLinkCard;
