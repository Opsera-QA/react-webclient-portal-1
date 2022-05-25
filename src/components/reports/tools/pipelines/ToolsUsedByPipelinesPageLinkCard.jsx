import React from "react";
import PropTypes from "prop-types";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

function ToolsUsedByPipelinesPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"toolsUsedInPipelineReport"}
    />
  );
}

ToolsUsedByPipelinesPageLinkCard.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ToolsUsedByPipelinesPageLinkCard;
