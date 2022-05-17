import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function ToolsCountsPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"toolCountsReport"}
    />
  );
}

ToolsCountsPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ToolsCountsPageLinkCard;
