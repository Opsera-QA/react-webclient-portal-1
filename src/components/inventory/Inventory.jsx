import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/ToolInventory";
//import { useHistory } from "react-router-dom";
import BreadcrumbTrail from "../common/navigation/breadcrumbTrail";

function Inventory () {
//  const history = useHistory();

  return (
    <div className="max-content-width">
      <BreadcrumbTrail destination="toolRegistry"/>
      <h4>Tool Registry</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized inventory.</p>
      <div className="default-custom-tabs">
        <Tabs defaultActiveKey="tools" id="tool-inventory-tabs">
          <Tab eventKey="tools" title="Tools">
            <ToolInventory />
          </Tab>
          <Tab eventKey="platform" title="Platform">
            <PlatformInventory />
          </Tab>        
        </Tabs>
      </div>
    </div>
  );
}

export default Inventory;
