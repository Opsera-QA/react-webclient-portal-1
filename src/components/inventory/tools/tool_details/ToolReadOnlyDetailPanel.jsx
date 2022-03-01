import React, { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "components/inventory/tools/tool_details/logs/ToolLogsPanel";
import ToolAccountsPanel from "./ToolAccountsPanel";
import ToolAttributesPanel from "./ToolAttributesPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {
  faAbacus,
  faClipboardList,
  faList,
  faTable,
  faUsers,
  faBrowser,
  faProjectDiagram,
  faDraftingCompass,
  faKey
} from "@fortawesome/pro-light-svg-icons";
import ToolApplicationsPanel from "./ToolAppliationsPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "./ToolSummaryPanel";
import ToolUsagePanel from "components/inventory/tools/tool_details/ToolUsagePanel";
import ToolTaggingPanel from "./ToolTaggingPanel";
import ToolProjectsPanel from "components/inventory/tools/tool_details/projects/ToolProjectsPanel";
import { AuthContext } from "contexts/AuthContext";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import ToolVaultPanel from "components/inventory/tools/tool_details/vault/ToolVaultPanel";
import ToolRepositoriesPanel from "./ToolRepositoriesPanel";
import ToolConfigurationSummaryPanel from "components/inventory/tools/tool_details/ToolConfigurationSummaryPanel";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import ToolVaultSummaryPanel from "components/inventory/tools/tool_details/vault/ToolVaultSummaryPanel";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";
import {DialogToastContext} from "contexts/DialogToastContext";

// TODO: This is in progress and needs to be cleaned up
function ToolReadOnlyDetailPanel({ toolModel, loadData, isLoading, tab }) {
  const toastContext = useContext(DialogToastContext);
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

  const authorizedAction = (action, dataObject) => {
    if (dataObject == null) {
      return false;
    }

    const owner = dataObject?.owner;
    const objectRoles = dataObject?.roles;
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getDynamicTabs = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case "jenkins":
        return (
          <>
            <CustomTab icon={faAbacus} tabName={"jobs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jobs"} disabled={!authorizedAction("edit_tool_job_tabs", toolModel?.data)}/>
            <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"} disabled={!authorizedAction("edit_tool_account_tabs", toolModel?.data)}/>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      case "octopus":
        return (
          <>
            <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Applications"} disabled={!authorizedAction("edit_tool_application_tabs", toolModel?.data)}/>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        );
      case "gitlab":
      case "github":
      case "bitbucket":
        return (
          <>
          {/*<CustomTab icon={faTags} tabName={"tagging"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tagging"}/>*/}
          <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"} disabled={!authorizedAction("edit_tool_account_tabs", toolModel?.data)}/>
          </>
        );
      case "jira":
        return (
          <>
            <CustomTab icon={faProjectDiagram} tabName={"projects"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Projects"} disabled={!authorizedAction("edit_tool_projects_tabs", toolModel?.data)}/>
          </>
        );
      case "sfdc-configurator":
        return (
          <>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        );
      case "jfrog_artifactory_maven":
        return (
          <>
            <CustomTab icon={faTable} tabName={"repositories"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Repositories"}/>
          </>
        );
      default: return <></>;
    }
  };

  const getVaultTab = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case "jenkins":
      case "gitlab":
      case "github":
      case "sonar":
      case "kafka_connect":
        return (
            <CustomTab icon={faKey} tabName={"vault"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Vault"} disabled={!authorizedAction("vault", toolModel?.data)}/>
        );
      default: return <></>;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Attributes"}/>
        {getVaultTab()}
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Connection"} disabled={!authorizedAction("edit_tool_connection", toolModel?.data)}/>
        {/*{getDynamicTabs()}*/}
        <CustomTab icon={faDraftingCompass} tabName={"pipelines"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Usage"}/>
      </CustomTabContainer>
    );
  };

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolSummaryPanel toolData={toolModel} />;
      case "attributes":
        return <ToolAttributesPanel toolData={toolModel} customerAccessRules={customerAccessRules} />;
      case "configuration":
        return (
          <ToolConfigurationSummaryPanel
            toolIdentifier={toolModel?.getData("tool_identifier")}
            toolConfiguration={toolModel?.getData("configuration")}
            loadData={loadData}
          />
        );
      case "jobs":
        return <ToolJobsPanel toolData={toolModel} loadData={loadData} isLoading={isLoading}/>;
      case "applications":
        return <ToolApplicationsPanel toolData={toolModel} loadData={loadData} isLoading={isLoading}/>;
      case "accounts":
        return <ToolAccountsPanel isLoading={isLoading} toolData={toolModel} loadData={loadData} />;
      case "logs":
        return <ToolLogsPanel toolData={toolModel}/>;
      case "tagging":
        return <ToolTaggingPanel toolData={toolModel} />;
      case "projects":
        return <ToolProjectsPanel toolData={toolModel} isLoading={isLoading} loadData={loadData} />;
      case "pipelines":
        return <ToolUsagePanel toolData={toolModel} closePanelFunction={closePanelFunction} />;
      case "vault":
        return <ToolVaultSummaryPanel toolModel={toolModel} />;
      case "repositories":
        return <ToolRepositoriesPanel toolData={toolModel} />;
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

ToolReadOnlyDetailPanel.propTypes = {
  toolModel: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  tab: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ToolReadOnlyDetailPanel;


