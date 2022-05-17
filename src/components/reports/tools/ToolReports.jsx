import React from "react";
import BreadcrumbPageLinkCard from "../../common/card/link/BreadcrumbPageLinkCard";
import PropTypes from "prop-types";
import ToolsUsedByPipelinesPageLinkCard from "./pipelines/ToolsUsedByPipelinesPageLinkCard";
import ToolsCountsPageLinkCard from "./counts/ToolsCountsPageLinkCard";

function ToolReports({accessRoleData}) {
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

ToolReports.propTypes = {
  accessRoleData: PropTypes.object,
};
export default ToolReports;

