import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faSpinner, faStop} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import gitTaskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import GitRunTaskModal from "components/tasks/git_task_details/GitRunTaskModal";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function GitTaskRunButton({gitTasksData, setGitTasksData, disable, className, loadData, actionAllowed }) {
  const [isCanceling, setIsCanceling] = useState(false);
  const [taskStarting, setTaskStarting] = useState(false);
  const {getAccessToken} = useContext(AuthContext);
  const history = useHistory();
  let toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [showModal, setShowModal] = useState(false);
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
    let newGitTasksData = gitTasksData;
      newGitTasksData.setData("status", "stopped");
    await gitTaskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newGitTasksData);
    toastContext.showInformationToast("Task has been stopped", 10);
    setIsCanceling(false);
    history.push(`/task`);
  };

  const handleClose = () => {
    setShowModal(false);
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
          </TooltipWrapper>
        </div>
      );
    }

    return (
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable || taskStarting || actionAllowed !== true}
        onClick={() => {
          setShowModal(true);
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

  if (gitTasksData.getData("type") === "ecs_service_creation" || gitTasksData.getData("type") === "ecs_cluster_creation" || gitTasksData.getData("type") === "lambda_function_creation") {
    return null;
  }

  return (
    <div className={className}>
      {/*TODO: Make sure button is not clickable until form is valid*/}
      {getButton()}
      <GitRunTaskModal
        showModal={showModal}
        handleClose={handleClose}
        gitTasksData={gitTasksData}
        setGitTasksData={setGitTasksData}
        loadData={loadData}
        />
    </div>
  );
}

GitTaskRunButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  setGitTasksData: PropTypes.func,
  className: PropTypes.string,
  actionAllowed: PropTypes.bool
};

export default GitTaskRunButton;