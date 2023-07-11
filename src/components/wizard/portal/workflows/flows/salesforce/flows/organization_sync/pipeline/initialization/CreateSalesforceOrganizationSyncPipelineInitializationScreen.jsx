import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS } from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import CreateWorkflowWizardPipelineInitializationScreen from "components/wizard/portal/workflows/flows/pipeline/initialization/CreateWorkflowWizardPipelineInitializationScreen";
import { pipelineTemplateIdentifierConstants } from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {getTaskTypeLabel} from "../../../../../../../../../tasks/task.types";

export default function CreateSalesforceOrganizationSyncPipelineInitializationScreen(
  {
    gitToolId,
    gitToolOption,
    sourceSalesforceToolId,
    destinationSalesforceToolId,
    setPipeline,
    setCurrentScreen,
    setButtonContainer,
    flow,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase />
      );
    }
  }, []);

  const setPipelineFunction = (pipeline) => {
    const updatedPipeline = salesforcePipelineHelper.updateSalesforceOrgSyncPipeline(
      pipeline,
      flow,
      gitToolId,
      gitToolOption,
      sourceSalesforceToolId,
      destinationSalesforceToolId,
    );
    setPipeline({ ...updatedPipeline });
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN);
  };

  return (
    <CreateWorkflowWizardPipelineInitializationScreen
      setPipelineFunction={setPipelineFunction}
      type={getTaskTypeLabel(flow)}
      templateIdentifier={pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineInitializationScreen.propTypes = {
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  sourceSalesforceToolId: PropTypes.string,
  destinationSalesforceToolId: PropTypes.string,
  setPipeline: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

