import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import axios from "axios";
import RunTaskOverlay from "components/tasks/details/RunTaskOverlay";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {TASK_TYPES} from "components/tasks/task.types";
import CancelTaskButton from "components/tasks/buttons/CancelTaskButton";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_GIT_BRANCHES,
  TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  TASK_TYPES.SALESFORCE_BULK_MIGRATION,
  TASK_TYPES.GIT_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_QUICK_DEPLOY,
];

// TODO: This should be broken into two buttons and this should be renamed as the container
function RunTaskButton({taskModel, setTaskModel, disable, className, loadData, actionAllowed, taskType }) {
  const [taskStarting, setTaskStarting] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handleClose = () => {
    toastContext.clearOverlayPanel();
    // TODO: This should be passed to modal
    setTaskStarting(true);
  };

  const getButton = () => {
    if (taskModel?.getData("status") === "running") {
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
        disabled={taskModel?.getData("status") === "running" || disable || taskStarting || actionAllowed !== true}
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

  const showTaskRunOverlay = () => {
    toastContext.showOverlayPanel(
      <RunTaskOverlay
        handleClose={handleClose}
        taskModel={taskModel}
        setTaskModel={setTaskModel}
        loadData={loadData}
      />
    );
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
};

export default RunTaskButton;