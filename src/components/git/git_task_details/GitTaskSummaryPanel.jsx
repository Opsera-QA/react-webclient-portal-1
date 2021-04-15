import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import GitTaskSummaryPanelBase from "components/git/git_task_details/GitTaskSummaryPanelBase";
import sfdcGitTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc-org-sync/sfdc-git-task-configuration-metadata";
import SFDCGitTaskTypeSummaryCard
  from "components/git/git_task_details/configuration_forms/sfdc-org-sync/SFDCGitTaskTypeSummaryCard";
import axios from "axios";
import SFDCBranchStructuringTaskTypeSummaryCard from "./configuration_forms/sfdc-branch-structure/SFDCBranchStructuringTaskTypeSummaryCard";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";

function GitTaskSummaryPanel({ gitTasksData, setGitTasksData, setActiveTab, loadData }) {
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

  const wrapGitTaskType = (metaData) => {
    return new Model(gitTasksData.getData("configuration"), metaData, false);
  };

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
      case "sync-branch-structure":
        return (
          <SFDCBranchStructuringTaskTypeSummaryCard
            gitTaskConfigurationData={wrapGitTaskType(sfdcGitBranchTaskConfigurationMetadata)}
            gitTasksData={gitTasksData}
          />
        );
      default:
        return (<div>No Task type associated with this git</div>);
    }
  };

  if (gitTasksData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <GitTaskSummaryPanelBase
      gitTasksData={gitTasksData}
      setActiveTab={setActiveTab}
      gitTaskTypeSummaryCard={getTaskTypeSummaryPanel()}
      setGitTasksData={setGitTasksData}
      loadData={loadData}
    />
  );
}

GitTaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func
};

export default GitTaskSummaryPanel;