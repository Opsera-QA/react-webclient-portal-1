import React, { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "./ToolLogsPanel";
import ToolEditorPanel from "./ToolEditorPanel";
import ToolConfigurationPanel from "./ToolConfigurationPanel";
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
  faTags,
  faDiceD20, faProjectDiagram
} from "@fortawesome/pro-light-svg-icons";
import ToolApplicationsPanel from "./ToolAppliationsPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "./ToolSummaryPanel";
import ToolPipelinesPanel from "./ToolPipelinesPanel";
import ToolTaggingPanel from "./ToolTaggingPanel";
import ToolProjectsPanel from "components/inventory/tools/tool_details/projects/ToolProjectsPanel";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import { AuthContext } from "contexts/AuthContext";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import AttributeEditorPanel from "components/inventory/tools/tool_details/AttributeEditorPanel";
import ToggleTab from "components/common/tabs/detail_view/ToggleTab";
import ScmToolAccountsPanel from "./ScmToolAccountsPanel";

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

  const authorizedAction = (action, dataObject) => {
    const owner = dataObject.owner;
    const objectRoles = dataObject.roles;
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
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

  const getDynamicTabs = () => {
    switch (toolData?.getData("tool_identifier")) {
      case "jenkins":
      return (
        <>
          <CustomTab icon={faAbacus} tabName={"jobs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jobs"} disabled={!authorizedAction("edit_tool_job_tabs", toolData?.data)}/>
          <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"} disabled={!authorizedAction("edit_tool_account_tabs", toolData?.data)}/>
          <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
        </>
      );
      case "argo":
      case "octopus":
        return (
          <>
            <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Applications"} disabled={!authorizedAction("edit_tool_application_tabs", toolData?.data)}/>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        );
      case "gitlab":
      case "github":
      case "bitbucket":
        return (
          <>
          {/*<CustomTab icon={faTags} tabName={"tagging"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tagging"}/>*/}
          <CustomTab icon={faUsers} tabName={"scmaccounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"} disabled={!authorizedAction("edit_tool_account_tabs", toolData?.data)}/>
          </>
        );
      case "jira":
        return (
          <>
            <CustomTab icon={faProjectDiagram} tabName={"projects"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Projects"} disabled={!authorizedAction("edit_tool_projects_tabs", toolData?.data)}/>
          </>
          );
      case "sfdc-configurator":
        return (
          <>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        );
      default: return <></>;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <ToggleTab icon={faList} tabName={"attributes"} settingsTabName={"attribute_settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Attributes"}/>
        <CustomTab icon={faDiceD20} tabName={"pipelines"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Usage"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Connection"} disabled={!authorizedAction("edit_tool_connection", toolData?.data)}/>
        {getDynamicTabs()}
      </CustomTabContainer>
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
        return <AttributeEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData} handleClose={toggleAttributesPanel} />;
      case "configuration":
        return <ToolConfigurationPanel toolData={toolData} loadData={loadData}/>;
      case "jobs":
        return <ToolJobsPanel toolData={toolData} loadData={loadData} isLoading={isLoading}/>;
      case "applications":
        return <ToolApplicationsPanel toolData={toolData} loadData={loadData} isLoading={isLoading}/>;
      case "accounts":
        return <ToolAccountsPanel isLoading={isLoading} toolData={toolData} loadData={loadData}/>;
      case "logs":
        return <ToolLogsPanel toolData={toolData}/>;
      case "tagging":
        return <ToolTaggingPanel toolData={toolData} />;
      case "projects":
        return <ToolProjectsPanel toolData={toolData} isLoading={isLoading} loadData={loadData} />;
      case "pipelines":
        return <ToolPipelinesPanel toolData={toolData} />;
      case "scmaccounts":
        return <ScmToolAccountsPanel toolData={toolData} setToolData={setToolData} loadData={loadData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} customerAccessRules={customerAccessRules} />);
}

ToolDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  tab: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ToolDetailPanel;


