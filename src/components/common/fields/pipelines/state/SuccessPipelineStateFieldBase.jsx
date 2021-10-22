import React from "react";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStateFieldBase from "components/common/fields/pipelines/state/PipelineStateFieldBase";

function SuccessPipelineStateFieldBase() {
  return (
    <PipelineStateFieldBase
      colorClassName={"green"}
      innerText={"The most recent run of this pipeline was successful."}
      icon={faCheckCircle}
      statusText={"Successful"}
    />
  );
}

export default SuccessPipelineStateFieldBase;