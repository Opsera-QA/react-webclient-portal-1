import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getGithubBranchFromKpiConfiguration,
  getGithubRepositoryFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration
} from "../charts-helpers";

const gitscaperBaseURL = "analytics/gitscraper/v1/";

const gitscaperActions = {};

gitscaperActions.gitScraperBranchList = async (
  getAccessToken,
  cancelTokenSource,
  tags
) => {
  // TODO FILTER WITH TAGS
  const apiUrl = gitscaperBaseURL + "gitScraperBranchList";
  const postBody = {
    size: 10,
    tags: tags
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default gitscaperActions;