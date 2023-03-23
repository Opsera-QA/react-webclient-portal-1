import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
  from "components/wizard/portal/workflows/flows/tools/salesforce/CreateWorkflowWizardTestSalesforceToolConnectionScreenBase";

export default function CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    salesforceToolId,
    setConnectionFailure
  }) {
  const onSuccessFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  };

  const onFailureFunction = () => {
    setConnectionFailure(true);
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_DESTINATION_SALESFORCE_ACCOUNT_SCREEN);
  };

  return (
    <CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
      onSuccessFunction={onSuccessFunction}
      salesforceToolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      type={"Destination"}
      successText={"Continuing to the next screen to finish initializing your new Salesforce Pipeline in a few seconds..."}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  setConnectionFailure: PropTypes.func,
};

