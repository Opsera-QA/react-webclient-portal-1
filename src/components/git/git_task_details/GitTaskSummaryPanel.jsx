import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import GitTaskSummaryPanelBase from "components/git/git_task_details/GitTaskSummaryPanelBase";
import sfdcGitTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc/sfdc-git-task-configuration-metadata";
import SFDCGitTaskTypeSummaryCard
  from "components/git/git_task_details/configuration_forms/sfdc/SFDCGitTaskTypeSummaryCard"

function GitTaskSummaryPanel({ gitTasksData, setActiveTab }) {
  const wrapGitTaskType = (metaData) => {
    console.log(new Model(gitTasksData.getData("configuration"), metaData, false));
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
      default:
        return (<div>No Task type associated with this git</div>);
    }
  };

  return (
    <GitTaskSummaryPanelBase
      gitTasksData={gitTasksData}
      setActiveTab={setActiveTab}
      gitTaskTypeSummaryCard={getTaskTypeSummaryPanel()}
    />
  );
}


GitTaskSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default GitTaskSummaryPanel;