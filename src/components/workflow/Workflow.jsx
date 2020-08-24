import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import MyPipelines from "./pipelines/MyPipelines";
import PipelineOverview from "./pipelines/pipeline_details/pipelineOverview";
import PipelineWorkflowView from "./pipelines/pipeline_details/workflow/pipelineWorkflowView";
import WorkflowCatalog from "./workflowCatalog";
import "./workflows.css";

function Workflow() {
  const { id, view } = useParams();
  const [itemId, setItemId] = useState({});
  const [selection, setSelection] = useState("myPipelines");
  let location = useLocation();

  useEffect(() => {
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


  return (
    <>
      <div className="max-content-width">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className={selection === "catalog" ? "breadcrumb-item active" : "breadcrumb-item"}>
              {selection !== "catalog" ? <><Link to="/workflow/catalog">Catalog</Link></> : <>Catalog</>}
            </li>
            <li className={selection === "myPipelines" ? "breadcrumb-item active" : "breadcrumb-item"}>
              {selection !== "myPipelines" ? <><Link to="/workflow">Pipelines</Link></> : <>Pipelines</>}</li>

            {(selection === "pipelineDetail" || selection === "workflowView") &&
            <li className="breadcrumb-item active">Detail View</li>}
          </ol>
        </nav>

        <h4>Pipelines</h4>
      </div>
      {itemId.length > 0 && selection === "pipelineDetail" ? <PipelineOverview id={itemId}/> : null}
      {itemId.length > 0 && selection === "workflowView" ? <PipelineWorkflowView id={itemId}/> : null}
      {((itemId.length === 0 && selection === "myPipelines") || selection === "catalog") ?
        <MyPipelines view={selection}/> : null}

    </>
  );
}


export default Workflow;
