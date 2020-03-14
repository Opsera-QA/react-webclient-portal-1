import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyPipelines from "./myPipelines";
import PipelineDetail from "./pipelineDetail";
import PipelineWorkflow from "./pipelineWorkflow";
import WorkflowCatalog from "./workflowCatalog";
import "./workflows.css";

function Workflow() {
  const { id, view } = useParams();
  const [itemId, setItemId] = useState({});
  const [selection, setSelection] = useState("myPipelines");
    
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
  }, [id]);
  
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
        <h4>Pipelines</h4>
        <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p>
      
        <ul className="nav nav-pills mb-2">
          <li className="nav-item">
            <Link className={"nav-link " + (selection === "catalog" ? "active" : "")} 
              to="/workflow/catalog" onClick={handleTabClick("catalog")}>Catalog</Link>
          </li>
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
              to={location => `/workflow/${itemId}/model`} onClick={handleTabClick("workflowView")}>Workflow</Link>
          </li>
        
        </ul>
      </div>
      {itemId.length > 0 && selection === "pipelineDetail" ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length > 0 && selection === "workflowView" ? <PipelineWorkflow id={itemId} /> : null } 
      {itemId.length === 0 && selection === "catalog" ? <WorkflowCatalog id={itemId} /> : null } 
      {itemId.length === 0 && selection === "myPipelines" ? <MyPipelines /> : null }
             
    </>
  );
}


export default Workflow;
