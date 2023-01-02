import React from "react";
import TagsUsedInPipelinesPageLinkCard from "./pipelines/TagsUsedInPipelinesPageLinkCard";
import TagsUsedInDashboardsPageLinkCard from "./dashboards/TagsUsedInDashboardsPageLinkCard";
import TagsUsedInToolsPageLinkCard from "./tools/TagsUsedInToolsPageLinkCard";

export default function TagReportPageLinkCards() {
  return (
    <div className={"mx-2"}>
      <TagsUsedInPipelinesPageLinkCard />
      <TagsUsedInDashboardsPageLinkCard />
      <TagsUsedInToolsPageLinkCard />
    </div>
  );
}

