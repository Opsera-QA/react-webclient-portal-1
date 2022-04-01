import {getBaseTreeItem} from "components/common/tree/tree-helpers";
import {
  INSIGHTS_CHARTS_HELP_DOCUMENT_TREE,
  INSIGHTS_CHARTS_HELP_DOCUMENTS
} from "components/common/help/documentation/insights/charts/insights.charts.help_documents";
import {
  INSIGHTS_SYNOPSIS_HELP_DOCUMENT_TREE,
  INSIGHTS_SYNOPSIS_HELP_DOCUMENTS
} from "components/common/help/documentation/insights/synopsis/insights.synopsis.help_documents";

export const INSIGHTS_HELP_DOCUMENTS = {
  INSIGHTS_MAIN_HELP_DOCUMENTATION: "insights",
  ...INSIGHTS_SYNOPSIS_HELP_DOCUMENTS,
  ...INSIGHTS_CHARTS_HELP_DOCUMENTS,
};

const getInsightsHelpDocumentTree = () => {
  const insightsDocumentTreeItems = [
      ...INSIGHTS_CHARTS_HELP_DOCUMENT_TREE,
      ...INSIGHTS_SYNOPSIS_HELP_DOCUMENT_TREE,
  ];

  return [getBaseTreeItem("insights", "Insights", insightsDocumentTreeItems, "fa-chart-network")];
};

export const INSIGHTS_HELP_DOCUMENT_TREE = [
  ...getInsightsHelpDocumentTree()
];