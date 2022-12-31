import baseActions from "utils/actionsBase";

const packerStepActions = {};

packerStepActions.getPackerTags = async (getAccessToken, cancelTokenSource) => {
    const apiUrl = "/tools/packer/tags";
    return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default packerStepActions;
