import React from "react";
import PropTypes from "prop-types";
import {pipelineStepIconConstants} from "components/common/icons/pipelines/steps/pipelineStepIcon.constants";

export default function PipelineStepIcon(
  {
    pipelineStep,
    className,
  }) {
  const icon = pipelineStepIconConstants.getLargeVendorIconComponentFromPipelineStep(pipelineStep, 1);

  if (pipelineStep == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <div className={"mx-auto"}>
          {icon}
        </div>
      </div>
    </div>
  );
}

PipelineStepIcon.propTypes = {
  pipelineStep: PropTypes.object,
  className: PropTypes.string,
};