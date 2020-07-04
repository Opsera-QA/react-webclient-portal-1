import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/toolsInventory";

function Inventory () {
  const { view } = useParams();
  const [selection, setSelection] = useState("");
  const history = useHistory();

  useEffect(()=> {
    if (view === "tools") {
      setSelection("tools");
    } else {
      setSelection("platform");
    }  
  }, []);
  
  const handleTabClick = (param, path) => {
    setSelection(param);
    history.push(path);
  };

  return (
    <div className="max-content-width">
      <h4>{selection === "tools" ? "Tool Registry" : "Inventory"}</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized inventory.</p>

      <ul className="nav nav-pills mt-2">
        <li className="nav-item">
          <Button size="sm" className="mr-2" variant={selection === "tools" ? "primary" : "secondary"} 
            onClick={() => { handleTabClick("tools", "/inventory/tools");}}>Tools</Button>
        </li>
        <li className="nav-item">
          <Button size="sm" className="mr-2" variant={selection === "platform" ? "primary" : "secondary"}   
            onClick={() => { handleTabClick("platform", "/inventory");}}>Platform</Button>
        </li>        
      </ul>
      {selection === "platform" ? <PlatformInventory /> : null}
      {selection === "tools" ? <ToolInventory /> : null}
    </div >
  );  
}

export default Inventory;
