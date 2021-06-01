import baseActions from "../../../../../../../../utils/actionsBase";

const KafkaConnectActions = {};

KafkaConnectActions.getSCMRepoFiles = async (dataObject, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/scm/getFilesUnderPath`;
  const postBody = {
    branch: dataObject?.getData("gitBranch"),
    filePath: dataObject?.getData("connectorFilePath"),
    gitToolId: dataObject?.getData("gitToolId"),
    projectId: dataObject?.getData("repoId"),
    service: dataObject?.getData("service"),
  };
  let response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default KafkaConnectActions;
