import PropTypes from "prop-types";
import React from "react";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { useHistory } from "react-router-dom";

export default function WorkflowPipelineCard(
  {
    pipeline,

  }) {
  const history = useHistory();

  const viewPipelineFunction = (pipelineId) => {
    history.push(`/workflow/details/${pipelineId}/summary`);
  };

  return (
    <PipelineCardBase
      pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
      onClickFunction={() => viewPipelineFunction(pipeline?._id)}
      tooltip={"Click to view Pipeline"}
    />
  );
}

WorkflowPipelineCard.propTypes = {
  pipeline: PropTypes.object,
};