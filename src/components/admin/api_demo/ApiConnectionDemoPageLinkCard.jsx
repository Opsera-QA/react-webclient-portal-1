import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function ApiConnectionDemoPageLinkCard({accessRoleData}) {
  if (accessRoleData?.OpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"apiConnectionTest"}
    />
  );
}

ApiConnectionDemoPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ApiConnectionDemoPageLinkCard;
