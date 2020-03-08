import React from "react";
import MyPipelines from "./myPipelines";
import "./workflows.css";

function Workflow() {
  
  return (
    <div className="mt-3 max-content-width">
      <h4>Pipelines</h4>
      <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p>
      
      <MyPipelines />      

    </div>
  );
}


export default Workflow;
