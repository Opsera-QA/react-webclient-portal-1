import baseActions from "utils/actionsBase";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const insightsLookupActions = {};

insightsLookupActions.getComponentNames = async (
    getAccessToken,
    cancelTokenSource,
    startDate,
    endDate,
    componentNames,
    selectedComponentFilterData,
    pipelineComponentFilterData,
    orgsComponentFilterData,
    tableFilterDto,
) => {
  const apiUrl = `/analytics/sfdc/v1/component/names`;
  const postBody = {
    startDate: startDate,
    endDate: endDate,
    fullNameArr: componentNames,
    selectedComponentFilterData: selectedComponentFilterData,
    pipelineComponentFilterData :pipelineComponentFilterData,
    orgsComponentFilterData: orgsComponentFilterData,
    search: tableFilterDto?.getData("search"),
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

insightsLookupActions.getComponentByName = async (
    getAccessToken,
    cancelTokenSource,
    componentName,
    pipeline,
    startDate,
    endDate,
    orgs
) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-component-by-name`;
  const postBody = {
    componentName: componentName,
    pipeline:pipeline,
    startDate: startDate,
    endDate: endDate,
    orgs: orgs
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

insightsLookupActions.getComponentTypes = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-component-types`;
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

insightsLookupActions.getPipelines = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-pipelines`;
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

insightsLookupActions.getTasks = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-tasks`;
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

insightsLookupActions.getOrgs = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/analytics/sfdc/v1/component/get-orgs`;
  return await baseActions.handleNodeAnalyticsApiGetRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

insightsLookupActions.searchComponents = async (
    getAccessToken,
    cancelTokenSource,
    startDate,
    endDate,
    componentNames,
    selectedComponentFilterData,
    pipelineComponentFilterData,
    orgsComponentFilterData,
) => {
  const apiUrl = `/analytics/sfdc/v1/component`;
  const postBody = {
    startDate: startDate,
    endDate: endDate,
    fullNameArr: componentNames,
    selectedComponentFilterData: selectedComponentFilterData,
    pipelineComponentFilterData :pipelineComponentFilterData,
    orgsComponentFilterData: orgsComponentFilterData,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
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
        deploymentTotal:pipelineData.deploymentTotal,
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
        deployments: data.deploymentTotal,
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
        deployments: pipeline.deploymentTotal,
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
