import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import MyPipelines from "./myPipelines";
import PipelineDetail from "./pipelineDetail";
import "./workflows.css";

function Workflow() {
  const { id } = useParams();
  const [itemId, setItemId] = useState({});
  const [selection, setSelection] = useState("myPipelines");
    
  useEffect( () => {
    if (typeof id === "string") {
      setItemId(id.match(/^[0-9a-fA-F]{24}$/) ? id : "");
      setSelection("pipelineDetail");
    } else {
      setItemId("");
      setSelection("myPipelines");
    }
  }, [id]);
  
  const handleTabClick = param => e => {
    //e.preventDefault();
    setSelection(param);
  };

  return (
    <div className="mt-3 max-content-width">
      <h4>Pipelines</h4>
      <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p>
      
      <ul className="nav nav-pills mb-2">
        <li className="nav-item">
          <Link className={"nav-link " + (selection === "myPipelines" ? "active" : "")} 
            to="/workflow" onClick={handleTabClick("myPipelines")}>My Pipelines</Link>
        </li>
        
        <li className="nav-item">
          <Link className={"nav-link " + (selection === "pipelineDetail" ? "active" : "disabled")} 
            to={location => `/workflow/${itemId}`} onClick={handleTabClick("pipelineDetail")}>Details</Link>
        </li>
      </ul>

      {itemId.length > 0 ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length === 0 ? <MyPipelines /> : null }
             
    </div>
  );
}


export default Workflow;
