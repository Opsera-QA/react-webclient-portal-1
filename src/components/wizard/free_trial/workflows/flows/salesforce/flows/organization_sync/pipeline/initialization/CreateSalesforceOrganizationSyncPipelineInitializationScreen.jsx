import React, { useEffect } from "react";
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
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";

const getButtonContainer = (stepBackFromWizardFunction,) => {
  return (
    <ButtonContainerBase
      leftSideButtons={getLeftHandButtons(stepBackFromWizardFunction)}
      className={"p-3"}
    />
  );
};

const getLeftHandButtons = () => {
  return (
    <div className={"d-flex"}>
      <BackButtonBase
        disabled={true}
        className={"mr-2"}
      />
      <CancelOverlayButton />
    </div>
  );
};

export default function CreateSalesforceOrganizationSyncPipelineInitializationScreen(
  {
    setPipeline,
    setCurrentScreen,
    setButtonContainer,
    flow,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(getButtonContainer());
    }
  }, []);

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
  setButtonContainer: PropTypes.func,
};

