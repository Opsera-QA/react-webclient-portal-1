import baseActions from "utils/actionsBase";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const insightsLookupActions = {};

insightsLookupActions.getComponentNames = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/analytics/sfdc/v1/component/names`;
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

insightsLookupActions.getComponentByName = async (
  getAccessToken,
  cancelTokenSource,
  componentName,
) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-component-by-name`;
  const postBody = { componentName: componentName };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

insightsLookupActions.searchComponents = async (
  getAccessToken,
  cancelTokenSource,
  startDate,
  endDate,
  componentNames,
) => {
  const apiUrl = `/analytics/sfdc/v1/component`;
  const urlParams = {
    params: {
      startDate: startDate,
      endDate: endDate,
      fullNameArr: componentNames,
    },
  };
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

// TODO: Move to Node and delete from here
insightsLookupActions.generateTransformedResults = (searchResults) => {
  const results = [];
  const parsedSearchResults = dataParsingHelper.parseObject(
    searchResults,
    false,
  );

  if (!parsedSearchResults) {
    return results;
  }

  const cleanedResults = {};
  const pipelineNames = Object.keys(parsedSearchResults);

  for (let i = 0, l = pipelineNames.length; i < l; i++) {
    const pipelineName = pipelineNames[i];
    if (pipelineName !== "dateRanges") {
      const pipelineData = searchResults[pipelineName].currentResults;
      cleanedResults[pipelineName] = {
        totalTimesComponentDeployed: pipelineData.totalTimesComponentDeployed,
        totalUnitTestsFailed: pipelineData.totalUnitTestsFailed,
        totalUnitTestsPassed: pipelineData.totalUnitTestsPassed,
        totalValidationsFailed: pipelineData.totalValidationsFailed,
        totalValidationsPassed: pipelineData.totalValidationsPassed,
        pipelineData: pipelineData.pipelineData,
      };
    }
  }

  Object.entries(cleanedResults).forEach(([name, data]) => {
    const pipelineNames = Object.keys(data.pipelineData);
    const totals = [
      {
        deploy_count: data.totalTimesComponentDeployed,
        validations_passed: data.totalValidationsPassed,
        validations_failed: data.totalValidationsFailed,
        unit_tests_passed: data.totalUnitTestsPassed,
        unit_tests_failed: data.totalUnitTestsFailed,
        pipelines: pipelineNames.length,
      },
    ];

    const pipelines = [];
    for (let j = 0, k = pipelineNames.length; j < k; j++) {
      const pipelineName = pipelineNames[j];
      const pipeline = data.pipelineData[pipelineName];
      pipelines.push({
        pipeline: pipelineName,
        deploy_count: pipeline.totalTimesComponentDeployed,
        validations_passed: pipeline.totalValidationsPassed,
        validations_failed: pipeline.totalValidationsFailed,
        unit_tests_passed: pipeline.totalUnitTestsPassed,
        unit_tests_failed: pipeline.totalUnitTestsFailed,
        last_deploy: pipeline.customerName,
      });
    }

    results.push({
      componentName: name,
      totals,
      pipelines,
    });
  });

  return results;
};
