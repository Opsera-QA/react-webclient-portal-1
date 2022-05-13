import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import taskActions from "components/tasks/task.actions";
import {TASK_TYPES} from "components/tasks/task.types";
import ViewTaskLiveLogsButton from "components/tasks/buttons/ViewTaskLiveLogsButton";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_GIT_BRANCHES,
  TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  TASK_TYPES.SALESFORCE_BULK_MIGRATION,
  TASK_TYPES.SALESFORCE_QUICK_DEPLOY,
  TASK_TYPES.GIT_TO_GIT_MERGE_SYNC,
  TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
];

// TODO: This should be broken into two buttons, one for cancel and one for logs
function CancelTaskButton({taskModel, disable, className, actionAllowed, taskType }) {
  const [isCanceling, setIsCanceling] = useState(false);
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

  // TODO: Add confirmation Dialog
  const handleCancelRunTask = async () => {
    try {
      setIsCanceling(true);
      await taskActions.stopTaskV3(
        getAccessToken,
        cancelTokenSource,
        taskModel?.getMongoDbId(),
      );
      toastContext.showInformationToast("Task has been stopped", 10);
      history.push(`/task`);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue canceling this Task:");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsCanceling(false);
      }
    }
  };

  const getButtonText = () => {
    if (isCanceling === true) {
      return ("Canceling Task");
    }

    return ("Cancel Task");
  };

  if (!ALLOWED_TASK_TYPES.includes(taskType)) {
    return null;
  }

  return (
    <div className={className}>
      {/*TODO: Make sure button is not clickable until form is valid*/}
      <div className={"d-flex"}>
        <div className="p-3 d-flex">
          <TooltipWrapper innerText={actionAllowed === false ? "Your Access Role Level Prevents Stopping Tasks" : null}>
            <div className={"mr-2"}>
              <Button
                variant={"danger"}
                onClick={handleCancelRunTask}
                disabled={isCanceling || disable || actionAllowed !== true}
              >
                <IconBase isLoading={isCanceling} icon={faStop} fixedWidth className="mr-2"/>
                {getButtonText()}
              </Button>
            </div>
          </TooltipWrapper>
          <ViewTaskLiveLogsButton
            taskModel={taskModel}
            taskType={taskType}
          />
        </div>
      </div>
    </div>
  );
}

CancelTaskButton.propTypes = {
  taskModel: PropTypes.object,
  disable: PropTypes.bool,
  className: PropTypes.string,
  actionAllowed: PropTypes.bool,
  taskType: PropTypes.string,
};

export default CancelTaskButton;