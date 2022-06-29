import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "contexts/AuthContext";
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

function ToolDetailPanel({ toolData, setToolData, loadData, isLoading, tab }) {
  const [activeTab, setActiveTab] = useState(tab ? tab : "summary");
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  useEffect(() => {
    initRoleAccess().catch(error => {
      throw { error };
    });
  }, [isLoading]);

  const initRoleAccess = async () => {
    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);
  };

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
        toolModel={toolData}
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
            toolData={toolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.APPLICATIONS:
        return (
          <ToolApplicationsPanel
            toolData={toolData}
            loadData={loadData}
            isLoading={isLoading}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ATTRIBUTES:
        return (
          <ToolAttributesPanel
            toolData={toolData}
            setActiveTab={setActiveTab}
            customerAccessRules={customerAccessRules}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ATTRIBUTE_SETTINGS:
        return (
          <ToolAttributeEditorPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
            handleClose={toggleAttributesPanel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.CONNECTION:
        return (
          <ToolConnectionPanel
            toolData={toolData}
            setToolData={setToolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ENDPOINTS:
        return (
          <ToolEndpointsPanel
            toolModel={toolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.JOBS:
        return (
          <ToolJobsPanel
            toolData={toolData}
            toolIdentifier={toolData?.getData("tool_identifier")}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.LOGS:
        return (
          <ToolLogsPanel
            toolData={toolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PATHS:
        return (
          <ToolPathsPanel
            toolModel={toolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PROJECTS:
        return (
          <ToolProjectsPanel
            toolData={toolData}
            isLoading={isLoading}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.REPOSITORIES:
        return (
          <ToolRepositoriesPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
            isLoading={isLoading}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.SETTINGS:
        return (
          <ToolEditorPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
            handleClose={toggleSummaryPanel}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.STORAGE:
        return (
          <ToolStoragePanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.ORGANIZATIONS:
        return (
          <ToolOrganizationsPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.WORKSPACES:
        return (
          <ToolWorkspacesPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.PROVIDERS:
        return (
          <ToolProvidersPanel
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.SUMMARY:
        return (
          <ToolSummaryPanel
            toolData={toolData}
            setToolData={setToolData}
            setActiveTab={setActiveTab}
            customerAccessRules={customerAccessRules}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.USAGE:
        return (
          <ToolUsagePanel
            toolData={toolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.VAULT:
        return (
          <ToolVaultPanel
            toolData={toolData}
            setToolData={setToolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.MAPPING:
        return (
          <ToolServiceTypeMappingPanel 
            toolData={toolData}
            setToolData={setToolData}
            loadData={loadData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.CLUSTERS:
        return (
          <ToolClustersPanel
            toolModel={toolData}
          />
        );
      case TOOL_DETAIL_PANEL_TABS.LICENSES:
        return (
            <ToolLicensePanel
                toolData={toolData}
            />
        );
      case TOOL_DETAIL_PANEL_TABS.DATA_TRANSFORMER:
        return (
          <ToolDataTransformerRulesMappingPanel 
            toolData={toolData}
            setToolData={setToolData}
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
      customerAccessRules={customerAccessRules}
    />
  );
}

ToolDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  tab: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ToolDetailPanel;


