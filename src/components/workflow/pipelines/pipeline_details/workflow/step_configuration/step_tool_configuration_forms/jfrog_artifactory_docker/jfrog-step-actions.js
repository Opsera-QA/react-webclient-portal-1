import baseActions from "../../../../../../../../utils/actionsBase";

const JFrogStepActions = {};

JFrogStepActions.getRepos = async (id,type, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/jfrog/repositories/${id}/${type}`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default JFrogStepActions;