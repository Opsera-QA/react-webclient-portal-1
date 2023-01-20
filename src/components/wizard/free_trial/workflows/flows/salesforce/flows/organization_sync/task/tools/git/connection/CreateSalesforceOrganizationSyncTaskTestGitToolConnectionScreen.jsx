import React from "react";
import PropTypes from "prop-types";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";

export default function CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen({
  setCurrentScreen,
  setButtonContainer,
  gitToolId,
  gitToolOption,
  flow,
}) {
  const onSuccessFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      flow={flow}
      className={"m-3"}
      successText={"Continuing to the next screen to register your Salesforce Account in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  flow: PropTypes.string,
};

