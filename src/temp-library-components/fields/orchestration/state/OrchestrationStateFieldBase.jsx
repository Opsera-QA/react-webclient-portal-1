import PropTypes from "prop-types";
import React from "react";
import FailedOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/FailedOrchestrationStateFieldBase";
import RunningOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/RunningOrchestrationStateFieldBase";
import PausedOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/PausedOrchestrationStateFieldBase";
import SuccessOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/SuccessOrchestrationStateFieldBase";
import StoppedOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/StoppedOrchestrationStateFieldBase";

export default function OrchestrationStateFieldBase(
  {
    orchestrationState,
    type,
    className,
  }) {
  switch (orchestrationState) {
    case "failed":
      return (
        <FailedOrchestrationStateFieldBase
          type={type}
          className={className}
        />
      );
    case "running":
      return (
        <RunningOrchestrationStateFieldBase
          type={type}
          className={className}
        />
      );
    case "paused":
      return (
        <PausedOrchestrationStateFieldBase
          type={type}
          className={className}
        />
      );
    case "success":
      return (
        <SuccessOrchestrationStateFieldBase
          type={type}
          className={className}
        />
      );
    default:
      return (
        <StoppedOrchestrationStateFieldBase
          type={type}
          className={className}
        />
      );
  }
}

OrchestrationStateFieldBase.propTypes = {
  orchestrationState: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};