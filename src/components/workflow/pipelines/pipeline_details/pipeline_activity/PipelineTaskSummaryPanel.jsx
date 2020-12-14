import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase from "./PipelineTaskSummaryPanelBase";
import Model from "../../../../../core/data_model/model";
import pipelineTaskMetadata from "./pipeline-task-metadata";
import parallelProcessorPipelineTaskMetadata
  from "../workflow/step_configuration/step_tool_configuration_forms/parallel_processor/parallel-processor-pipeline-task-metadata";
import ParallelProcessorPipelineTaskSummaryPanel
  from "../workflow/step_configuration/step_tool_configuration_forms/parallel_processor/ParallelProcessorPipelineTaskSummaryPanel";
import pipelineActions from "../../../pipeline-actions";
import {AuthContext} from "../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../common/status_notifications/loading";

function PipelineTaskSummaryPanel({ pipelineTaskData }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPipelineState();
  }, []);

  const getPipelineState = () => {
    try {
      setIsLoading(true);
      let pipelineIds = [];
      pipelineIds.push(pipelineTaskData["pipeline_id"]);
      let pipelineStateResponse = pipelineActions.getPipelineStates(pipelineIds, getAccessToken);

      if (pipelineStateResponse?.data) {
        pipelineTaskData["state"] = pipelineStateResponse.data[0].state;
      }
    }
    catch (error) {
      pipelineTaskData["state"] = "paused";
    }
    finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />
  }

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