import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faSpinner, faTerminal, faStop} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import RunTaskOverlay from "components/tasks/details/RunTaskOverlay";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import taskActions from "components/tasks/task.actions";
import {TASK_TYPES} from "components/tasks/task.types";
import TaskLiveLogsOverlay from "components/tasks/TaskLiveLogsOverlay";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_GIT_BRANCHES,
  TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  TASK_TYPES.SALESFORCE_BULK_MIGRATION,
];

// TODO: Delete after verifying /tasks/buttons/RunTaskButton and wiring that one up instead
function RunTaskButton({gitTasksData, setGitTasksData, disable, className, loadData, actionAllowed, taskType }) {
  const [isCanceling, setIsCanceling] = useState(false);
  const [taskStarting, setTaskStarting] = useState(false);
  const {getAccessToken} = useContext(AuthContext);
  const history = useHistory();
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

  const handleCancelRunTask = async () => {
    setIsCanceling(true);
    // TODO: call cancel job api to jenkins integrator
    await taskActions.stopTask(getAccessToken, cancelTokenSource, gitTasksData);
    toastContext.showInformationToast("Task has been stopped", 10);
    setIsCanceling(false);
    history.push(`/task`);
  };

  const handleClose = () => {
    toastContext.clearOverlayPanel();
    // TODO: This should be passed to modal
    setTaskStarting(true);
  };

  const getButton = () => {
    if (gitTasksData?.getData("status") === "running") {
      return (
        <div className="p-3">
          <TooltipWrapper innerText={actionAllowed === false ? "Your Access Role Level Prevents Stopping Tasks" : null}>
            <Button variant="danger" onClick={handleCancelRunTask} disabled={isCanceling || disable || actionAllowed !== true}>
              {isCanceling ?
                <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/> :
                <FontAwesomeIcon icon={faStop} fixedWidth className="mr-1"/>
              } Cancel Task
            </Button>
            {gitTasksData.getData("type") === "sync-sfdc-repo" && 
               <Button variant="secondary" className="m-2" style={{ cursor: "pointer" }}
               onClick={showLiveLogOverlay}  >
                  View Logs
              <FontAwesomeIcon icon={faTerminal}
                className="white mx-1" fixedWidth
              />
            </Button>
            }
          </TooltipWrapper>
        </div>
      );
    }

    return (
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable || taskStarting || actionAllowed !== true}
        onClick={() => {
          showTaskRunOverlay();
        }}
      >
        <TooltipWrapper innerText={actionAllowed !== true ? "Your Access Role Level Prevents Running Tasks" : null}>
          {gitTasksData?.getData("status") === "running" ?
            (<span><IconBase isLoading={true} className={"mr-1"}/>Running Task</span>)
            : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Run Task</span>)}
        </TooltipWrapper>
      </Button>
    );
  };

  const showTaskRunOverlay = () => {
    toastContext.showOverlayPanel(
      <RunTaskOverlay
        handleClose={handleClose}
        taskModel={gitTasksData}
        setTaskModel={setGitTasksData}
        loadData={loadData}
      />
    );
  };

  const showLiveLogOverlay = () => {
    toastContext.showOverlayPanel(
      <TaskLiveLogsOverlay
        runCount={gitTasksData?.getData("run_count")}
        taskId={gitTasksData?.getData("_id")}
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
      }
    </div>
  );
}

RunTaskButton.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  actionAllowed: PropTypes.bool,
  taskType: PropTypes.string,
};

export default RunTaskButton;