import React from "react";
import PropTypes from "prop-types";
import JFrogMavenRepositoriesTable from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogMavenRepositoriesTable";

function JFrogMavenRepositoriesPanel({ toolData, isLoading }) {
  return (
    <div>
      <JFrogMavenRepositoriesTable isLoading={isLoading} toolData={toolData} />
    </div>
  );
}

JFrogMavenRepositoriesPanel.propTypes = {
  toolData: PropTypes.object,
  isLoading: PropTypes.bool
};
export default JFrogMavenRepositoriesPanel;
