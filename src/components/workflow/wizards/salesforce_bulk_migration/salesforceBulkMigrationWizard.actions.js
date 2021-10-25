import baseActions from "utils/actionsBase";

const salesforceBulkMigrationWizardActions = {};

salesforceBulkMigrationWizardActions.createNewRecordV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    gitTaskId: pipelineWizardModel.getData("gitTaskId"),
    gitToolId: pipelineWizardModel.getData("gitToolId"),
    sfdcToolId: pipelineWizardModel.getData("sfdcToolId"),
    sfdcDestToolId: pipelineWizardModel.getData("sfdcDestToolId"),
    runCount: pipelineWizardModel.getData("run_count"),
  };

  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/create-record`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

salesforceBulkMigrationWizardActions.getComponentTypesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/${pipelineWizardModel?.getData("recordId")}/component-types`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

salesforceBulkMigrationWizardActions.updateSelectedComponentTypesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    selectedComponentTypes:  pipelineWizardModel?.getData("selectedComponentTypes"),
  };

  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/${pipelineWizardModel?.getData("recordId")}/component-types`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

salesforceBulkMigrationWizardActions.triggerTaskV2 = async (getAccessToken, cancelTokenSource, gitTaskId) => {
  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/${gitTaskId}/trigger-task`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default salesforceBulkMigrationWizardActions;