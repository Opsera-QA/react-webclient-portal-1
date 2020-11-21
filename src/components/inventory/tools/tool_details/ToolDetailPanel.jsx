import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "./ToolLogsPanel";
import ToolEditorPanel from "./ToolEditorPanel";
import ToolConfigurationPanel from "./ToolConfigurationPanel";
import ToolAccountsPanel from "./ToolAccountsPanel";
import ToolAttributesPanel from "./ToolAttributesPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {
  faAbacus,
  faClipboardList,
  faList,
  faTable,
  faUsers,
  faCogs,
  faBrowser,
} from "@fortawesome/pro-solid-svg-icons";
import ToolApplicationsPanel from "./ToolAppliationsPanel";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import ToolSummaryPanel from "./ToolSummaryPanel";

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
        return <ToolSummaryPanel toolData={toolData} setToolData={setToolData}/>;
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
        <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
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
        <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Settings"}/>
      </CustomTabContainer>
    );

  case "argo":
    return (
      <CustomTabContainer>
        <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Attributes"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                   activeTab={activeTab} tabText={"Connection"}/>
        <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Applications"}/>
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Logs"}/>
        <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Settings"}/>
      </CustomTabContainer>
    );
    case "octopus":
      return (
        <CustomTabContainer>
          <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
          <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Attributes"}/>
          <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                     activeTab={activeTab} tabText={"Connection"}/>
          <CustomTab icon={faBrowser} tabName={"applications"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Applications"}/>
          <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab}
            tabText={"Logs"}/>
          <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                     tabText={"Settings"}/>
        </CustomTabContainer>
      );

  default:
    return (
      <CustomTabContainer>
        <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
        <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Attributes"}/>
        <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick}
                   activeTab={activeTab} tabText={"Connection"}/>
        <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Settings"}/>
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


