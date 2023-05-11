import React from "react";
import {faStop} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function StoppedOrchestrationStateFieldBase(
  {
    type,
    className,
    showStatusText,
  }) {
  return (
    <OrchestrationStateBase
      innerText={`This ${type} is not currently running.`}
      icon={faStop}
      statusText={"Stopped"}
      className={className}
      showStatusText={showStatusText}
    />
  );
}

StoppedOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  showStatusText: PropTypes.bool,
};