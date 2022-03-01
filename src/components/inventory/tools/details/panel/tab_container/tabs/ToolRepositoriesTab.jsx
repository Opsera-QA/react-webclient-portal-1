import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faGit} from "@fortawesome/free-brands-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";

export const REPOSITORY_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
  "jfrog_artifactory_maven",
];

function ToolRepositoriesTab({ toolModel, handleTabClick, activeTab }) {
  if (!REPOSITORY_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faGit}
      tabName={"repositories"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Repositories"}
      accessRestricted={!toolModel.canPerformAction("update_tool_repositories")}
    />
  );
}

ToolRepositoriesTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolRepositoriesTab;


