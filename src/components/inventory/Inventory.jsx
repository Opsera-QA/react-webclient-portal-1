import React, { useContext, useEffect, useState } from "react";
import ToolInventory from "components/inventory/tools/ToolInventory";
import PlatformInventory from "components/inventory/platform/platformInventory";
import {AuthContext} from "contexts/AuthContext";
import ParametersInventory from "components/inventory/parameters/ParametersInventory";
import ScriptsInventory from "components/inventory/scripts/ScriptsInventory";

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
        return <ToolInventory customerAccessRules={customerAccessRules} handleTabClick={handleTabClick} />;
      case "platform":
        return <PlatformInventory handleTabClick={handleTabClick} />;
      case "parameters":
        return <ParametersInventory customerAccessRules={customerAccessRules} handleTabClick={handleTabClick} />;
      // case "scripts":
      //   return <ScriptsInventory customerAccessRules={customerAccessRules} handleTabClick={handleTabClick} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {getCurrentView()}
    </div>
  );
}

export default Inventory;
