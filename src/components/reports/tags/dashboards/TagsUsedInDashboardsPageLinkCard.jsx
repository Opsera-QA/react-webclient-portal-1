import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function TagsUsedInDashboardsPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"tagsUsedInDashboardsReport"}
    />
  );
}

TagsUsedInDashboardsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default TagsUsedInDashboardsPageLinkCard;
