import React from "react";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import PipelineStateFieldBase from "components/common/fields/pipelines/state/PipelineStateFieldBase";

export function RunningPipelineStateFieldBase() {
  return (
    <PipelineStateFieldBase
      colorClassName={"green"}
      innerText={"A pipeline operation is currently in progress."}
      icon={faSpinner}
      statusText={"Running"}
    />
  );
}

export default RunningPipelineStateFieldBase;