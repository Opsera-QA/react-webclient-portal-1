import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faProjectDiagram} from "@fortawesome/pro-light-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

export const PROJECT_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC,
  "jira",
];

function ToolProjectsTab({ toolModel, handleTabClick, activeTab }) {
  if (!PROJECT_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faProjectDiagram}
      tabName={"projects"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Projects"}
      accessRestricted={toolModel.canUpdateRegistryToolProjects() !== true}
    />
  );
}

ToolProjectsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolProjectsTab;


