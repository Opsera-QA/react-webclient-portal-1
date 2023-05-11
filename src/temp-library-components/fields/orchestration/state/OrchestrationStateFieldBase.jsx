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
import CreatedOrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/CreatedOrchestrationStateFieldBase";

export default function OrchestrationStateFieldBase(
  {
    orchestrationState,
    showStoppedState,
    type,
    className,
    showStatusText,
  }) {
  switch (orchestrationState) {
    case "failed":
    case "failure":
      return (
        <FailedOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
    case "running":
      return (
        <RunningOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
    case "paused":
      return (
        <PausedOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
    case "success":
    case "successful":
      return (
        <SuccessOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
    case "created":
      return (
        <CreatedOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
    default:
      if (showStoppedState === false) {
        return null;
      }

      return (
        <StoppedOrchestrationStateFieldBase
          type={type}
          className={className}
          showStatusText={showStatusText}
        />
      );
  }
}

OrchestrationStateFieldBase.propTypes = {
  orchestrationState: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  showStoppedState: PropTypes.bool,
  showStatusText: PropTypes.bool,
};