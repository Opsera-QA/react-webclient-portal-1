import React from "react";
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStatusBase from "./PipelineStatusBase";

function FailedPipelineStatus() {
  return (
    <PipelineStatusBase
      className="red"
      innerText={"An error has occurred in this pipeline.  See activity logs for details."}
      icon={faTimesCircle}
      statusText={"Failed"}
    />
  );
}

export default FailedPipelineStatus;