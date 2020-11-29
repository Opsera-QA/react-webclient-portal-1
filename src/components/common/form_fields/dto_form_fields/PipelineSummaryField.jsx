import React from "react";
import PropTypes from "prop-types";
import TextField from "../text-field";
import {format} from "date-fns";

function PipelineSummaryField({pipelineData}) {
  const constructPipelineSummaryText = () => {
    let lastRunTime = pipelineData.getPersistData()?.workflow?.last_run?.completed;

    if (lastRunTime != null) {
      return (
        <span>Last run completed on {format(new Date(pipelineData.getPersistData()?.workflow?.last_run?.completed), "yyyy-MM-dd', 'hh:mm a")}
          with a status of {pipelineData.getPersistData()?.workflow?.last_run?.status}.
        </span>
        );
    }
    else {
      return <span>This pipeline has not yet been run.</span>
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