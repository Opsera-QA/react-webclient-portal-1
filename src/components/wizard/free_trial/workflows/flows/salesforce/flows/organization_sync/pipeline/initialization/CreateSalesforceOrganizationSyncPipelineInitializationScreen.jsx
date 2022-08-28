import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import CreateWorkflowWizardPipelineInitializationScreen
  from "components/wizard/free_trial/workflows/flows/pipeline/initialization/CreateWorkflowWizardPipelineInitializationScreen";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";

export default function CreateSalesforceOrganizationSyncPipelineInitializationScreen(
  {
    setPipeline,
    setCurrentScreen,
    flow,
  }) {
  const setPipelineFunction = (pipeline) => {
    setPipeline({...salesforcePipelineHelper.updateStepsForSalesforcePipeline(pipeline, flow)});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardPipelineInitializationScreen
      setPipelineFunction={setPipelineFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE}
    />
  );
}

CreateSalesforceOrganizationSyncPipelineInitializationScreen.propTypes = {
  setPipeline: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

