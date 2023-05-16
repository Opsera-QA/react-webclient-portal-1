import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
  from "components/wizard/portal/workflows/flows/tools/salesforce/CreateWorkflowWizardTestSalesforceToolConnectionScreenBase";
import {TASK_TYPES} from "../../../../../../../../../../../tasks/task.types";

export default function CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen({
  setCurrentScreen,
  salesforceToolId,
  setButtonContainer,
  setConnectionFailure,
  flow
}) {
  const onSuccessFunction = () => {
    switch (flow) {
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY:
        setCurrentScreen(
            CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
        );
        return;
      default:
        setCurrentScreen(
            CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_JENKINS_ACCOUNT_SCREEN,
        );
    }

  };

  const onFailureFunction = () => {
    setConnectionFailure(true);
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
      onSuccessFunction={onSuccessFunction}
      salesforceToolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      successText={"Continuing to the next screen to finish initializing your new Salesforce Task in a few seconds..."}
    />
  );
}

CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  setConnectionFailure: PropTypes.func,
  flow: PropTypes.string
};

