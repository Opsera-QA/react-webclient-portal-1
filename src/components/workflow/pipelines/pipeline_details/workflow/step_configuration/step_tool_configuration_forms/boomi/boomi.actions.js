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
    if (response && response.status === 200) {
        return response.data;
    }
    return [];
};

BoomiActions.getEnvironments = async (dataObject, getAccessToken, cancelTokenSource) => {
    const apiUrl = `/tools/boomi/environments`;
    const postBody = {
        toolId: dataObject?.getData("boomiToolId"),
    };
    let response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
    if (response && response.status === 200) {
        return response.data;
    }
    return [];
};

export default BoomiActions;
