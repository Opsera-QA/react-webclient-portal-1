import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "./ToolLogsPanel";
import ToolEditorPanel from "./ToolEditorPanel";
import ToolConfigurationPanel from "./ToolConfigurationPanel";
import ToolAccountsPanel from "./ToolAccountsPanel";
import ToolAttributesPanel from "./ToolAttributesPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import {faAbacus, faClipboardList, faList, faTable, faUsers} from "@fortawesome/pro-solid-svg-icons";

function ToolDetailPanel({ toolData, setToolData, loadData, isLoading }) {
  const [activeTab, setActiveTab] = useState("attributes");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faList} tabName={"attributes"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Attributes"} />
              <CustomTab icon={faClipboardList} tabName={"configuration"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Connection"} />
              <CustomTab icon={faAbacus} tabName={"jobs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Jobs"} />
              <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"} />
              <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Logs"} />
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {toolData &&
              <ToolDetailsView toolData={toolData} setToolData={setToolData} loadData={loadData} activeTab={activeTab} isLoading={isLoading}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolDetailsView({activeTab, toolData, setToolData, loadData, isLoading}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "attributes":
        return <ToolAttributesPanel toolData={toolData} />
      case "configuration":
        return <ToolConfigurationPanel toolData={toolData} loadData={loadData} />;
      case "jobs":
        return <ToolJobsPanel toolData={toolData} loadData={loadData} isLoading={isLoading}/>;
      case "accounts":
        return <ToolAccountsPanel isLoading={isLoading} toolData={toolData} loadData={loadData} />;
      case "logs":
        return <ToolLogsPanel toolData={toolData} />;
      case "settings":
        return <ToolEditorPanel toolData={toolData} setToolData={setToolData} loadData={loadData} />;
      default:
        return null;
    }
  }
}

ToolDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ToolDetailPanel;


