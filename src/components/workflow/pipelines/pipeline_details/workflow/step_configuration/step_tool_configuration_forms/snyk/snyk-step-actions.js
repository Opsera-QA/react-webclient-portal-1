import baseActions from "utils/actionsBase";

const snykStepActions = {};

snykStepActions.getProducts = async (getAccessToken, cancelTokenSource) => {
  const apiURL = `tools/snyk/products`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiURL,
  );
};

snykStepActions.getLanguages = async (getAccessToken, cancelTokenSource) => {
  const apiURL = `tools/snyk/languages`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiURL,
  );
};

snykStepActions.getLanguageVersions = async (getAccessToken, cancelTokenSource, language) => {
  const apiURL = `tools/snyk/languages/version`;
  const urlParams = {
    params: {
      language: language,
    },
  };
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiURL,
    urlParams,
  );
};

snykStepActions.getPackagers = async (getAccessToken, cancelTokenSource, language) => {
  const apiURL = `tools/snyk/packagers`;
  const urlParams = {
    params: {
      language: language,
    },
  };
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiURL,
    urlParams,
  );
};

export default snykStepActions;
