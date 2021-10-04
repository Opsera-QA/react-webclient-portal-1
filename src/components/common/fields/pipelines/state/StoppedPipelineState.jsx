import React from "react";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import PipelineStateBase from "components/common/fields/pipelines/state/PipelineStateBase";

function StoppedPipelineState() {
  return (
    <PipelineStateBase
      innerText={"This pipeline is not currently running."}
      icon={faStop}
      statusText={"Stopped"}
    />
  );
}

export default StoppedPipelineState;