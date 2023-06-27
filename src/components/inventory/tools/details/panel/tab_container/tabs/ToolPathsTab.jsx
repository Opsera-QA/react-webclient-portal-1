import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faFolderTree,} from "@fortawesome/pro-light-svg-icons";
import {TOOL_DETAIL_PANEL_TABS} from "components/inventory/tools/details/panel/tab_container/ToolDetailPanelTabContainer";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

export const PATHS_TAB_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
  toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET,
  toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
];

function ToolPathsTab({ toolModel, handleTabClick, activeTab }) {
  if (!PATHS_TAB_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faFolderTree}
      tabName={TOOL_DETAIL_PANEL_TABS.PATHS}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Paths"}
      accessRestricted={toolModel?.canUpdateRegistryToolPathSettings() !== true}
    />
  );
}

ToolPathsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolPathsTab;


