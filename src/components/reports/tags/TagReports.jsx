import React from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TagsUsedInPipelinesPageLinkCard from "./pipelines/TagsUsedInPipelinesPageLinkCard";
import TagsUsedInDashboardsPageLinkCard from "./dashboards/TagsUsedInDashboardsPageLinkCard";
import TagsUsedInToolsPageLinkCard from "./tools/TagsUsedInToolsPageLinkCard";

function TagReports({accessRoleData}) {
  return (
    <div>
      <TagsUsedInPipelinesPageLinkCard
        accessRoleData={accessRoleData} />

      <TagsUsedInDashboardsPageLinkCard
        accessRoleData={accessRoleData} />

      <TagsUsedInToolsPageLinkCard
        accessRoleData={accessRoleData} />
    </div>
  );
}
TagReports.propTypes = {
  accessRoleData: PropTypes.object,
};

export default TagReports;

