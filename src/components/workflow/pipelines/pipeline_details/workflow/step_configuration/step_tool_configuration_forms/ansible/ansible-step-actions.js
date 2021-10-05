import baseActions from "../../../../../../../../utils/actionsBase";

const AnsibleStepActions = {};

AnsibleStepActions.getScmRepositoryFiles = async (getAccessToken, cancelTokenSource, playbookFilePath, defaultBranch, gitToolId, projectId, workspace, service) => {
  const apiUrl = `/tools/scm/getFilesUnderPath`;
  const postBody = {
    branch: defaultBranch,
    filePath: playbookFilePath,
    gitToolId: gitToolId,
    projectId: projectId,
    workspace: workspace,
    service: service,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
  
};

AnsibleStepActions.getConfigurations = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/ansible/configurations/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

export default AnsibleStepActions;
