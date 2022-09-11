import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../../../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";
import CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardTestSalesforceToolConnectionScreenBase";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen({
  setCurrentScreen,
  setButtonContainer,
  salesforceToolId,
}) {
  const onSuccessFunction = () => {
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_DESTINATION_GIT_ACCOUNT_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
      className={"m-3"}
      onSuccessFunction={onSuccessFunction}
      salesforceToolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      toolName={"Sfdc"}
      successText={"Continuing to the next screen to register your Destination Git Account in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

