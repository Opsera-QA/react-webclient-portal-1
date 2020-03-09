import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyPipelines from "./myPipelines";
import PipelineDetail from "./pipelineDetail";
import PipelineWorkflow from "./pipelineWorkflow";
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

  const setPillClass = (item, selection) => {
    if (selection === "myPipelines") {
      return "disabled";
    }

    if (selection === item) {
      return "active";
    } else {
      return "";
    }
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
          <Link className={"nav-link " + setPillClass("pipelineDetail", selection)} 
            to={location => `/workflow/${itemId}`} onClick={handleTabClick("pipelineDetail")}>Details</Link>
        </li>

        <li className="nav-item">
          <Link className={"nav-link " + setPillClass("workflowView", selection)} 
            to={location => `/workflow/${itemId}`} onClick={handleTabClick("workflowView")}>Workflow</Link>
        </li>
        
      </ul>

      {itemId.length > 0 && selection === "pipelineDetail" ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length > 0 && selection === "workflowView" ? <PipelineWorkflow id={itemId} /> : null } 
      {itemId.length === 0 ? <MyPipelines /> : null }
             
    </div>
  );
}


export default Workflow;
