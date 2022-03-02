import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faLaptopMedical, faPlay, faSpinner, faStop } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import { useHistory } from "react-router-dom";
import Model from "../../core/data_model/model";
import gitTasksMetadata from "./git-tasks-metadata";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

function ECSActionButtons({ gitTasksData, handleClose, disable, className }) {
  let toastContext = useContext(DialogToastContext);
  const [gitTasksDataCopy, setDataCopy] = useState(gitTasksData);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskFinished, setTaskFinished] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCheckingStatus, setCheckStatus] = useState(false);
  const history = useHistory();
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getTaskStatus(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });

    if (gitTasksDataCopy?.getData("status") && gitTasksDataCopy?.getData("status") === "running") {
      setTaskFinished(false);
      gitTasksData.setData("running");
      return;
    }

    return () => {
      setTaskFinished(true);
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, [JSON.stringify(gitTasksData.getData("status"))]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await tasksPolling(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tasksPolling = async (cancelSource = cancelTokenSource, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }
    const taskAtHand = await getTaskStatus(cancelSource);

    if (count > 15) {
      await handleCancelRunTask(true);
    }

    if (!(await checkStatus(taskAtHand)) && taskFinished === false) {
      let timeout = 15000;
      if (count > 4) {
        timeout = timeout * count;
      }
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, timeout)));
      return await tasksPolling(cancelSource, count + 1);
    }
  };

  const checkStatus = async (data) => {
    return !!(
      data?.status &&
      (data?.status === "success" ||
        data?.status === "failed" ||
        data?.status === "failure" ||
        data?.status === "stopped")
    );
  };

  const getTaskStatus = async (cancelSource = cancelTokenSource) => {
    const response = await taskActions.getGitTaskByIdV2(getAccessToken, cancelSource, gitTasksData.getData("_id"));
    const data = response?.data?.data[0];
    if (isMounted?.current === true && data) {
      if (data?.error) {
        toastContext.showInlineErrorMessage("Error in fetching Task Status. Use the manual status check button.");
      }
      if (await checkStatus(data)) {
        setIsLoading(false);
        setTaskFinished(true);
      }
    }
    setDataCopy(new Model(data, gitTasksMetadata, false));
    return data;
  };

  const handleRunTask = async () => {
    try {
      setIsLoading(true);
      setTaskFinished(false);
      let postBody = {
        taskId: gitTasksData.getData("_id"),
      };
      let result = await taskActions.createECSCluster(postBody, getAccessToken);
      gitTasksData.setData("status", "running");
      toastContext.showSuccessDialog("ECS Cluster Creation Triggered Successfully");
    } catch (error) {
      setTaskFinished(true);
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
    setTaskFinished(true);
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
    if (taskFinished) {
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
    if (gitTasksData.getData("type") !== "ecs_cluster_creation") {
      return null;
    }

    if (
      !gitTasksData?.data?.configuration?.stackId ||
      gitTasksData?.data?.configuration?.stackId?.length === 0 ||
      gitTasksData?.run_count === 0
    ) {
      return null;
    }

    return (
      <Button
        variant={"warning"}
        disabled={gitTasksData?.getData("status") === "running" || disable || isLoading}
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
    if (gitTasksData.getData("type") !== "ecs_cluster_creation") {
      return null;
    }

    return (
      <Button
        variant={"danger"}
        disabled={!(gitTasksData?.getData("status") === "running") || disable || isLoading}
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
    if (gitTasksData.getData("type") !== "ecs_cluster_creation") {
      return null;
    }

    return (
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable || isLoading}
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

  if (gitTasksData.getData("type") !== "ecs_cluster_creation") {
    return null;
  }

  return (
    <>
      <div className="text-right btn-group btn-group-sized">
        {getRunningButton()}
        {getCancelButton()}
        {getStatusButton()}
      </div>
    </>
  );
}

ECSActionButtons.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func,
};

export default ECSActionButtons;
