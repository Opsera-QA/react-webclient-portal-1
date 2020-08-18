import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/ToolInventory";
//import { useHistory } from "react-router-dom";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";

function Inventory() {
//  const history = useHistory();
  const [tabView, setTabView] = useState("tools");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setTabView(tabSelection);
  };

  return (
    <div className="max-content-width">
      <BreadcrumbTrail destination="toolRegistry"/>
      <h4>Tool Registry</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized inventory.</p>

      <div className="alternate-tabs">
        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
            <a className={"nav-link " + (tabView === "tools" ? "active" : "")} href="#" onClick={handleTabClick("tools")}>Tools</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (tabView === "platform" ? "active" : "")} href="#" onClick={handleTabClick("platform")}>Platform</a>
          </li>
        </ul>
      </div>

      {tabView === "tools" &&
      <>
        <ToolInventory/>
      </>}

      {tabView === "platform" &&
      <>
        <PlatformInventory/>
      </>}

      {/*<div className="default-custom-tabs">
        <Tabs defaultActiveKey="tools" id="tool-inventory-tabs">
          <Tab eventKey="tools" title="Tools">
            <ToolInventory />
          </Tab>
          <Tab eventKey="platform" title="Platform">
            <PlatformInventory />
          </Tab>        
        </Tabs>
      </div>*/}

    </div>
  );
}

export default Inventory;
