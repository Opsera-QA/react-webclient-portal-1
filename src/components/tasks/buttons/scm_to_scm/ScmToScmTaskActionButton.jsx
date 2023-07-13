import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlay, faStop} from "@fortawesome/pro-light-svg-icons";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingIcon from "components/common/icons/LoadingIcon";

function ScmToScmTaskActionButton(
  {
    gitTasksData,
    status,
    runCount,
  }) {

  const [isStarting, setIsStarting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const {
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (status !== "stopped") {
      setIsStarting(false);
    }
  }, [status, runCount]);

  const handleRunTask = async () => {
    try {
      setIsStarting(true);
      let postBody = {
        taskId: gitTasksData?.getData("_id"),
      };
      await taskActions.runTaskV3(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"), postBody);
      toastContext.showSuccessDialog("SCM to SCM migration Task Triggered Successfully");
    } catch (error) {
      setIsStarting(false);
      console.error(error);
      if (error?.error?.response?.data?.message) {
        toastContext.showCreateFailureResultDialog("SCM to SCM migration Task", error.error.response.data.message);
      } else {
        toastContext.showCreateFailureResultDialog(
          "SCM to SCM migration Task",
          "A service level error has occurred in creation of the SCM to SCM migration Task - check the Activity Logs for a complete error log."
        );
      }
    }
  };

  const handleCancelRunTask = async (automatic) => {
    try {
      setIsCanceling(true);
      await taskActions.stopTaskV3(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      if (automatic) {
        toastContext.showInformationToast(
          "Automatic status checks have been paused, please use the manual status check button in order to check the cluster status."
        );
      } else {
        toastContext.showInformationToast("Task has been cancelled", 10);
      }
    } catch (error) {
      setIsCanceling(false);
      toastContext.showSystemErrorToast(error, "There was an issue canceling this Task:");
    }
  };

  const getRunningLabel = () => {
    if (isStarting === true) {
      return (
        <span>
        <LoadingIcon className={"mr-2"}/>
          Starting Task
        </span>
      );
    }

    if (status === "running") {
      return (
        <span>
        <LoadingIcon className={"mr-2"}/>
          Running Task
        </span>
      );
    }

    return (
      <span>
          <IconBase icon={faPlay} className={"mr-2"}/>
        Run Task
      </span>
    );
  };

  const getRunButton = () => {
    return (
      <Button
        variant={"success"}
        disabled={status === "running"}
        onClick={() => {
          handleRunTask();
        }}
        className={"mr-2"}
        size={"sm"}
      >
        {getRunningLabel()}
      </Button>
    );
  };

  
  const getCancelLabel = () => {
    if (isCanceling) {
      return (
        <span>
        <LoadingIcon className={"mr-2"}/>
          Cancelling
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faStop} className={"mr-2"}/>
        Cancel Task
      </span>
    );
  };

  const getCancelButton = () => {
    if (status !== "running") {
      return null;
    }
    return (
      <Button
        variant={"danger"}
        disabled={status !== "running"}
        onClick={() => {
          handleCancelRunTask(false);
        }}
        size={"sm"}
      >
        {getCancelLabel()}
      </Button>
    );
  };

  if (gitTasksData?.getData("type") !== TASK_TYPES.SCM_TO_SCM_MIGRATION) {
    return null;
  }

  return (
    <div>
      {getRunButton()}
      {getCancelButton()}      
    </div>
  );
}

ScmToScmTaskActionButton.propTypes = {
  gitTasksData: PropTypes.object,
  status: PropTypes.string,
  runCount: PropTypes.number,
};

export default ScmToScmTaskActionButton;
