import React from "react";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function StoppedOrchestrationStateFieldBase(
  {
    type,
    className,
  }) {
  return (
    <OrchestrationStateBase
      innerText={`This ${type} is not currently running.`}
      icon={faStop}
      statusText={"Stopped"}
      className={className}
    />
  );
}

StoppedOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};