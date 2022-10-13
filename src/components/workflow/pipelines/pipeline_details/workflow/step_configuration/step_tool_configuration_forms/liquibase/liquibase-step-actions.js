import baseActions from "utils/actionsBase";

const LiquibaseStepActions = {};

LiquibaseStepActions.getTags = async (getAccessToken, cancelTokenSource, toolId, database, schema) => {
  const apiUrl = `tools/${toolId}/liquibase/tags`;

  const urlParams = {
    params: {
      database: database,
      schema: schema
    },
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default LiquibaseStepActions;
