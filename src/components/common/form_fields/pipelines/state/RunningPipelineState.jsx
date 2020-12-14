import React from "react";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PipelineStateBase from "./PipelineStateBase";

function RunningPipelineState() {
  return (
    <PipelineStateBase
      className="green"
      innerText={"A pipeline operation is currently in progress."}
      icon={faSpinner}
      statusText={"Running"}
    />
  );
}

export default RunningPipelineState;