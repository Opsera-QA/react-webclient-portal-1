import baseActions from "utils/actionsBase";

export const informaticaRunParametersActions = {};

informaticaRunParametersActions.findExistingRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/informatica/run-parameters/${pipelineId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.getNewRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/informatica/run-parameters/${pipelineId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.getComponentTypesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_component_types`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};