import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import SFDCViewOverlay from "components/git/git_task_details/configuration_forms/sfdc/SFDCViewOverlay";

function RunGitTaskButton({gitTasksData, handleClose, disable, className, loadData }) {
  let toastContext = useContext(DialogToastContext);

  const handleRunGitTask = () => {
    if (gitTasksData.getData("type") !== "sync-sfdc-repo") {
      return;
    }

    // open sfdc wizard views
    toastContext.showOverlayPanel(<SFDCViewOverlay gitTasksData={gitTasksData} refreshData={loadData}/>);
    handleClose();
  };


  return (
    <div className={className}>
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable}
        onClick={() => {handleRunGitTask(true);}}
      >
        <span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Run Task</span>
      </Button>
    </div>
  );
}

RunGitTaskButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default RunGitTaskButton;