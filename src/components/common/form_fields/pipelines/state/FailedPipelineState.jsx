import React from "react";
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStateBase from "./PipelineStateBase";

function FailedPipelineState() {
  return (
    <PipelineStateBase
      className="red"
      innerText={"An error has occurred in this pipeline.  See activity logs for details."}
      icon={faTimesCircle}
      statusText={"Failed"}
    />
  );
}

export default FailedPipelineState;