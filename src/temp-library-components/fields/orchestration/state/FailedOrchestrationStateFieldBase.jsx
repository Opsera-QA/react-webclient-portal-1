import React from "react";
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function FailedOrchestrationStateFieldBase(
  {
    type,
    className,
    showStatusText,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"red"}
      innerText={`An error has occurred in this ${type}.  See activity logs for details.`}
      icon={faTimesCircle}
      statusText={"Failed"}
      className={className}
      showStatusText={showStatusText}
    />
  );
}

FailedOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  showStatusText: PropTypes.bool,
};