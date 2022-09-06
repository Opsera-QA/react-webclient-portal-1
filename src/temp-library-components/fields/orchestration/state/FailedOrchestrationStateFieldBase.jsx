import React from "react";
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import OrchestrationStateBase from "temp-library-components/fields/orchestration/state/OrchestrationStateBase";
import PropType from "prop-types";

export default function FailedOrchestrationStateFieldBase(
  {
    type,
    className,
  }) {
  return (
    <OrchestrationStateBase
      colorClassName={"red"}
      innerText={`An error has occurred in this ${type}.  See activity logs for details.`}
      icon={faTimesCircle}
      statusText={"Failed"}
      className={className}
    />
  );
}

FailedOrchestrationStateFieldBase.propTypes = {
  type: PropType.string,
  className: PropType.string,
};