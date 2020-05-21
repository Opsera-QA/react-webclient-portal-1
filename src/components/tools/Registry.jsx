/*  Top level REgistry Compontent.  Offers 3 views:  
List Tools Inventory (tool_configuration collection) 
Add New Tool Entry to Collection
Configure Tool in Collection: meta data & actual setting configurations: jobs, permissions, etc */


import React, { useState, useEffect, useContext } from "react";
/* import PropTypes from "prop-types";
import { Form, Alert, Table } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";  
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import DropdownList from "react-widgets/lib/DropdownList";
 */
function ToolRegistry () {
  const [selection, setSelection] = useState("platform");
  /* const contextType = useContext(AuthContext);
  const [previewRole, setPreviewRole] = useState(false);

  useEffect(()=> {
    getRoles();
  }, []);
  
  const getRoles = async () => {
    const { getIsPreviewRole } = contextType; 
    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole);
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
    }    
  };
*/
  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);    
  }; 

  return (
    <div className="mt-3 max-content-width">
      {/* <h4>Tool Registry</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one place.</p>
 */}
      <ul className="nav mt-3">
        <li className="nav-item">
          <a className={"nav-link " + (selection === "tools" ? "active" : "")} href="#" onClick={handleTabClick("tools")}>Home</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (selection === "configuration" ? "active" : "")} href="#" onClick={handleTabClick("configuration")}>Configuration</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (selection === "new" ? "active" : "")} href="#" onClick={handleTabClick("new")}>New</a>
        </li>
      </ul>
      
      {/* {selection === "platform" ? <PlatformInventory /> : null }
      {selection === "tools" ? <div>Tools Registry Coming Soon</div> : null }  */}
      <div className="mt-3 max-content-module-width-50">
        Developing PP-55's Tool configurations interface here as well as an open ended UI form to register tools outside of the OpsERA Platform managed tools. 
        This will provide one place to track and configure any tools users will want to leverage for Pipeline or Analytics or simply have awareness of for future use.
      </div>
    </div >
  );  
}


export default ToolRegistry;
