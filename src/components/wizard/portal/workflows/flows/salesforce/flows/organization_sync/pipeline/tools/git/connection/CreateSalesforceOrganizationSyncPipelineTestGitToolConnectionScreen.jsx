import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS,
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/portal/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";

export default function CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen(
  {
    pipeline,
    setCurrentScreen,
    setButtonContainer,
    gitToolId,
    gitToolOption,
    flow,
    setConnectionFailure
  }) {
  const onSuccessFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setConnectionFailure(true);
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_SOURCE_GIT_ACCOUNT_SCREEN,
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
  setConnectionFailure: PropTypes.bool
};
