import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlay, faStop} from "@fortawesome/pro-light-svg-icons";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingIcon from "components/common/icons/LoadingIcon";

// TODO: This needs to be completely rewritten. It was causing massive amounts of data pulls
function TaskAksActionButtons(
  {
    gitTasksData,
    status,
    runCount,
  }) {
  const [isStarting, setIsStarting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    if (status !== "stopped") {
      setIsStarting(false);
    }

    if (status !== "running") {
      setIsCanceling(false);
    }
  }, [status, runCount]);

  const handleRunTask = async () => {
    try {
      await taskActions.createAksClusterWithTaskIdV2(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      toastContext.showSuccessDialog("AKS Cluster Creation Triggered Successfully");
      setIsStarting(true);
    } catch (error) {
      setIsStarting(false);
      console.log(error);
      if (error?.error?.response?.data?.message) {
        toastContext.showCreateFailureResultDialog("AKS Cluster", error.error.response.data.message);
      } else {
        toastContext.showCreateFailureResultDialog(
          "AKS Cluster",
          "A service level error has occurred in creation of the AKS Cluster - check the Activity Logs for a complete error log."
        );
      }
    }
  };

  const handleCancelRunTask = async (automatic) => {
    try {
      setIsCanceling(true);
      await taskActions.stopTask(getAccessToken, cancelTokenSource, gitTasksData);
      await taskActions.logAksClusterCancellation(getAccessToken, cancelTokenSource, gitTasksData);

      if (automatic) {
        toastContext.showInformationToast(
          "Automatic status checks have been paused, please use the manual status check button in order to check the cluster status."
        );
      } else {
        toastContext.showInformationToast("Task has been cancelled", 10);
      }
    } catch (error) {
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
    return (
      <Button
        variant={"danger"}
        disabled={status !== "running" || isCanceling || isStarting}
        onClick={() => {
          handleCancelRunTask(false);
        }}
        size={"sm"}
      >
        {getCancelLabel()}
      </Button>
    );
  };

  const getRunButton = () => {
    return (
      <Button
        variant={"success"}
        disabled={status === "running" || isCanceling || isStarting}
        onClick={() => {
          handleRunTask(true);
        }}
        className={"mr-2"}
        size={"sm"}
      >
        {getRunningLabel()}
      </Button>
    );
  };

  if (gitTasksData?.getData("type") !== TASK_TYPES.AZURE_CLUSTER_CREATION) {
    return null;
  }

  return (
    <div>
      {getRunButton()}
      {getCancelButton()}
    </div>
  );
}

TaskAksActionButtons.propTypes = {
  gitTasksData: PropTypes.object,
  status: PropTypes.string,
  runCount: PropTypes.number,
};

export default TaskAksActionButtons;
