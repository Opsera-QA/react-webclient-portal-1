import React from "react";
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStateFieldBase from "components/common/fields/pipelines/state/PipelineStateFieldBase";

function FailedPipelineStateFieldBase() {
  return (
    <PipelineStateFieldBase
      colorClassName={"red"}
      innerText={"An error has occurred in this pipeline.  See activity logs for details."}
      icon={faTimesCircle}
      statusText={"Failed"}
    />
  );
}

export default FailedPipelineStateFieldBase;