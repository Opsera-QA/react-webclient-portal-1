import React from "react";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function RunningOrchestrationStateFieldBase(
  {
    type,
    className,
    showStatusText,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"green"}
      innerText={`A ${type} operation is currently in progress.`}
      icon={faSpinner}
      statusText={"Running"}
      className={className}
      showStatusText={showStatusText}
    />
  );
}

RunningOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  showStatusText: PropTypes.bool,
};