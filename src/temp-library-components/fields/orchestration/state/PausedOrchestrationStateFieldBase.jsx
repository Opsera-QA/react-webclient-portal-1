import React from "react";
import {faPause} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function PausedOrchestrationStateFieldBase(
  {
    type,
    className,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"yellow"}
      innerText={`The ${type} operation is currently paused.`}
      icon={faPause}
      statusText={"Paused"}
      className={className}
    />
  );
}

PausedOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};