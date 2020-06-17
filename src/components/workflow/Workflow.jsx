import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import MyPipelines from "./myPipelines";
import PipelineDetail from "./pipelineOverview";
import PipelineWorkflowView from "./pipelineWorkflowView";
import WorkflowCatalog from "./workflowCatalog";
import "./workflows.css";

function Workflow() {
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
  
  /* const handleTabClick = param => e => {
    setSelection(param);
  }; */
  /* 
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
 */
  return (
    <>
      <div className="max-content-width">
        <h4>
          {selection === "catalog" && "Pipelines Catalog"}
          {selection === "myPipelines" && "My Pipelines"}
          {(selection === "pipelineDetail" || selection === "workflowView") && "Pipeline"}

        </h4>
        {/* <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p> */}
      

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className={selection === "catalog" ? "breadcrumb-item active" : "breadcrumb-item"}>
              {selection !== "catalog" ? <><Link to="/workflow/catalog">Catalog</Link></> : <>Catalog</>}
            </li>
            <li className={selection === "myPipelines" ? "breadcrumb-item active" : "breadcrumb-item"}>
              {selection !== "myPipelines" ? <><Link to="/workflow">My Pipelines</Link></> : <>My Pipelines</>}</li>
            
            {(selection === "pipelineDetail" || selection === "workflowView") && 
            <li className="breadcrumb-item active">Pipeline</li> }
          </ol>
        </nav>

      </div>
      {itemId.length > 0 && selection === "pipelineDetail" ? <PipelineDetail id={itemId} /> : null } 
      {itemId.length > 0 && selection === "workflowView" ? <PipelineWorkflowView id={itemId} /> : null } 
      {itemId.length === 0 && selection === "catalog" ? <WorkflowCatalog id={itemId} /> : null } 
      {itemId.length === 0 && selection === "myPipelines" ? <MyPipelines /> : null }
             
    </>
  );
}


export default Workflow;
