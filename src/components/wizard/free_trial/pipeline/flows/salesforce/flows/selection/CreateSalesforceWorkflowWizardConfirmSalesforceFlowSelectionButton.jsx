import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforceWorkflowWizard";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  SALESFORCE_FLOW_OPTIONS
} from "components/wizard/free_trial/pipeline/salesforce_flow/flow_selection/CreateSalesforcePipelineWizardFlowSelectionScreen";
import pipelineActions from "components/workflow/pipeline-actions";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { Button } from "react-bootstrap";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";

export default function CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton(
  {
    setCurrentScreen,
    selectedFlow,
    setPipelineId,
    setPipeline,
    setIsTaskFlag,
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

      const newPipeline = response?.data;

      if (isMongoDbId(newPipeline?._id)) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setPipelineId(newPipeline?._id);
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

  const initializeSalesforceTaskTemplate = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);

      // template for org-sync task
      const template = {
        "name" : "Freetrial : Sync Org Task",
        "description" : "",
        "type" : "sync-sfdc-repo",
        "tool_identifier" : "",
        "active" : true,
        "status" : "created",
        "configuration" : {
          "type" : "",
          "jobType" : "SFDC_GIT_SYNC",
          "toolConfigId" : "60c307fb5ac28205e841343b", // this is hardcoded, TODO make it more dynamic
          "autoScaleEnable" : false,
          "jobName" : "",
          "projectId" : "",
          "buildType" : "ant",
          "gitToolId" : "",
          "gitUrl" : "",
          "sshUrl" : "",
          "service" : "",
          "workspace" : "",
          "repository" : "",
          "gitBranch" : "",
          "sourceBranch" : "",
          "defaultBranch" : "",
          "dependencyType" : "",
          "sfdcToolId" : "",
        }
      };

      const newTaskTemplateModel = modelHelpers.parseObjectIntoModel(template, salesforceOrganizationSyncTaskConfigurationMetadata);
      const response = await taskActions.createTaskV2(getAccessToken, cancelTokenSource, newTaskTemplateModel);
      const newTask = response?.data;

      if (isMongoDbId(newTask?._id)) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setIsTaskFlag(true);
        setPipelineId(newTask?._id);
        setPipeline(newTask);
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
        await initializeSalesforceTaskTemplate();
        break;
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
            icon={faCheckCircle}
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
  setIsTaskFlag: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

