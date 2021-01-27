import React, {useState} from "react";
import {faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import ToolInventory from "components/inventory/tools/ToolInventory";
import PlatformInventory from "components/inventory/platform/platformInventory";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";

function Inventory() {
  const [activeTab, setActiveTab] = useState("tools");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tools":
        return <ToolInventory />;
      case "platform":
        return <PlatformInventory />;
      default:
        return null;
    }
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
        <CustomTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Platform"} />
      </CustomTabContainer>
    );
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolRegistry"}
      pageDescription={`
        The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized inventory.
      `}
    >
      <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
    </ScreenContainer>
  );
}

export default Inventory;
