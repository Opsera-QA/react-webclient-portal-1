import React from "react";
import PropTypes from "prop-types";
import { CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS } from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import CreateWorkflowWizardTestJenkinsToolConnectionScreenBase from "./CreateWorkflowWizardTestJenkinsToolConnectionScreenBase";

export default function CreateWorkflowWizardTestJenkinsTool({
  setCurrentScreen,
  jenkinsToolId,
  setButtonContainer,
  setConnectionFailure,
}) {
  const onSuccessFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setConnectionFailure(true);
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_JENKINS_ACCOUNT_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestJenkinsToolConnectionScreenBase
      onSuccessFunction={onSuccessFunction}
      jenkinsToolId={jenkinsToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      successText={
        "Continuing to the next screen to finish initializing your new Task in a few seconds..."
      }
    />
  );
}

CreateWorkflowWizardTestJenkinsTool.propTypes = {
  jenkinsToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  setConnectionFailure: PropTypes.func,
};
