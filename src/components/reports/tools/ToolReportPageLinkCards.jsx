import React from "react";
import ToolsUsedByPipelinesPageLinkCard from "./pipelines/ToolsUsedByPipelinesPageLinkCard";
import ToolsCountsPageLinkCard from "./counts/ToolsCountsPageLinkCard";

export default function ToolReportPageLinkCards() {
  return (
    <div className={"mx-2"}>
      <ToolsUsedByPipelinesPageLinkCard />
      <ToolsCountsPageLinkCard />
    </div>
  );
}

