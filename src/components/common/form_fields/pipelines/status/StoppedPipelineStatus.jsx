import React from "react";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import PipelineStatusBase from "./PipelineStatusBase";

function StoppedPipelineStatus() {
  return (
    <PipelineStatusBase
      innerText={"This pipeline is not currently running."}
      icon={faStop}
      statusText={"Stopped"}
    />
  );
}

export default StoppedPipelineStatus;