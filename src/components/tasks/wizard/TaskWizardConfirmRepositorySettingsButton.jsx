import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS } from "components/tasks/wizard/organization_sync/SalesforceOrganizationSyncTaskWizardOverlay";
import taskActions from "components/tasks/task.actions";

export default function TaskWizardConfirmRepositorySettingsButton(
  {
    setCurrentScreen,
    taskModel,
    disabled,
    className,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
    isMounted,
  } = useComponentStateReference();

  const getValidateBranchNameParams = (type) => {
    const model = taskModel.getData(`${type === 'sync-sfdc-repo' ? 'configuration' : 'configuration.git'}`);

    if(!model.projectId || !model.service){
      return Promise.reject('Error in validating branch name');
    }

    switch(type){
      case 'SFDC_GIT_COMPARE_SYNC':
        if((model.isNewBranch && !model.upstreamBranch) || !model.targetBranch || !model.toolId){
          return Promise.reject('Error in validating branch name');
        }

        return {
          toolId: model.toolId,
          branchName: model.targetBranch,
          repositoryId: model.projectId,
          service: model.service,
          workspace: model.service === 'bitbucket' ? model.workspace : undefined,
          isNewBranch: model.isNewBranch,
          upstreamBranch: model.upstreamBranch,
        };
      case 'GIT_VS_GIT_SYNC':
        if((model.isNewBranch && !model.upstreamBranch) || !model.targetBranch || !model.toolId){
          return Promise.reject('Error in validating branch name');
        }

        return {
          toolId: model.toolId,
          branchName: model.targetBranch,
          repositoryId: model.projectId,
          service: model.service,
          workspace: model.service === 'bitbucket' ? model.workspace : undefined,
          isNewBranch: model.isNewBranch,
          upstreamBranch: model.upstreamBranch,
          sourceBranch: model.sourceBranch,
        };
      case 'sync-sfdc-repo':
        if((model.isNewBranch && !model.upstreamBranch) || !model.defaultBranch || !model.gitToolId){
          return Promise.reject('Error in validating branch name');
        }

        return {
          toolId: model.gitToolId,
          branchName: model.defaultBranch,
          repositoryId: model.projectId,
          service: model.service,
          workspace: model.service === 'bitbucket' ? model.workspace : undefined,
          isNewBranch: model.isNewBranch,
          upstreamBranch: model.upstreamBranch,
        };
      default:
        return Promise.reject('Error in validating branch name');
    }
  };

  const updateTask = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      if(['SFDC_GIT_COMPARE_SYNC', 'GIT_VS_GIT_SYNC', 'sync-sfdc-repo'].includes(taskModel.getData('type'))){
        const params = await getValidateBranchNameParams(taskModel.getData('type'));
        await taskActions.validateBranchName(getAccessToken, cancelTokenSource, params);
      }
      await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, taskModel);
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      setCurrentScreen(SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS.SALESFORCE_TASK_WIZARD);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Finishing Workflow Initialization");
        setButtonState(buttonLabelHelper.BUTTON_STATES.READY);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      buttonState,
      "Confirm Repository Settings",
      "Saving Repository Settings",
      "Saved Repository Settings!",
      "Error Saving Repository Settings!",
    );
  };

  const getButtonVariant = () => {
    return buttonLabelHelper.getVariantForState(
      "success",
      buttonState,
    );
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        disabled={
          buttonState === buttonLabelHelper.BUTTON_STATES.BUSY
          || disabled === true
        }
        onClick={updateTask}
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
    </div>
  );
}

TaskWizardConfirmRepositorySettingsButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  taskModel: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
