import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyPipelines from "./myPipelines";
import PipelineDetail from "./pipelineDetail";
import "./workflows.css";

function Workflow() {
  const { id } = useParams();
  const [itemId, setItemId] = useState({});
  

  useEffect( () => {
    if (typeof id === "string") {
      setItemId(id.match(/^[0-9a-fA-F]{24}$/) ? id : "");
    } else {
      setItemId("");
    }
  }, [id]);
  

  return (
    <div className="mt-3 max-content-width">
      <h4>Pipelines</h4>
      <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p>
      
      {itemId.length > 0 ? 
        <PipelineDetail id={itemId} /> 
        :
        <MyPipelines />      
      }
      
    </div>
  );
}


export default Workflow;
