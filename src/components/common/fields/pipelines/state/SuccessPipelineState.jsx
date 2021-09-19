import React from "react";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStateBase from "components/common/fields/pipelines/state/PipelineStateBase";

function SuccessPipelineState() {
  return (
    <PipelineStateBase
      className="green"
      innerText={"The most recent run of this pipeline was successful."}
      icon={faCheckCircle}
      statusText={"Successful"}
    />
  );
}

export default SuccessPipelineState;