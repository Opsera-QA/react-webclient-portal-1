import React from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";
import TextField from "components/common/form_fields/text-field";

// TODO: Rework
function PipelineSummaryField({pipelineData}) {
  const constructPipelineSummaryText = () => {
    let lastRun = pipelineData.getPersistData()?.workflow?.last_run;

    if (lastRun != null) {
      return (
        `Last run completed on ${format(new Date(lastRun.completed), "yyyy-MM-dd', 'hh:mm a")}
          with a status of ${lastRun.status}.`
        );
    }
    else {
      return `This pipeline has not yet been run.`
    }
  };

  return (
    <TextField label={"Summary"} value={constructPipelineSummaryText()}/>
  );
}

PipelineSummaryField.propTypes = {
  pipelineData: PropTypes.object,
};

export default PipelineSummaryField;