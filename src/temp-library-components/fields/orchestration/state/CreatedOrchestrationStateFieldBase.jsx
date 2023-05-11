import React from "react";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function CreatedOrchestrationStateFieldBase(
  {
    type,
    className,
    showStatusText,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"green"}
      innerText={`This ${type} has not been run yet.`}
      icon={faCheckCircle}
      statusText={"Created"}
      className={className}
      showStatusText={showStatusText}
    />
  );
}

CreatedOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  showStatusText: PropTypes.bool,
};