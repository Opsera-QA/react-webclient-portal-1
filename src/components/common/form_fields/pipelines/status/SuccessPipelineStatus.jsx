import React from "react";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStatusBase from "./PipelineStatusBase";

function SuccessPipelineStatus() {
  return (
    <PipelineStatusBase
      className="green"
      innerText={"The most recent run of this pipeline was successful."}
      icon={faCheckCircle}
      statusText={"Successful"}
    />
  );
}

export default SuccessPipelineStatus;