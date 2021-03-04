import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getJenkinsResultFromKpiConfiguration,
  getJenkinsJobUrlFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const chartsActions = {};

chartsActions.getChart = async (request, metric, date, getAccessToken) => {
  const apiUrl = "/analytics/data";

  const postBody = {
    data: [
      {
        request: request,
        metric: metric
      }
    ],
    startDate: date.start,
    endDate: date.end
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody)
};

chartsActions.getChartData = async (getAccessToken, cancelTokenSource, request, metric, kpiConfiguration) => {
  const apiUrl = "/analytics/data";
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    data: [
      {
        request: request,
        metric: metric
      }
    ],
    startDate: date.start,
    endDate: date.end
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody)
};


chartsActions.getChartMetrics = async (request, metric, date, tags, getAccessToken) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody)
};

chartsActions.parseConfigurationAndGetChartMetrics = async (getAccessToken, cancelTokenSource, request, kpiConfiguration) => {
  const apiUrl = "/analytics/metrics";
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tags = getTagsFromKpiConfiguration(kpiConfiguration);
  const jenkinsResult = getJenkinsResultFromKpiConfiguration(kpiConfiguration);
  const jenkinsJobUrl = getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags,
    jenkinsResult: jenkinsResult,
    jenkinsJobUrl: jenkinsJobUrl,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody)
};

export default chartsActions;