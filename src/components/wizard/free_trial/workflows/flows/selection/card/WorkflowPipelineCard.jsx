import PropTypes from "prop-types";
import React from "react";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { useHistory } from "react-router-dom";

export default function WorkflowPipelineCard(
  {
    pipeline,
    setSelectedFlow,
    selectedFlow,
  }) {
  return (
    <PipelineCardBase
      pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
      onClickFunction={() => setSelectedFlow(pipeline)}
      selectedOption={selectedFlow?._id}
      option={pipeline?._id}
    />
  );
}

WorkflowPipelineCard.propTypes = {
  pipeline: PropTypes.object,
  setSelectedFlow: PropTypes.func,
  selectedFlow: PropTypes.string,
};