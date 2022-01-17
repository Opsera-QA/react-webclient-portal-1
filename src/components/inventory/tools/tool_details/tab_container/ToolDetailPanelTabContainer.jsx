import React from "react";

import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import ToolJobsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolJobsTab";
import ToolVaultTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolVaultTab";
import ToolAccountsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolAccountsTab";
import ToolLogsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolLogsTab";
import ToolAttributesTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolAttributesTab";
import ToolApplicationsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolApplicationsTab";
import ToolRepositoriesTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolRepositoriesTab";
import ToolConnectionTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolConnectionTab";
import ToolProjectsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolProjectsTab";
import ToolStorageTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolStorageTab";
import ToolUsageTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolUsageTab";
import ToolServiceTypeMappingTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolServiceTypeMappingTab";
import ToolPathsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolPathsTab";

export const TOOL_DETAIL_PANEL_TABS = {
  ACCOUNTS: "accounts",
  APPLICATIONS: "applications",
  ATTRIBUTES: "attributes",
  ATTRIBUTE_SETTINGS: "attribute_settings",
  CONNECTION: "connection",
  JOBS: "jobs",
  LOGS: "logs",
  PATHS: "paths",
  PROJECTS: "projects",
  REPOSITORIES: "repositories",
  SETTINGS: "settings",
  STORAGE: "storage",
  SUMMARY: "summary",
  USAGE: "usage",
  VAULT: "vault",
  MAPPING: "mapping",
};


function ToolDetailPanelTabContainer({ toolModel, handleTabClick, activeTab }) {
  return (
    <CustomTabContainer>
      <SummaryToggleTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <ToolAttributesTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <ToolVaultTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolConnectionTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolJobsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolAccountsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolLogsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolApplicationsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolRepositoriesTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolProjectsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolPathsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolStorageTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolStorageTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolUsageTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <ToolServiceTypeMappingTab
        toolModel={toolModel}
        activeTab={activeTab}      
        handleTabClick={handleTabClick}
      />
    </CustomTabContainer>
  );
}

ToolDetailPanelTabContainer.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolDetailPanelTabContainer;


