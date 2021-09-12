// TODO: These should probably be broken down further based on tool and extracted in this to then be extracted in the main list
import {getBaseTreeItem} from "components/common/tree/tree-helpers";

export const INSIGHTS_HELP_DOCUMENTS = {
  COVERITY_ISSUES_BY_CATEGORY: "coverity_issues_by_category",
  GENERIC_CHART_SETTINGS: "generic_chart_settings",
  MEAN_TIME_TO_DEPLOY: "mean_time_to_deploy",
  SONAR_RATINGS: "sonar_ratings",
  PIPELINES_OVERVIEW: "pipelines_overview",
};

const getInsightsHelpDocumentTree = () => {
  const sonarRatingsTreeItem = getBaseTreeItem(INSIGHTS_HELP_DOCUMENTS.SONAR_RATINGS, "Sonar Ratings KPI");

  return [getBaseTreeItem("insights", "Insights", [sonarRatingsTreeItem])];
};

export const INSIGHTS_HELP_DOCUMENT_TREE = [
  ...getInsightsHelpDocumentTree()
];