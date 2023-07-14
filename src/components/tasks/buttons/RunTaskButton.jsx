import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
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
import SalesforceBulkMigrationTaskWizardOverlay
  from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationTaskWizardOverlay";
import SalesforceBranchStructureTaskInitializationOverlay
  from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskInitializationOverlay";
import GitToGitSyncTaskInitializationOverlay
  from "components/tasks/details/tasks/branch-to-branch/run/GitToGitSyncTaskInitializationOverlay";
import SalesforceCustomSettingMigrationTaskWizardOverlay
  from "../details/tasks/sfdc-custom-setting-migration/wizard/SalesforceCustomSettingMigrationTaskWizardOverlay";
import SalesforceDataSeedingTaskWizardOverlay
  from "../details/tasks/sfdc-data-seeding/wizard/SalesforceDataSeedingTaskWizardOverlay";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_GIT_BRANCHES,
  TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  TASK_TYPES.SALESFORCE_BULK_MIGRATION,
  TASK_TYPES.GIT_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_QUICK_DEPLOY,
  TASK_TYPES.SALESFORCE_CUSTOM_SETTING_MIGRATION,
  TASK_TYPES.SALESFORCE_DATA_SEEDING,
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
    runCount,
    style,
    routeToWorkflow
  }) {
  const [isStarting, setIsStarting] = useState(false);
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  useEffect(() => {
    if (status !== "stopped") {
      setIsStarting(false);
    }
  }, [status, runCount]);

  const handleClose = () => {
    toastContext.clearOverlayPanel();
    // TODO: This should be passed to modal
    setIsStarting(true);
  };

  const getToolTip = () => {
    if (!actionAllowed) {
      return "Your Access Role Level Prevents Running Tasks";
    }
    if (disable) {
      return "Running of the Task is disabled until configuration and connection information is fixed.";
    }
    return null;
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

    const launchWorkflow = () => {
      if (routeToWorkflow) {
        handleClose();
        history.push(`/task/details/${taskModel?.getData("_id")}`);
      }
    };

    return (
      <Button
        variant={"success"}
        style={style}
        disabled={status === "running" || disable || isStarting || actionAllowed !== true}
        onClick={() => {
          launchWorkflow();
          showTaskRunOverlay();
        }}
      >
        <TooltipWrapper innerText={getToolTip()}>
          {taskModel?.getData("status") === "running" ?
            (<span><IconBase isLoading={true} className={"mr-2"}/>Running Task</span>)
            : (<span><IconBase icon={faPlay} className={"mr-2"} fixedWidth/>Run Task</span>)}
        </TooltipWrapper>
      </Button>
    );
  };

  const showTaskRunOverlay = async () => {
    setIsStarting(true);
    switch (taskModel?.getData("type")) {

      case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
        try{
          setIsStarting(true);
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
        break;
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        try{
          setIsStarting(true);
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
        break;
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        handleClose();
        toastContext.showOverlayPanel(
          <SalesforceOrganizationSyncTaskWizardOverlay
            taskModel={taskModel}
          />
        );
        break;
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
        handleClose();
        toastContext.showOverlayPanel(
          <SalesforceBulkMigrationTaskWizardOverlay
            taskModel={taskModel}
          />
        );
        break;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        handleClose();
        toastContext.showOverlayPanel(
          <SalesforceBranchStructureTaskInitializationOverlay
            taskModel={taskModel}
          />
        );
        break;
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        handleClose();
        toastContext.showOverlayPanel(
          <GitToGitSyncTaskInitializationOverlay
            taskModel={taskModel}
          />
        );
        break;
      case TASK_TYPES.SALESFORCE_CUSTOM_SETTING_MIGRATION:
        try{
          setIsStarting(true);
          handleClose();
          toastContext.showOverlayPanel(
            <SalesforceCustomSettingMigrationTaskWizardOverlay
              taskModel={taskModel}
            />
          );
        } catch (error) {
          if (isMounted?.current === true) {
            toastContext.showLoadingErrorDialog(error);
          }
        }
        break;
      case TASK_TYPES.SALESFORCE_DATA_SEEDING:
        try{
          setIsStarting(true);
          handleClose();
          toastContext.showOverlayPanel(
            <SalesforceDataSeedingTaskWizardOverlay
              taskModel={taskModel}
            />
          );
        } catch (error) {
          if (isMounted?.current === true) {
            toastContext.showLoadingErrorDialog(error);
          }
        }
        break;
      default:
        return toastContext.showOverlayPanel(
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
  runCount: PropTypes.number,
  style: PropTypes.object,
  routeToWorkflow: PropTypes.bool
};

RunTaskButton.defaultProps = {
  routeToWorkflow: false
};


export default RunTaskButton;