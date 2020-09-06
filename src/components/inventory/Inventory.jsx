import React, {useEffect, useState} from "react";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/ToolInventory";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";
import CustomTabContainer from "../common/tabs/CustomTabContainer";
import CustomTab from "../common/tabs/CustomTab";
import {faServer, faTools} from "@fortawesome/pro-light-svg-icons";

function Inventory() {
  const [activeTab, setActiveTab] = useState("tools");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  return (
    <div className="max-content-width">
      <BreadcrumbTrail destination="toolRegistry"/>
      <h4>Tool Registry</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized inventory.</p>

      <CustomTabContainer styling="alternate-tabs">
        <CustomTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
        <CustomTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Platform"} />
      </CustomTabContainer>
      <div className="content-block-collapse">
        <InventoryTabView activeTab={activeTab} />
      </div>
    </div>
  );
}

function InventoryTabView({ activeTab }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "tools":
        return <ToolInventory/>;
      case "platform":
        return <PlatformInventory/>;
      default:
        return null;
    }
  }
}

export default Inventory;
