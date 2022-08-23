import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateButton from "components/common/buttons/saving/CreateButton";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  SALESFORCE_FLOW_OPTIONS
} from "components/wizard/free_trial/pipeline/salesforce_flow/flow_selection/CreateSalesforcePipelineWizardFlowSelectionScreen";
import pipelineActions from "components/workflow/pipeline-actions";
import IconBase from "components/common/icons/IconBase";
import { faSave } from "@fortawesome/pro-light-svg-icons";
import { Button } from "react-bootstrap";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton(
  {
    setCurrentScreen,
    selectedFlow,
    setPipelineId,
    setPipeline,
    disabled,
    className,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const initializeSalesforcePipelineTemplate = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await pipelineActions.deployTemplateV2(
        getAccessToken,
        cancelTokenSource,
        "630386aebcb7dc0019d1c2c9", // TODO: how to dynamically pull this?
      );

      console.log("response: " + JSON.stringify(response));
      const pipelineId = response?.data?._id;

      if (isMongoDbId(pipelineId)) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setPipelineId(pipelineId);
        setPipeline(response?.data);
        setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(error, "Error Initializing Salesforce Workflow:");
      }
    }
  };

  const confirmFlow = async () => {
    switch (selectedFlow) {
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC:
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING:
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP:
        await initializeSalesforcePipelineTemplate();
        break;
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_ORGANIZATION_SYNC_TASK:
        console.log("adding soon");
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      buttonState,
      "Confirm Salesforce Workflow",
      "Initializing Salesforce Workflow",
      "Initialized Salesforce Workflow!",
      "Error Initializing Salesforce Workflow!",
    );
  };

  const getButtonVariant = () => {
    return buttonLabelHelper.getVariantForState(
      "primary",
      buttonState,
    );
  };

  return (
    <div className={className}>
      <ButtonContainerBase>
        <Button
          disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY || disabled}
          onClick={confirmFlow}
          variant={getButtonVariant()}
        >
        <span>
          <IconBase
            isLoading={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
            icon={faSave}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
        </Button>
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  selectedFlow: PropTypes.string,
  setPipelineId: PropTypes.func,
  setPipeline: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

