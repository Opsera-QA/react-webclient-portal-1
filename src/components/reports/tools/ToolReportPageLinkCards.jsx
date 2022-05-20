import React from "react";
import PropTypes from "prop-types";
import ToolsUsedByPipelinesPageLinkCard from "./pipelines/ToolsUsedByPipelinesPageLinkCard";
import ToolsCountsPageLinkCard from "./counts/ToolsCountsPageLinkCard";

function ToolReportPageLinkCards({accessRoleData}) {
  return (
    <div>
      <ToolsUsedByPipelinesPageLinkCard
        accessRoleData={accessRoleData}
      />
      <ToolsCountsPageLinkCard
        accessRoleData={accessRoleData}
      />
    </div>
  );
}

ToolReportPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};
export default ToolReportPageLinkCards;

