import baseActions from "../../../../utils/actionsBase";

const sfdcDependencyAnalyserActions = {};

sfdcDependencyAnalyserActions.createNewRecord = async (getAccessToken, cancelTokenSource, model) => {
  const postBody = {
    dataType: "sfdc-packageXml",
    sfdcToolId: model.getData("sfdcToolId"),
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/create_new_instance`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default sfdcDependencyAnalyserActions;