import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";

export default function CreateWorkflowWizardSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen(
  {
    pipeline,
    setPipeline,
    setCurrentScreen,
    gitToolId,
    gitToolOption,
  }) {
  const onSuccessFunction = () => {
    setPipeline({...salesforcePipelineHelper.updateGitToolIdForSalesforcePipelineSteps(pipeline, false, gitToolId, gitToolOption)});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN);
  };

  const onFailureFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      setCurrentScreen={setCurrentScreen}
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      jenkinsToolId={salesforcePipelineHelper.getJenkinsToolIdFromCreatePackageStep(pipeline)}
    />
  );
}

CreateWorkflowWizardSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen.propTypes = {
  pipeline: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setPipeline: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

