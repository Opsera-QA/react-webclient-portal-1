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
  faBrowser, faTags,
} from "@fortawesome/pro-light-svg-icons";
import ToolApplicationsPanel from "./ToolAppliationsPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "./ToolSummaryPanel";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";

function ToolDetailPanel({ toolData, setToolData, loadData, isLoading }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (<ToolTabOptions activeTab={activeTab} handleTabClick={handleTabClick} tool_identifier={toolData["tool_identifier"]}/>);
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
        return <div className="text-center p-5 text-muted mt-5">Tagging is not currently available for this tool.</div>;
      case "settings":
        return <ToolEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData}/>;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

// TODO: Rework this
function ToolTabOptions({ activeTab, tool_identifier, handleTabClick }) {
  useEffect(() => {}, [tool_identifier]);

  switch (tool_identifier) {
  case "jenkins":
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Attributes"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                   activeTab={activeTab} tabText={"Connection"}/>
        <CustomTab icon={faAbacus} tabName={"jobs"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Jobs"}/>
        <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Accounts"}/>
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Logs"}/>
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );

  case "argo":
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Attributes"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                   activeTab={activeTab} tabText={"Connection"}/>
        <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Applications"}/>
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Logs"}/>
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
    case "octopus":
      return (
        <CustomTabContainer>
          <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
          <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Attributes"}/>
          <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                     activeTab={activeTab} tabText={"Connection"}/>
          <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Applications"}/>
          <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab}
            tabText={"Logs"}/>
          <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
        </CustomTabContainer>
      );
    case "gitlab":
    case "github":
    case "bitbucket":
      return (
        <CustomTabContainer>
          <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
          <CustomTab icon={faTags} tabName={"tagging"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tagging"}/>
          <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Attributes"}/>
          <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                     activeTab={activeTab} tabText={"Connection"}/>
          <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
        </CustomTabContainer>
      );
  default:
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Attributes"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                   activeTab={activeTab} tabText={"Connection"}/>
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  }
}


ToolDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

ToolTabOptions.propTypes = {
  activeTab: PropTypes.string,
  tool_identifier: PropTypes.string,
  handleTabClick: PropTypes.func,
};

export default ToolDetailPanel;


