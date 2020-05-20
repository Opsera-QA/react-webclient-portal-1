/* Top level Tool Registry View */
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faList } from "@fortawesome/free-solid-svg-icons";


function ToolsRegistry() {
  const { id, view } = useParams();
  const [itemId, setItemId] = useState({});
  const [selection, setSelection] = useState("myPipelines");
  let location = useLocation();
    
  useEffect( () => {
    if (typeof id === "string") {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        setItemId(id);
        if (view === "model") {
          setSelection("workflowView");
        } else {
          setSelection("pipelineDetail");
        }
      } else if (id.toLowerCase() === "catalog") {
        setItemId("");
        setSelection("catalog");
      } else {
        setItemId("");
        setSelection("myPipelines");
      }
    } else {
      setItemId("");
      setSelection("myPipelines");
    }
  }, [id, location]);
  
  const handleTabClick = param => e => {
    setSelection(param);
  };

  const setPillClass = (item, selection) => {
    if (selection === "myPipelines" || selection === "catalog") {
      return "disabled";
    }

    if (selection === item) {
      return "active";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="mt-3 max-content-width">
        <h4>Tools Registry</h4>
        <p>Register and configure all of your organization's tools in one place!</p>
      
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <Link className={"nav-link " + (selection === "home" ? "active" : "")} 
              to="/tools" onClick={handleTabClick("home")}><FontAwesomeIcon icon={faHome} className="mr-1"/> Home</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link " + (selection === "inventory" ? "active" : "")} 
              to="/tools/inventory" onClick={handleTabClick("inventory")}><FontAwesomeIcon icon={faList} className="mr-1"/> Inventory</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link " + (selection === "new" ? "active" : "")} 
              to="/tools/new" onClick={handleTabClick("new")}><FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool</Link>
          </li>
        </ul>
        
        
        {/* <li className="nav-item">
            <Link className={"nav-link " + setPillClass("pipelineDetail", selection)} 
              to={location => `/workflow/${itemId}`} onClick={handleTabClick("pipelineDetail")}>Overview</Link>
          </li> */}

      </div>

      {itemId.length > 0 && selection === "home" ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length > 0 && selection === "inventory" ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length > 0 && selection === "new" ? <PipelineWorkflow id={itemId} /> : null } 
             
    </>
  );
}


export default ToolsRegistry;


