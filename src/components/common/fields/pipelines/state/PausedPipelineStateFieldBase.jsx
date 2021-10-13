import React from "react";
import {faPause} from "@fortawesome/pro-light-svg-icons";
import PipelineStateFieldBase from "components/common/fields/pipelines/state/PipelineStateFieldBase";

function PausedPipelineStateFieldBase() {
  return (
    <PipelineStateFieldBase
      colorClassName={"yellow"}
      innerText={"The pipeline operation is currently paused."}
      icon={faPause}
      statusText={"Paused"}
    />
  );
}

export default PausedPipelineStateFieldBase;