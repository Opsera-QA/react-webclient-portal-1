import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faSpinner, faStop} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import ModalBase from "components/common/modal/ModalBase";
import IconBase from "components/common/icons/IconBase";
import gitTaskActions from "components/git/git-task-actions";
import SFDCViewOverlay from "components/git/git_task_details/configuration_forms/sfdc/SFDCViewOverlay";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";

function GitTaskRunButton({gitTasksData, disable, className, loadData }) {
  const [isCanceling, setIsCanceling] = useState(false);
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
    history.push(`/git`);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const showConfirmationModal = () => {
    setShowModal(true);
  };

  const handleRunGitTask = () => {
    setShowModal(false);
    if (gitTasksData.getData("type") !== "sync-sfdc-repo") {
      return;
    }

    // open sfdc wizard views
    toastContext.showOverlayPanel(<SFDCViewOverlay gitTasksData={gitTasksData} refreshData={loadData}/>);
  };

  const getButton = () => {
    if (gitTasksData?.getData("status") === "running") {
      return (
        <div className="p-3">
          <Button variant="danger" onClick={handleCancelRunTask} disabled={isCanceling || disable}>
            {isCanceling ?
              <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/> :
              <FontAwesomeIcon icon={faStop} fixedWidth className="mr-1"/>
            } Cancel Task
          </Button>
        </div>
      );
    }

    return (
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable}
        onClick={() => {showConfirmationModal();}}
      >
        {gitTasksData?.getData("status") === "running" ?
          (<span><IconBase isLoading={true} className={"mr-1"}/>Running Task</span>)
          : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Run Task</span>)}
      </Button>
    );
  };

  return (
    <div className={className}>
      {/*TODO: Make sure button is not clickable until form is valid*/}
      {getButton()}
      {/*TODO: Make unique modal*/}
      <ModalBase
        showModal={showModal}
        title="Git Task Confirmation"
        handleClose={handleClose}
      >
        <div className={"m-3"}>`Do you want to run {gitTasksData.getData("name")} task?</div>
      </ModalBase>
    </div>
  );
}

GitTaskRunButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string
};

export default GitTaskRunButton;