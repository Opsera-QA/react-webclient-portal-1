import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import GitTaskSummaryPanelBase from "components/git/git_task_details/GitTaskSummaryPanelBase";
import sfdcGitTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc/sfdc-git-task-configuration-metadata";
import SFDCGitTaskTypeSummaryCard
  from "components/git/git_task_details/configuration_forms/sfdc/SFDCGitTaskTypeSummaryCard"
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStop,
  faSpinner
} from "@fortawesome/pro-light-svg-icons";
import gitTaskActions from "components/git/git-task-actions";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { DialogToastContext } from "contexts/DialogToastContext";

function GitTaskSummaryPanel({ gitTasksData, setActiveTab }) {
  
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const wrapGitTaskType = (metaData) => {
    console.log(new Model(gitTasksData.getData("configuration"), metaData, false));
    return new Model(gitTasksData.getData("configuration"), metaData, false);
  };

const handleCancelRunTask = async () => {
  setIsLoading(true);
  // TODO: call cancel job api to jenkins integrator
  let newGitTasksData = gitTasksData;
  newGitTasksData.setData("status", "stopped");
  await gitTaskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newGitTasksData);
  toastContext.showInformationToast("Task has been stopped", 10);
  setIsLoading(false);
  history.push(`/git`);
}
  // TODO: Make these panels more similar to the pipeline summary cards
  const getTaskTypeSummaryPanel = () => {
    switch (gitTasksData.getData("type")) {
      case "sync-sfdc-repo":
        return (
          <SFDCGitTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(sfdcGitTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      default:
        return (<div>No Task type associated with this git</div>);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <GitTaskSummaryPanelBase
        gitTasksData={gitTasksData}
        setActiveTab={setActiveTab}
        gitTaskTypeSummaryCard={getTaskTypeSummaryPanel()}
      />
      {/* cancel button if task is running */}
      {gitTasksData.getData("status") === "running" &&
        <div className="p-3">
          <Button variant="danger" onClick={handleCancelRunTask} disabled={isLoading}>
            {isLoading ?
            <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/> :
              <FontAwesomeIcon icon={faStop} fixedWidth className="mr-1"/>
            } Cancel Task
          </Button>
        </div>
      }
    </>
  );
}


GitTaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default GitTaskSummaryPanel;