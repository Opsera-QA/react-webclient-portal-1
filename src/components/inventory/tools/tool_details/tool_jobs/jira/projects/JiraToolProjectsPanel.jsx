import React from "react";

import PropTypes from "prop-types";
import JiraToolProjectsTable from "components/inventory/tools/tool_details/tool_jobs/jira/projects/JiraToolProjectsTable";

function JiraToolProjectsPanel({ toolData, loadData, isLoading }) {
  return (
    <div>
      <JiraToolProjectsTable
        isLoading={isLoading}
        toolData={toolData}
        loadData={loadData}
      />
    </div>
  );
}


JiraToolProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default JiraToolProjectsPanel;
