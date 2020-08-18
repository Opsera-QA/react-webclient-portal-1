import React, { useState } from "react";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/ToolInventory";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";

function Inventory() {
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
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={"nav-link " + (tabView === "tools" ? "active" : "")} href="#" onClick={handleTabClick("tools")}>Tools</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (tabView === "platform" ? "active" : "")} href="#" onClick={handleTabClick("platform")}>Platform</a>
          </li>
        </ul>
      </div>
      <div className="content-block-collapse">
        {tabView === "tools" && <><ToolInventory/></>}
        {tabView === "platform" && <><PlatformInventory/></>}
      </div>
    </div>
  );
}

export default Inventory;
