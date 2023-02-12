import React from "react";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import PipelineStateFieldBase from "components/common/fields/pipelines/state/PipelineStateFieldBase";

function StoppedPipelineStateFieldBase() {
  return (
    <PipelineStateFieldBase
      innerText={"This pipeline is not currently running."}
      icon={faStop}
      statusText={"Stopped"}
    />
  );
}

export default StoppedPipelineStateFieldBase;