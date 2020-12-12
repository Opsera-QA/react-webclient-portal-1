import React from "react";
import {faPause} from "@fortawesome/pro-light-svg-icons";
import PipelineStatusBase from "./PipelineStatusBase";

function PausedPipelineStatus() {
  return (
    <PipelineStatusBase
      className="yellow"
      innerText={"The pipeline operation is currently paused."}
      icon={faPause}
      statusText={"Paused"}
    />
  );
}

export default PausedPipelineStatus;