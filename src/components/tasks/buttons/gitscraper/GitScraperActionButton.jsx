import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faPlay, faStop } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";

// TODO: This needs to be completely rewritten. It was causing massive amounts of data pulls
function GitScraperActionButton(
  {
    gitTasksData,
    status,
    runCountUpdate
  }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setIsTaskRunning(status === "running");

    if (status === "running" && gitTasksData.getData("type") === TASK_TYPES.GITSCRAPER) {
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
      await startTaskPolling(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
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
    const response = await taskActions.getTaskByIdV2(getAccessToken, cancelSource, gitTasksData.getData("_id"));
    const taskData = response?.data?.data;

    if (isMounted?.current === true && taskData) {
      return taskData;
    }
  };

  const handleRunTask = async () => {
    try {
      await taskActions.startGitscraperScan(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      toastContext.showSuccessDialog("Git Custodian Triggered Successfully");
      setIsTaskRunning(true);
      runCountUpdate();
      await startTaskPolling();
    } catch (error) {
      setIsTaskRunning(false);
      isMounted.current = false;
      console.log(error);
      if (error?.error?.response?.data?.message) {
        toastContext.showCreateFailureResultDialog("Git Custodian Scan", error.error.response.data.message);
      } else {
        toastContext.showCreateFailureResultDialog(
          "Git Custodian Scan",
          "A service level error has occurred in creation of the Git Custodian Scan - check the Activity Logs for a complete error log."
        );
      }
    }
  };

  const handleCancelRunTask = async (automatic) => {
    setIsCanceling(true);
    await taskActions.stopTask(getAccessToken, cancelTokenSource, gitTasksData);
    await taskActions.cancelGitscraperScan(getAccessToken, axios.CancelToken.source(), gitTasksData);
    setIsTaskRunning(false);
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
        <IconBase isLoading={true} className={"mr-1"} />
        Running Task
      </span>
    );
  };

  const getCancelLabel = () => {
    if (isCanceling) {
      return (
        <span>
        <IconBase isLoading={true} className={"mr-1"} />
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

  const getCancelButton = () => {
    return (
      <Button
        variant={"danger"}
        disabled={isTaskRunning !== true}
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

  const getRunButton = () => {
    return (
      <Button
        variant={"success"}
        disabled={isTaskRunning !== false}
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

  if (gitTasksData?.getData("type") !== TASK_TYPES.GITSCRAPER) {
    return null;
  }

  return (
    <div className="text-right btn-group btn-group-sized">
      {getRunButton()}
      {getCancelButton()}
    </div>
  );
}

GitScraperActionButton.propTypes = {
  gitTasksData: PropTypes.object,
  status: PropTypes.string,
  runCountUpdate: PropTypes.func
};

export default GitScraperActionButton;
