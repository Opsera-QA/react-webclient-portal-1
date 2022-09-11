import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";

export default function CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen(
  {
    pipeline,
    setCurrentScreen,
    setButtonContainer,
    gitToolId,
    gitToolOption,
    flow,
  }) {
  const onSuccessFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      setCurrentScreen={setCurrentScreen}
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      jenkinsToolId={salesforcePipelineHelper.getJenkinsToolIdFromCreatePackageStep(
        pipeline,
      )}
      className={"m-3"}
      flow={flow}
      setButtonContainer={setButtonContainer}
      successText={"Continuing to the next screen to register your Source Salesforce Account in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen.propTypes = {
  pipeline: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  flow: PropTypes.string,
};
