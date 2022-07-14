import baseActions from "../../../../../../../../utils/actionsBase";

const BoomiActions = {};

BoomiActions.getSCMRepoFiles = async (dataObject, getAccessToken, cancelTokenSource) => {
    const apiUrl = `/tools/scm/getFilesUnderPath`;
    const postBody = {
        branch: dataObject?.getData("gitBranch"),
        filePath: dataObject?.getData("filePath"),
        gitToolId: dataObject?.getData("gitToolId"),
        projectId: dataObject?.getData("repoId"),
        workspace: dataObject?.getData("workspace"),
        service: dataObject?.getData("service"),
    };
    let response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
    return response;
};

BoomiActions.getEnvironments = async (dataObject, getAccessToken, cancelTokenSource) => {
    const apiUrl = `/tools/${dataObject?.getData("boomiToolId")}/boomi/environments`;
    let response = await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
    return response;
};

export default BoomiActions;
