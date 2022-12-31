import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faLaptopMedical, faPlay, faStop } from "@fortawesome/pro-light-svg-icons";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {TASK_TYPES} from "components/tasks/task.types";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: This needs to be completely rewritten. It was causing massive amounts of data pulls
function TasksEcsActionButtons(
  {
    gitTasksData,
    disable,
    status,
    runCount,
  }) {
  const [isStarting, setIsStarting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCheckingStatus, setCheckStatus] = useState(false);
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
      setIsStarting(true);
      await taskActions.createEcsClusterWithTaskIdV2(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      toastContext.showSuccessDialog("ECS Cluster Creation Triggered Successfully");
    } catch (error) {
      setIsStarting(false);
      console.log(error);

      if (error?.error?.response?.data?.message) {
        toastContext.showCreateFailureResultDialog("ECS Cluster", error.error.response.data.message);
      } else {
        toastContext.showCreateFailureResultDialog(
          "ECS Cluster",
          "A service level error has occurred in creation of the ECS Cluster - check the Activity Logs for a complete error log."
        );
      }
    }
  };

  const handleCancelRunTask = async (automatic) => {
    try {
      setIsCanceling(true);
      let gitTaskDataCopy = gitTasksData;
      gitTaskDataCopy.setData("status", "stopped");
      await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, gitTaskDataCopy);
      await taskActions.logClusterCancellation(getAccessToken, cancelTokenSource, gitTaskDataCopy);

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

  const handleCheckStatus = async () => {
    if (gitTasksData.getData("type") === "ecs_cluster_creation") {
      try {
        setCheckStatus(true);
        let postBody = {
          taskId: gitTasksData.getData("_id"),
        };
        await taskActions.checkECSStatus(postBody, getAccessToken);
        toastContext.showSuccessDialog("Status check successful. View Activity Logs for a detailed report");
      } catch (error) {
        console.log(error);
      } finally {
        setCheckStatus(false);
      }
    }
  };

  const getRunningLabel = () => {
    if (isStarting === true) {
      return (
        <span>
          <LoadingIcon className={"mr-2"} />
          Starting Task
        </span>
      );
    }

    if (status === "running") {
      return (
        <span>
        <LoadingIcon className={"mr-2"} />
          Running Task
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faPlay} className={"mr-2"} />
        Run Task
      </span>
    );
  };

  const getCancelLabel = () => {
    if (isCanceling) {
      return (
        <span>
          <LoadingIcon className={"mr-2"} />
          Cancelling
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faStop} className={"mr-2"} />
        Cancel Task
      </span>
    );
  };

  const getStatusLabel = () => {
    if (isCheckingStatus) {
      return (
        <span>
          <LoadingIcon className={"mr-2"} />
          Checking Status
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faLaptopMedical} className={"mr-2"} />
        Check Status
      </span>
    );
  };

  const getStatusButton = () => {
    if (
      !gitTasksData?.getData("configuration")?.stackId ||
      gitTasksData?.getData("configuration")?.stackId?.length === 0 ||
      gitTasksData?.run_count === 0
    ) {
      return null;
    }

    return (
      <Button
        variant={"warning"}
        disabled={status === "running" || disable || isStarting || isCanceling}
        onClick={() => {
          handleCheckStatus(true);
        }}
        size={"sm"}
      >
        {getStatusLabel()}
      </Button>
    );
  };

  const getCancelButton = () => {
    return (
      <Button
        variant={"danger"}
        disabled={status !== "running" || disable || isStarting || isCanceling}
        onClick={() => {
          handleCancelRunTask(false);
        }}
        className={"mr-2"}
        size={"sm"}
      >
        {getCancelLabel()}
      </Button>
    );
  };

  const getRunningButton = () => {
    return (
      <Button
        variant={"success"}
        disabled={status === "running" || disable || isStarting}
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

  if (gitTasksData?.getData("type") !== TASK_TYPES.AWS_CREATE_ECS_CLUSTER) {
    return null;
  }

  return (
    <div>
      {getRunningButton()}
      {getCancelButton()}
      {getStatusButton()}
    </div>
  );
}

TasksEcsActionButtons.propTypes = {
  gitTasksData: PropTypes.object,
  disable: PropTypes.bool,
  status: PropTypes.string,
  runCount: PropTypes.number,
};

export default TasksEcsActionButtons;
