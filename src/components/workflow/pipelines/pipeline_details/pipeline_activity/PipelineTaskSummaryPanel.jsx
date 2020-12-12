import React from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase from "./PipelineTaskSummaryPanelBase";
import Model from "../../../../../core/data_model/model";
import pipelineTaskMetadata from "./pipeline-task-metadata";
import parallelProcessorPipelineTaskMetadata
  from "../workflow/step_configuration/step_tool_configuration_forms/parallel_processor/parallel-processor-pipeline-task-metadata";
import ParallelProcessorPipelineTaskSummaryPanel
  from "../workflow/step_configuration/step_tool_configuration_forms/parallel_processor/ParallelProcessorPipelineTaskSummaryPanel";

function PipelineTaskSummaryPanel({ pipelineTaskData }) {
  // TODO: When adding more, make switch-based function
  if (pipelineTaskData.tool_identifier === "parallel-processor") {
    return (
      <ParallelProcessorPipelineTaskSummaryPanel
        pipelineTaskData={new Model(pipelineTaskData, parallelProcessorPipelineTaskMetadata, false)}
      />
    );
  }

  return (<PipelineTaskSummaryPanelBase pipelineTaskData={new Model(pipelineTaskData, pipelineTaskMetadata, false)}/>);
}


PipelineTaskSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskSummaryPanel;