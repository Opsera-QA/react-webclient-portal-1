import React from "react";

import PropTypes from "prop-types";
import JiraProjectsTable from "components/inventory/tools/tool_details/tool_jobs/jira/projects/JiraProjectsTable";

function JiraProjectsPanel({ toolData, loadData, isLoading }) {
  return (
    <div>
      <JiraProjectsTable isLoading={isLoading} toolData={toolData} loadData={loadData} />
    </div>
  );
}


JiraProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default JiraProjectsPanel;
