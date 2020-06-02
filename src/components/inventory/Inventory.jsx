import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";  

import PlatformInventory from "./platform/platformInventory";
import ToolInventory from "./tools/toolsInventory";

function Inventory () {
  const { id, view } = useParams();
  const contextType = useContext(AuthContext);
  const [selection, setSelection] = useState("");
  const [previewRole, setPreviewRole] = useState(false);

  useEffect(()=> {
    getRoles();
    if (view === "tools") {
      setSelection("tools");
    } else {
      setSelection("platform");
    }  
  }, []);
  
  const getRoles = async () => {
    const { getIsPreviewRole } = contextType; 
    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole(true);
    setPreviewRole(isPreviewRole);
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
    }    
  };

  const handleTabClick = param => e => {
    setSelection(param);
  };

  return (
    <div className="max-content-width">
      <h4>{selection === "tools" ? "Tool Registry" : "Inventory"}</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized inventory.</p>

      <ul className="nav nav-pills mt-2">
        <li className="nav-item">
          <Link className={"nav-link " + (selection === "platform" ? "active" : "")}  
            to="/inventory" onClick={handleTabClick("platform")}>Platform</Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link " + (selection === "tools" ? "active" : "") + (!previewRole ? "disabled" : "")}   
            to={"/inventory/tools"}  onClick={handleTabClick("tools")}>Tools</Link>
        </li>
      </ul>
      {selection === "platform" ? <PlatformInventory /> : null}
      {selection === "tools" ? <ToolInventory /> : null}
    </div >
  );  
}

export default Inventory;
