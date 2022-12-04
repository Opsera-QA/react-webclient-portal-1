import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faPlay, faStop } from "@fortawesome/pro-light-svg-icons";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: This needs to be completely rewritten. It was causing massive amounts of data pulls
function GitScraperActionButton(
  {
    gitTasksData,
    status,
  }) {
  const [isStarting, setIsStarting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const {
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  const handleRunTask = async () => {
    try {
      setIsStarting(true);
      await taskActions.startGitscraperScan(getAccessToken, cancelTokenSource, gitTasksData?.getData("_id"));
      toastContext.showSuccessDialog("Git Custodian Triggered Successfully");
    } catch (error) {
      setIsStarting(false);
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
    try {
      setIsCanceling(true);
      await taskActions.cancelGitscraperScan(getAccessToken, cancelTokenSource, gitTasksData);
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
    if (status !== "running") {
      return (
        <span>
          <IconBase icon={faPlay} className={"mr-1"} />
          Run Task
        </span>
      );
    }

    if (isStarting === true) {
      return (
        <span>
          <IconBase isLoading={true} className={"mr-1"} />
          Starting Task
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

  if (gitTasksData?.getData("type") !== TASK_TYPES.GITSCRAPER) {
    return null;
  }

  return (
    <div>
      {getRunButton()}
      {getCancelButton()}
    </div>
  );
}

GitScraperActionButton.propTypes = {
  gitTasksData: PropTypes.object,
  status: PropTypes.string,
};

export default GitScraperActionButton;
