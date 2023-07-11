import React from "react";
import PropTypes from "prop-types";
import CreateWorkflowWizardTestGitToolConnectionScreen
from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../../../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen({
  setCurrentScreen,
  setButtonContainer,
  gitToolId,
  gitToolOption,
}) {
  const onSuccessFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_DESTINATION_GIT_ACCOUNT_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      setButtonContainer={setButtonContainer}
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      className={"m-3"}
      successText={"Continuing to the next screen to finish initializing your new Salesforce Task in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen.propTypes = {
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

