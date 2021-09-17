import {getBaseTreeItem} from "components/common/tree/tree-helpers";

export const INSIGHTS_SYNOPSIS_HELP_DOCUMENTS = {
  PIPELINES_OVERVIEW: "pipelines_overview",
};

const getInsightsHelpDocumentTree = () => {
  const pipelinesOverviewKpi = getBaseTreeItem(INSIGHTS_SYNOPSIS_HELP_DOCUMENTS.PIPELINES_OVERVIEW, "Pipelines Overview");

  const insightsSynopsisDocumentTreeItems = [
    pipelinesOverviewKpi,
  ];


  return getBaseTreeItem("synopsis", "Synopsis", insightsSynopsisDocumentTreeItems);
};

export const INSIGHTS_SYNOPSIS_HELP_DOCUMENT_TREE = [
  getInsightsHelpDocumentTree()
];