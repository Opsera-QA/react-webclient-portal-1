import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function UserReportsPageLinkCard({accessRoleData}) {
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
      breadcrumbDestination={"consolidatedUserReport"}
    />
  );
}

UserReportsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default UserReportsPageLinkCard;
