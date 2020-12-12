import React from "react";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PipelineStatusBase from "./PipelineStatusBase";

function RunningPipelineStatus() {
  return (
    <PipelineStatusBase
      className="green"
      innerText={"A pipeline operation is currently in progress."}
      icon={faSpinner}
      statusText={"Running"}
    />
  );
}

export default RunningPipelineStatus;