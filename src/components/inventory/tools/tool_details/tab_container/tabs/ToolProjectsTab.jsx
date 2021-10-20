import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faProjectDiagram} from "@fortawesome/pro-light-svg-icons";

const VAULT_SUPPORTED_TOOL_IDENTIFIERS = [
  "argo",
  "jira",
];

function ToolProjectsTab({ toolModel, handleTabClick, activeTab }) {
  if (!VAULT_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faProjectDiagram}
      tabName={"projects"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Projects"}
      accessRestricted={!toolModel.canPerformAction("update_tool_projects")}
    />
  );
}

ToolProjectsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolProjectsTab;


