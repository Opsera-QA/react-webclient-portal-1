import React from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import ToolJobsTab, {JOBS_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolJobsTab";
import ToolVaultTab, {VAULT_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolVaultTab";
import ToolAccountsTab, {ACCOUNT_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolAccountsTab";
import ToolLogsTab, {LOG_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolLogsTab";
import ToolAttributesTab from "components/inventory/tools/details/panel/tab_container/tabs/ToolAttributesTab";
import ToolApplicationsTab, {APPLICATION_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolApplicationsTab";
import ToolRepositoriesTab, {REPOSITORY_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolRepositoriesTab";
import ToolConnectionTab from "components/inventory/tools/details/panel/tab_container/tabs/ToolConnectionTab";
import ToolProjectsTab, {PROJECT_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolProjectsTab";
import ToolStorageTab, {STORAGE_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolStorageTab";
import ToolUsageTab from "components/inventory/tools/details/panel/tab_container/tabs/ToolUsageTab";
import ToolServiceTypeMappingTab, {SERVICE_MAPPING_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolServiceTypeMappingTab";
import ToolPathsTab, {PATHS_TAB_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolPathsTab";
import ToolOrganizationsTab, {ORGANIZATIONS_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolOrganizationsTab";
import ToolClustersTab, {ARGO_CLUSTER_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolClustersTab";
import ToolWorkspacesTab, {WORKSPACES_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolWorkspacesTab";
import ToolProvidersTab, {PROVIDERS_SUPPORTED_TOOL_IDENTIFIERS} from "components/inventory/tools/details/panel/tab_container/tabs/ToolProvidersTab";
import {hasStringValue} from "components/common/helpers/string-helpers";
import ToolEndpointsTab, {
  ENDPOINTS_TAB_SUPPORTED_TOOL_IDENTIFIERS
} from "components/inventory/tools/details/panel/tab_container/tabs/ToolEndpointsTab";

export const TOOL_DETAIL_PANEL_TABS = {
  ACCOUNTS: "accounts",
  APPLICATIONS: "applications",
  ATTRIBUTES: "attributes",
  ATTRIBUTE_SETTINGS: "attribute_settings",
  CLUSTERS: "clusters",
  CONNECTION: "connection",
  ENDPOINTS: "endpoints",
  JOBS: "jobs",
  LOGS: "logs",
  MAPPING: "mapping",
  ORGANIZATIONS: "organizations",
  WORKSPACES: "workspaces",
  PROVIDERS: "providers",
  PATHS: "paths",
  PROJECTS: "projects",
  REPOSITORIES: "repositories",
  SETTINGS: "settings",
  STORAGE: "storage",
  SUMMARY: "summary",
  USAGE: "usage",
  VAULT: "vault",
};

export const getTabSupportedTools = (toolDetailPanelTab) => {
  switch (toolDetailPanelTab) {
    case TOOL_DETAIL_PANEL_TABS.VAULT:
      return VAULT_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.REPOSITORIES:
      return REPOSITORY_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.JOBS:
      return JOBS_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.ENDPOINTS:
      return ENDPOINTS_TAB_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.ACCOUNTS:
      return ACCOUNT_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.LOGS:
      return LOG_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.PATHS:
      return PATHS_TAB_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.APPLICATIONS:
      return APPLICATION_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.PROJECTS:
      return PROJECT_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.MAPPING:
      return SERVICE_MAPPING_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.STORAGE:
      return STORAGE_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.CLUSTERS:
      return ARGO_CLUSTER_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.ORGANIZATIONS:
      return ORGANIZATIONS_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.WORKSPACES:
      return WORKSPACES_SUPPORTED_TOOL_IDENTIFIERS;
    case TOOL_DETAIL_PANEL_TABS.PROVIDERS:
      return PROVIDERS_SUPPORTED_TOOL_IDENTIFIERS;
  }
};

export const doesToolSupportTab = (toolIdentifier, toolDetailPanelTab) => {
  if (hasStringValue(toolDetailPanelTab) !== true || hasStringValue(toolIdentifier) !== true) {
    return false;
  }

  const tabSupportedTools = getTabSupportedTools(toolDetailPanelTab);
  return Array.isArray(tabSupportedTools) && tabSupportedTools.includes(toolIdentifier);
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
      <ToolEndpointsTab
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
      <ToolServiceTypeMappingTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolClustersTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolOrganizationsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolWorkspacesTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolProvidersTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {/* Keep logs and usage as last tabs */}
      <ToolLogsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolUsageTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
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


