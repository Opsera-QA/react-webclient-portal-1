import React from "react";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropTypes from "prop-types";

export default function SuccessOrchestrationStateFieldBase(
  {
    type,
    className,
    showStatusText,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"green"}
      innerText={`The most recent run of this ${type} was successful.`}
      icon={faCheckCircle}
      statusText={"Success"}
      className={className}
      showStatusText={showStatusText}
    />
  );
}

SuccessOrchestrationStateFieldBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  showStatusText: PropTypes.bool,
};