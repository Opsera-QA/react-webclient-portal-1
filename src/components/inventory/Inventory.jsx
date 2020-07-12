import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/toolsInventory";
import { useHistory } from "react-router-dom";

function Inventory () {
  const history = useHistory();

  return (
    <div className="max-content-width">
      <h4>Tool Registry</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized inventory.</p>
      <Tabs defaultActiveKey="tools" id="uncontrolled-tab-example">
        <Tab eventKey="platform" title="Platform" onClick={() => { history.push("/inventory");}}>
          <PlatformInventory />
        </Tab>
        <Tab eventKey="tools" title="Tool Type" onClick={() => { history.push("/inventory/tools");}}>
          <ToolInventory />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Inventory;
