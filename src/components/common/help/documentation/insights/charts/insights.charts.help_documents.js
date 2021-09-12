// TODO: These should probably be broken down further based on tool and extracted in this to then be extracted in the main list
import {getBaseTreeItem} from "components/common/tree/tree-helpers";

export const INSIGHTS_CHARTS_HELP_DOCUMENTS = {
  COVERITY_ISSUES_BY_CATEGORY: "coverity_issues_by_category",
  GENERIC_CHART_SETTINGS: "generic_chart_settings",
  MEAN_TIME_TO_DEPLOY: "mean_time_to_deploy",
  SONAR_RATINGS: "sonar_ratings",
};

const getInsightChartsHelpDocumentTree = () => {
  const chartSettingsTreeItem = getBaseTreeItem(INSIGHTS_CHARTS_HELP_DOCUMENTS.GENERIC_CHART_SETTINGS, "Chart Settings");
  const sonarRatingsTreeItem = getBaseTreeItem(INSIGHTS_CHARTS_HELP_DOCUMENTS.SONAR_RATINGS, "Sonar Ratings KPI");
  const opseraMeanTimeToDeployTreeItem = getBaseTreeItem(INSIGHTS_CHARTS_HELP_DOCUMENTS.MEAN_TIME_TO_DEPLOY, "Opsera Mean Time to Deploy KPI");
  const coverityIssuesByCategoryTreeItem = getBaseTreeItem(INSIGHTS_CHARTS_HELP_DOCUMENTS.COVERITY_ISSUES_BY_CATEGORY, "Coverity Issues By Category");

  const chartDocumentTreeItems = [
    chartSettingsTreeItem,
    sonarRatingsTreeItem,
    opseraMeanTimeToDeployTreeItem,
    coverityIssuesByCategoryTreeItem
  ];

  return getBaseTreeItem("charts", "Charts", chartDocumentTreeItems);
};

export const INSIGHTS_CHARTS_HELP_DOCUMENT_TREE = [
  getInsightChartsHelpDocumentTree()
];