import baseActions from "utils/actionsBase";

const fortifyStepActions = {};

fortifyStepActions.getEntitlements = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/entitlements";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getTechnologyStack = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/technologyStack";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getAuditPreference = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/auditPreference";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getAssessment = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/assessment";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getThresholdLevel = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/thresholdLevel";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getLanguageLevel = async (getAccessToken, cancelTokenSource, technology) => {
  const urlParams = {
    params: {
      technology: technology,
    },
  };
  const apiUrl = `tools/fortify/languageLevel`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

fortifyStepActions.getApplications = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/fortify/applications`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyStepActions.getReleases = async (getAccessToken, cancelTokenSource, toolId, applicationId, applicationName) => {
  const urlParams = {
    params: {
      applicationName: applicationName,
    },
  };
  const apiUrl = `tools/${toolId}/fortify/releases/${applicationId}`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default fortifyStepActions;
