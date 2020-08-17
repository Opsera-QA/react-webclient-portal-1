import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import ToolJobsPanel from "./ToolJobsPanel";
import ToolLogsPanel from "./ToolLogsPanel";
import ToolEditorPanel from "./ToolEditorPanel";
import ToolConfigurationPanel from "./ToolConfigurationPanel";
import ToolAccountsPanel from "./ToolAccountsPanel";

function ToolDetailPanel({ toolData, setToolData, loadData }) {
  const [activeTab, setActiveTab] = useState("configuration");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col lg={12}>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "configuration" ? "active" : "")} href="#"
                     onClick={handleTabClick("configuration")}>Configuration</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "jobs" ? "active" : "")} href="#"
                     onClick={handleTabClick("jobs")}>Jobs</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "accounts" ? "active" : "")} href="#"
                     onClick={handleTabClick("accounts")}>Accounts</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "logs" ? "active" : "")}
                     onClick={handleTabClick("logs")}>Logs</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "settings" ? "active" : "")}
                     onClick={handleTabClick("settings")}>Settings</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12}>
            <div className="tabbed-content-block detail-view-detail-panel">
              {toolData &&
              <ToolDetailsView toolData={toolData} setToolData={setToolData} loadData={loadData} activeTab={activeTab}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolDetailsView({activeTab, toolData, setToolData, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      // case "membership":
      //   return <ToolPropertiesForm type="edit" toolData={toolData} getToolRegistryItem={loadData} />
      case "configuration":
        return <ToolConfigurationPanel toolData={toolData} loadData={loadData} />;
      case "jobs":
        return <ToolJobsPanel toolData={toolData} loadData={loadData}/>;
      case "accounts":
        return <ToolAccountsPanel toolData={toolData} loadData={loadData} />;
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
  loadData: PropTypes.func
};

export default ToolDetailPanel;


