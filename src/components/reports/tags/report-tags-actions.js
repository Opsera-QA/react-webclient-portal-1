import baseActions from "utils/actionsBase";

const reportTagsActions = {};

reportTagsActions.getAllProjectsWithTags = async (getAccessToken, cancelTokenSource, query) => {
  const apiUrl = `/reports/projects/all-tags`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, query);
};

export default reportTagsActions;