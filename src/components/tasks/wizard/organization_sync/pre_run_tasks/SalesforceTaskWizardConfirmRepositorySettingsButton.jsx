import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { SALESFORCE_TASK_WIZARD_SCREENS } from "components/tasks/wizard/organization_sync/SalesforceTaskWizardOverlay";
import taskActions from "components/tasks/task.actions";

export default function SalesforceTaskWizardConfirmRepositorySettingsButton(
  {
    setCurrentScreen,
    task,
    setTask,
    taskConfigurationModel,
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

  const updateTask = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      task.setData("configuration", taskConfigurationModel?.getPersistData());
      await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, task);
      setTask({...task});
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      setCurrentScreen(SALESFORCE_TASK_WIZARD_SCREENS.SALESFORCE_TASK_WIZARD);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Finishing Workflow Initialization");
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
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
      "primary",
      buttonState,
    );
  };

  if (task == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
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

SalesforceTaskWizardConfirmRepositorySettingsButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  task: PropTypes.object,
  setTask: PropTypes.func,
  taskConfigurationModel: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

