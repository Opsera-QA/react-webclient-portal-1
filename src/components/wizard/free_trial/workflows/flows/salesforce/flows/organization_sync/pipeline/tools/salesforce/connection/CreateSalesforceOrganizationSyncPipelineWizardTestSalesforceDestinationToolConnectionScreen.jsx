import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";

export default function CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen(
  {
    pipeline,
    setPipeline,
    setCurrentScreen,
    salesforceToolId,
  }) {
  const onSuccessFunction = () => {
    setPipeline({...salesforcePipelineHelper.updateSourceSalesforceToolIdForSalesforcePipelineSteps(pipeline, salesforceToolId)});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
  };

  const onFailureFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
  };

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={"m-3"}
      onSuccessFunction={onSuccessFunction}
      toolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      toolName={"Sfdc"}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen.propTypes = {
  pipeline: PropTypes.string,
  salesforceToolId: PropTypes.string,
  setPipeline: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

