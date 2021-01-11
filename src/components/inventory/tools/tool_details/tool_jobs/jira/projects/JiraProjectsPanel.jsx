import React, { useState } from "react";

import PropTypes from "prop-types";
import JiraProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectEditorPanel";
import JiraProjectsTable from "components/inventory/tools/tool_details/tool_jobs/jira/projects/JiraProjectsTable";
import jiraProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jira-project-metadata";
import Model from "core/data_model/model";

function JiraProjectsPanel({ toolData, loadData, isLoading }) {
  const [jiraProject, setJiraProject] = useState(undefined);

  const selectRow = (rowData) => {
    setJiraProject(new Model({...rowData.original}, jiraProjectMetadata, false));
  };

  const getCurrentView = () => {
    if (jiraProject != null) {
      return <JiraProjectEditorPanel toolData={toolData} jiraProjectData={jiraProject} setJiraProjectData={setJiraProject} loadData={loadData}/>;
    }

    return <JiraProjectsTable isLoading={isLoading} toolData={toolData} loadData={loadData} selectRowFunction={selectRow}/>;
  }

  return (
    <div>
      {getCurrentView()}
    </div>
  );
}


JiraProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default JiraProjectsPanel;
