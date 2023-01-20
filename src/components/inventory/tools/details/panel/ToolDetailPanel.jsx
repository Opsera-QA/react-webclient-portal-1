import React, { useState } from "react";
import PropTypes from "prop-types";
import ToolJobsPanel from "components/inventory/tools/tool_details/ToolJobsPanel";
import ToolLogsPanel from "components/inventory/tools/tool_details/logs/ToolLogsPanel";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import ToolConnectionPanel from "components/inventory/tools/tool_details/ToolConnectionPanel";
import ToolAccountsPanel from "components/inventory/tools/tool_details/ToolAccountsPanel";
import ToolAttributesPanel from "components/inventory/tools/tool_details/ToolAttributesPanel";
import ToolApplicationsPanel from "components/inventory/tools/tool_details/ToolAppliationsPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "components/inventory/tools/tool_details/ToolSummaryPanel";
import ToolUsagePanel from "components/inventory/tools/tool_details/ToolUsagePanel";
import ToolProjectsPanel from "components/inventory/tools/tool_details/projects/ToolProjectsPanel";
import ToolAttributeEditorPanel from "components/inventory/tools/tool_details/ToolAttributeEditorPanel";
import ToolVaultPanel from "components/inventory/tools/tool_details/vault/ToolVaultPanel";
import ToolRepositoriesPanel from "components/inventory/tools/tool_details/ToolRepositoriesPanel";
import ToolStoragePanel from "components/inventory/tools/tool_details/ToolStoragePanel";
import ToolDetailPanelTabContainer
  , {TOOL_DETAIL_PANEL_TABS} from "components/inventory/tools/details/panel/tab_container/ToolDetailPanelTabContainer";
import ToolPathsPanel from "components/inventory/tools/tool_details/paths/ToolPathsPanel";
import ToolServiceTypeMappingPanel from "components/inventory/tools/tool_details/ToolServiceTypeMappingPanel";
import ToolClustersPanel from "components/inventory/tools/tool_details/clusters/ToolClustersPanel";
import ToolOrganizationsPanel from "components/inventory/tools/tool_details/ToolOrganizationsPanel";
import ToolWorkspacesPanel from "components/inventory/tools/tool_details/ToolWorkspacesPanel";
import ToolEndpointsPanel from "components/inventory/tools/details/endpoints/ToolEndpointsPanel";
import ToolProvidersPanel from "components/inventory/tools/tool_details/ToolProvidersPanel";
import ToolLicensePanel from "../../tool_details/ToolLicensePanel";
import ToolDataTransformerRulesMappingPanel 
  from "components/inventory/tools/tool_details/ToolDataTransformerRulesMappingPanel";

function ToolDetailPanel(
  { 
    toolModel,
    setToolModel,
    loadData,
    isLoading,
    tab,
  }) {
  const [activeTab, setActiveTab] = useState(tab ? tab : "summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const toggleAttributesPanel = () => {
    setActiveTab("attributes");
  };

  const getTabContainer = () => {
    return (
      <ToolDetailPanelTabContainer
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case TOOL_DETAIL_PANEL_TABS.ACCOUNTS:
        return (
          <ToolAccountsPanel
            isLoading={isLoading}
            toolData={toolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.APPLICATIONS:
        return (
          <ToolApplicationsPanel
            toolData={toolModel}
            loadData={loadData}
            isLoading={isLoading}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ATTRIBUTES:
        return (
          <ToolAttributesPanel
            toolData={toolModel}
            setActiveTab={setActiveTab}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ATTRIBUTE_SETTINGS:
        return (
          <ToolAttributeEditorPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
            handleClose={toggleAttributesPanel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.CONNECTION:
        return (
          <ToolConnectionPanel
            toolData={toolModel}
            setToolData={setToolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ENDPOINTS:
        return (
          <ToolEndpointsPanel
            toolModel={toolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.JOBS:
        return (
          <ToolJobsPanel
            toolData={toolModel}
            toolIdentifier={toolModel?.getData("tool_identifier")}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.LOGS:
        return (
          <ToolLogsPanel
            toolData={toolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PATHS:
        return (
          <ToolPathsPanel
            toolModel={toolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PROJECTS:
        return (
          <ToolProjectsPanel
            toolData={toolModel}
            isLoading={isLoading}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.REPOSITORIES:
        return (
          <ToolRepositoriesPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
            isLoading={isLoading}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.SETTINGS:
        return (
          <ToolEditorPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
            handleClose={toggleSummaryPanel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.STORAGE:
        return (
          <ToolStoragePanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ORGANIZATIONS:
        return (
          <ToolOrganizationsPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.WORKSPACES:
        return (
          <ToolWorkspacesPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PROVIDERS:
        return (
          <ToolProvidersPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.SUMMARY:
        return (
          <ToolSummaryPanel
            toolData={toolModel}
            setToolData={setToolModel}
            setActiveTab={setActiveTab}
            loadToolFunction={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.USAGE:
        return (
          <ToolUsagePanel
            toolData={toolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.VAULT:
        return (
          <ToolVaultPanel
            toolData={toolModel}
            setToolData={setToolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.MAPPING:
        return (
          <ToolServiceTypeMappingPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.CLUSTERS:
        return (
          <ToolClustersPanel
            toolModel={toolModel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.LICENSES:
        return (
            <ToolLicensePanel
                toolData={toolModel}
            />
        );
      case TOOL_DETAIL_PANEL_TABS.DATA_TRANSFORMER:
        return (
          <ToolDataTransformerRulesMappingPanel
            toolData={toolModel}
            setToolData={setToolModel}
            loadData={loadData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

ToolDetailPanel.propTypes = {
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
  loadData: PropTypes.func,
  tab: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ToolDetailPanel;


