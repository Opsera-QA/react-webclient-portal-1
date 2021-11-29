import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "components/inventory/tools/tool_details/logs/ToolLogsPanel";
import ToolEditorPanel from "./ToolEditorPanel";
import ToolConfigurationPanel from "./ToolConfigurationPanel";
import ToolAccountsPanel from "./ToolAccountsPanel";
import ToolAttributesPanel from "./ToolAttributesPanel";
import ToolApplicationsPanel from "./ToolAppliationsPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "./ToolSummaryPanel";
import ToolUsagePanel from "components/inventory/tools/tool_details/ToolUsagePanel";
import ToolTaggingPanel from "./ToolTaggingPanel";
import ToolProjectsPanel from "components/inventory/tools/tool_details/projects/ToolProjectsPanel";
import { AuthContext } from "contexts/AuthContext";
import ToolAttributeEditorPanel from "components/inventory/tools/tool_details/ToolAttributeEditorPanel";
import ToolVaultPanel from "components/inventory/tools/tool_details/vault/ToolVaultPanel";
import ToolRepositoriesPanel from "./ToolRepositoriesPanel";
import ToolStoragePanel from "components/inventory/tools/tool_details/ToolStoragePanel";
import ToolDetailPanelTabContainer
  from "components/inventory/tools/tool_details/tab_container/ToolDetailPanelTabContainer";

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
      case "summary":
        return <ToolSummaryPanel toolData={toolData} setToolData={setToolData} setActiveTab={setActiveTab} customerAccessRules={customerAccessRules} />;
      case "settings":
        return <ToolEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData} handleClose={toggleSummaryPanel} />;
      case "attributes":
        return <ToolAttributesPanel toolData={toolData} setActiveTab={setActiveTab} customerAccessRules={customerAccessRules} />;
      case "attribute_settings":
        return <ToolAttributeEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData} handleClose={toggleAttributesPanel} />;
      case "configuration":
        return <ToolConfigurationPanel toolData={toolData} loadData={loadData}/>;
      case "jobs":
        return (
          <ToolJobsPanel
            toolData={toolData}
            toolIdentifier={toolData?.tool_identifier}
          />
        );
      case "applications":
        return <ToolApplicationsPanel toolData={toolData} loadData={loadData} isLoading={isLoading}/>;
      case "accounts":
        return <ToolAccountsPanel isLoading={isLoading} toolData={toolData} loadData={loadData} />;
      case "logs":
        return <ToolLogsPanel toolData={toolData}/>;
      case "tagging":
        return <ToolTaggingPanel toolData={toolData} />;
      case "projects":
        return <ToolProjectsPanel toolData={toolData} isLoading={isLoading} loadData={loadData} />;
      case "usage":
        return <ToolUsagePanel toolData={toolData} />;
      case "vault":
        return <ToolVaultPanel toolData={toolData} setToolData={setToolData} />;
      case "repositories":
        return <ToolRepositoriesPanel toolData={toolData} setToolData={setToolData} loadData={loadData} isLoading={isLoading} />;
      case "storage":
        return <ToolStoragePanel toolData={toolData} setToolData={setToolData} loadData={loadData} />;
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


