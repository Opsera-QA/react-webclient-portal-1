import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardTestSalesforceToolConnectionScreenBase";

export default function CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    salesforceToolId,
  }) {
  const onSuccessFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
  };

  const onFailureFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
      onSuccessFunction={onSuccessFunction}
      salesforceToolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      type={"Source"}
      successText={"Continuing to the next screen to register your Destination Salesforce Account in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

