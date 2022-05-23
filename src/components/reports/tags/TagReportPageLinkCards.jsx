import React from "react";
import PropTypes from "prop-types";
import TagsUsedInPipelinesPageLinkCard from "./pipelines/TagsUsedInPipelinesPageLinkCard";
import TagsUsedInDashboardsPageLinkCard from "./dashboards/TagsUsedInDashboardsPageLinkCard";
import TagsUsedInToolsPageLinkCard from "./tools/TagsUsedInToolsPageLinkCard";

function TagReportPageLinkCards({accessRoleData}) {
  return (
    <div>
      <TagsUsedInPipelinesPageLinkCard
        accessRoleData={accessRoleData}
      />
      <TagsUsedInDashboardsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <TagsUsedInToolsPageLinkCard
        accessRoleData={accessRoleData}
      />
    </div>
  );
}
TagReportPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default TagReportPageLinkCards;

