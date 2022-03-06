import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faLaptopMedical, faPlay, faStop } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {TASK_TYPES} from "components/tasks/task.types";

// TODO: This needs to be completely rewritten. It was causing massive amounts of data pulls
function TasksEcsActionButtons(
  {
    gitTasksData,
    disable,
    status,
  }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCheckingStatus, setCheckStatus] = useState(false);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setIsTaskRunning(status === "running");

    if (status === "running" && gitTasksData?.getData("type") === TASK_TYPES.AWS_CREATE_ECS_CLUSTER) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, [status]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await startTaskPolling(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startTaskPolling = async (cancelSource = cancelTokenSource, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }
    const taskAtHand = await getTaskStatus(cancelSource);
    console.log("task at hand status: " + JSON.stringify(taskAtHand?.status));

    if (count > 15) {
      await handleCancelRunTask(true);
    }

    if (taskAtHand?.status === "running") {
      let timeout = 15000;
      if (count > 4) {
        timeout = timeout * count;
      }
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, timeout)));
      return await startTaskPolling(cancelSource, count + 1);
    }
    else {
      setIsTaskRunning(false);
    }
  };

  const getTaskStatus = async (cancelSource = cancelTokenSource) => {
    console.info("tasks ecs check status");
    const response = await taskActions.getTaskByIdV2(getAccessToken, cancelSource, gitTasksData.getData("_id"));
    const taskData = response?.data?.data;

    if (isMounted?.current === true && taskData) {
      if (taskData?.status !== "running") {
        setIsLoading(false);
        setIsTaskRunning(false);
      }

      return taskData;
    }
  };

  const handleRunTask = async () => {
    try {
      setIsLoading(true);
      await taskActions.createEcsClusterWithTaskIdV2(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      toastContext.showSuccessDialog("ECS Cluster Creation Triggered Successfully");
      setIsTaskRunning(true);
      await startTaskPolling();
    } catch (error) {
      setIsTaskRunning(false);
      isMounted.current = false;
      console.log(error);

      if (error?.error?.response?.data?.message) {
        toastContext.showCreateFailureResultDialog("ECS Cluster", error.error.response.data.message);
      } else {
        toastContext.showCreateFailureResultDialog(
          "ECS Cluster",
          "A service level error has occurred in creation of the ECS Cluster - check the Activity Logs for a complete error log."
        );
      }

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRunTask = async (automatic) => {
    setIsCanceling(true);
    let gitTaskDataCopy = gitTasksData;
    gitTaskDataCopy.setData("status", "stopped");
    await taskActions.updateGitTaskV2(getAccessToken, axios.CancelToken.source(), gitTaskDataCopy);
    await taskActions.logClusterCancellation(getAccessToken, axios.CancelToken.source(), gitTaskDataCopy);
    setIsTaskRunning(true);
    isMounted.current = false;

    if (automatic) {
      toastContext.showInformationToast(
        "Automatic status checks have been paused, please use the manual status check button in order to check the cluster status."
      );
    } else {
      toastContext.showInformationToast("Task has been cancelled", 10);
    }

    gitTasksData.setData("status", "stopped");
    setIsCanceling(false);
    window.location.reload();
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
        setCheckStatus(false);
      } finally {
        setCheckStatus(false);
      }
    }
  };

  const getRunningLabel = () => {
    if (isTaskRunning === false) {
      return (
        <span>
          <IconBase icon={faPlay} className={"mr-1"} />
          Run Task
        </span>
      );
    }
    return (
      <span>
        <LoadingIcon className={"mr-2"} />
        Running Task
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
        <IconBase icon={faStop} className={"mr-1"} />
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
        <IconBase icon={faLaptopMedical} className={"mr-1"} />
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
        disabled={status === "running" || disable || isLoading}
        onClick={() => {
          handleCheckStatus(true);
        }}
        className="btn-default"
        size="sm"
      >
        {getStatusLabel()}
      </Button>
    );
  };

  const getCancelButton = () => {
    return (
      <Button
        variant={"danger"}
        disabled={status !== "running" || disable || isLoading}
        onClick={() => {
          handleCancelRunTask(false);
        }}
        className="btn-default"
        size="sm"
      >
        {getCancelLabel()}
      </Button>
    );
  };

  const getRunningButton = () => {
    return (
      <Button
        variant={"success"}
        disabled={status === "running" || disable || isLoading}
        onClick={() => {
          handleRunTask(true);
        }}
        className="btn-default"
        size="sm"
      >
        {getRunningLabel()}
      </Button>
    );
  };

  if (gitTasksData?.getData("type") !== TASK_TYPES.AWS_CREATE_ECS_CLUSTER) {
    return null;
  }

  return (
    <div className="text-right btn-group btn-group-sized">
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
};

export default TasksEcsActionButtons;
