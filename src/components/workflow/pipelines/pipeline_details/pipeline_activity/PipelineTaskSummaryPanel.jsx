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
import ChildPipelineTaskSummaryPanel
  from "../workflow/step_configuration/step_tool_configuration_forms/child/ChildPipelineTaskSummaryPanel";
import childPipelineTaskMetadata
  from "../workflow/step_configuration/step_tool_configuration_forms/child/child-pipeline-task-metadata";

function PipelineTaskSummaryPanel({ pipelineTaskData }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPipelineState();
  }, []);

  const getPipelineState = async () => {
    try {
      setIsLoading(true);
      let pipelineIds = [];
      pipelineIds.push(pipelineTaskData["pipeline_id"]);
      let pipelineStateResponse = await pipelineActions.getPipelineStates(pipelineIds, getAccessToken);

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

  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryPanel = () => {
    switch (pipelineTaskData.tool_identifier) {
      case "parallel-processor":
        return (<ParallelProcessorPipelineTaskSummaryPanel pipelineTaskData={wrapObject(parallelProcessorPipelineTaskMetadata)}/>);
      case "child-pipeline":
        return (<ChildPipelineTaskSummaryPanel pipelineTaskData={wrapObject(childPipelineTaskMetadata)} />);
      default:
        return (<PipelineTaskSummaryPanelBase pipelineTaskData={wrapObject(pipelineTaskMetadata)}/>);
    }
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />
  }

  return (getSummaryPanel());
}


PipelineTaskSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskSummaryPanel;