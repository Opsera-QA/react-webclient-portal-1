import React from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

// TODO: Rework
function PipelineSummaryField({pipelineData, className}) {
  const constructPipelineSummaryText = () => {
    let lastRun = pipelineData.getPersistData()?.workflow?.last_run;

    if (lastRun != null) {
      return (
        `Last run completed on ${format(new Date(lastRun.completed), "yyyy-MM-dd', 'hh:mm a")}
          with a status of ${lastRun.status}.`
        );
    }
    else {
      return `This pipeline has not yet been run.`;
    }
  };

  return (
    <StandaloneTextFieldBase label={"Summary"} text={constructPipelineSummaryText()}/>
  );
}

PipelineSummaryField.propTypes = {
  pipelineData: PropTypes.object,
};

export default PipelineSummaryField;