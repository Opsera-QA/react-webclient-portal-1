import React from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import WorkflowWizardToolConnectionScreenBase
from "components/wizard/portal/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import CreateWorkflowWizardTestSalesforceToolConnectionScreenBase
from "components/wizard/portal/workflows/flows/tools/salesforce/CreateWorkflowWizardTestSalesforceToolConnectionScreenBase";
import OverlayWizardButtonContainerBase
from "../../../../../../../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import VanityButtonBase from "../../../../../../../../../../../../temp-library-components/button/VanityButtonBase";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";

export default function CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    salesforceToolId,
    setConnectionFailure
  }) {
  const onSuccessFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_DESTINATION_SALESFORCE_ACCOUNT_SCREEN);
  };

  const onFailureFunction = () => {
    setConnectionFailure(true);
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN);
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
  setConnectionFailure: PropTypes.func
};

