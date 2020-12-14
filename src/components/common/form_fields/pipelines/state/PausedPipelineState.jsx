import React from "react";
import {faPause} from "@fortawesome/pro-light-svg-icons";
import PipelineStateBase from "./PipelineStateBase";

function PausedPipelineState() {
  return (
    <PipelineStateBase
      className="yellow"
      innerText={"The pipeline operation is currently paused."}
      icon={faPause}
      statusText={"Paused"}
    />
  );
}

export default PausedPipelineState;