import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import RunTaskOverlay from "components/tasks/details/RunTaskOverlay";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {TASK_TYPES} from "components/tasks/task.types";
import CancelTaskButton from "components/tasks/buttons/CancelTaskButton";
import GitToGitMergeSyncTaskWizardOverlay
  from "components/tasks/details/tasks/merge_sync_task/wizard/git_to_git/GitToGitMergeSyncTaskWizardOverlay";
import SalesforceToGitMergeSyncTaskWizardOverlay
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardOverlay";
import SalesforceOrganizationSyncTaskWizardOverlay from "components/tasks/wizard/organization_sync/SalesforceOrganizationSyncTaskWizardOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_GIT_BRANCHES,
  TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  TASK_TYPES.SALESFORCE_BULK_MIGRATION,
  TASK_TYPES.GIT_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_QUICK_DEPLOY,
  TASK_TYPES.GITSCRAPER,
  TASK_TYPES.SNAPLOGIC_TASK,
];

// TODO: This should be broken into two buttons and this should be renamed as the container
function RunTaskButton(
  {
    taskModel,
    setTaskModel,
    disable,
    className,
    loadData,
    actionAllowed,
    taskType,
    status,
  }) {
  const [isStarting, setIsStarting] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const {
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    if (status !== "stopped") {
      setIsStarting(false);
    }
  }, [status]);

  const handleClose = () => {
    toastContext.clearOverlayPanel();
    // TODO: This should be passed to modal
    setIsStarting(true);
  };

  const getButton = () => {
    if (status === "running") {
      return (
        <CancelTaskButton
          className={"p-3"}
          taskModel={taskModel}
          taskType={taskModel?.getData("type")}
          actionAllowed={actionAllowed}
        />
      );
    }

    return (
      <Button
        variant={"success"}
        disabled={status === "running" || disable || isStarting || actionAllowed !== true}
        onClick={() => {
          showTaskRunOverlay();
        }}
      >
        <TooltipWrapper innerText={actionAllowed !== true ? "Your Access Role Level Prevents Running Tasks" : null}>
          {taskModel?.getData("status") === "running" ?
            (<span><IconBase isLoading={true} className={"mr-2"}/>Running Task</span>)
            : (<span><IconBase icon={faPlay} className={"mr-2"} fixedWidth/>Run Task</span>)}
        </TooltipWrapper>
      </Button>
    );
  };

  const showTaskRunOverlay = async () => {
    setIsStarting(true);
    if (taskModel?.getData("type") === TASK_TYPES.GIT_TO_GIT_MERGE_SYNC) {
      try{
        setIsStarting(true);
        // const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        // gitTasksData.setData("configuration", configuration);
        // await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
        handleClose();
        toastContext.showOverlayPanel(
          <GitToGitMergeSyncTaskWizardOverlay
            taskModel={taskModel}
          />
        );
      } catch (error) {
        if (isMounted?.current === true) {
          toastContext.showLoadingErrorDialog(error);
        }
      }
    }
    else if (taskModel?.getData("type") === TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC) {
      try{
        setIsStarting(true);
        // const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
        // gitTasksData.setData("configuration", configuration);
        // await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
        handleClose();
        toastContext.showOverlayPanel(
          <SalesforceToGitMergeSyncTaskWizardOverlay
            taskModel={taskModel}
          />
        );
      } catch (error) {
        if (isMounted?.current === true) {
          toastContext.showLoadingErrorDialog(error);
        }
      }
    }
    else if (taskModel?.getData("type") === TASK_TYPES.SYNC_SALESFORCE_REPO) {
      // const configuration = gitTasksConfigurationDataDto ? gitTasksConfigurationDataDto.getPersistData() : {};
      // gitTasksData.setData("configuration", configuration);
      // await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
      handleClose();
      toastContext.showOverlayPanel(
        <SalesforceOrganizationSyncTaskWizardOverlay
          taskModel={taskModel}
        />
      );
    }
    else {
      toastContext.showOverlayPanel(
        <RunTaskOverlay
          handleClose={handleClose}
          taskModel={taskModel}
          setTaskModel={setTaskModel}
          loadData={loadData}
        />
      );
    }
  };

  if (!ALLOWED_TASK_TYPES.includes(taskType)) {
    return null;
  }

  return (
    <div className={className}>
      {/*TODO: Make sure button is not clickable until form is valid*/}
      {getButton()}
    </div>
  );
}

RunTaskButton.propTypes = {
  taskModel: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  setTaskModel: PropTypes.func,
  className: PropTypes.string,
  actionAllowed: PropTypes.bool,
  taskType: PropTypes.string,
  status: PropTypes.string,
};

export default RunTaskButton;