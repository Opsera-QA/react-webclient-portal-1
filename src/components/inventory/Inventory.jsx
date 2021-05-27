import React, { useContext, useEffect, useState } from "react";
import {faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ToolInventory from "components/inventory/tools/ToolInventory";
import PlatformInventory from "components/inventory/platform/platformInventory";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {AuthContext} from "contexts/AuthContext";
import ParametersInventory from "components/inventory/parameters/ParametersInventory";

function Inventory() {
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});
  const [activeTab, setActiveTab] = useState("tools");

  useEffect(() => {
    initComponent().catch(error => {
      throw { error };
    });
  }, []);

  const initComponent = async () => {
    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tools":
        return <ToolInventory customerAccessRules={customerAccessRules} />;
      case "platform":
        return <PlatformInventory />;
      // case "parameters":
      //   return <ParametersInventory />;
      default:
        return null;
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Platform"} />
        {/*<NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Parameters"} />*/}
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"toolRegistry"}
      pageDescription={`
        The Opsera Tool Registry allows you to register, track and configure all of the tools in your organization in
        one centralized location.
      `}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default Inventory;
