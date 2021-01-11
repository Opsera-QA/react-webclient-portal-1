import React, { useEffect, useState } from "react";

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
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import ToolPipelinesPanel from "./ToolPipelinesPanel";
import ToolTaggingPanel from "./ToolTaggingPanel";
import ToolProjectsPanel from "components/inventory/tools/tool_details/projects/ToolProjectsPanel";

function ToolDetailPanel({ toolData, setToolData, loadData, isLoading, tab }) {
  const [activeTab, setActiveTab] = useState(tab ? tab : "summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getDynamicTabs = () => {
    switch (toolData?.getData("tool_identifier")) {
      case "jenkins":
      return (
        <>
          <CustomTab icon={faAbacus} tabName={"jobs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jobs"}/>
          <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"}/>
          <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
        </>
      );
      case "argo":
      case "octopus":
        return (
          <>
            <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Applications"}/>
            <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"}/>
          </>
        )
      case "gitlab":
      case "github":
      case "bitbucket":
        return (
          <>
          {/*<CustomTab icon={faTags} tabName={"tagging"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tagging"}/>*/}
          </>
        );
      case "jira":
        return (
          <>
            <CustomTab icon={faProjectDiagram} tabName={"projects"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Projects"}/>
          </>
          );
      default: return <></>;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Attributes"}/>
        <CustomTab icon={faDiceD20} tabName={"pipelines"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Usage"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Connection"}/>
        {getDynamicTabs()}
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolSummaryPanel toolData={toolData} setToolData={setToolData} setActiveTab={setActiveTab} />;
      case "attributes":
        return <ToolAttributesPanel toolData={toolData}/>;
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
        return <ToolProjectsPanel toolData={toolData} isLoading={isLoading} loadData={loadData} />
      case "settings":
        return <ToolEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData}/>;
      case "pipelines":
        return <ToolPipelinesPanel toolData={toolData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  tab: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ToolDetailPanel;


