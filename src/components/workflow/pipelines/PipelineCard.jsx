import PropTypes from "prop-types";
import React from "react";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import { useHistory } from "react-router-dom";
import { pipelineHelper } from "components/workflow/pipeline.helper";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

export default function PipelineCard(
  {
    pipeline,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(pipelineHelper.getDetailViewLink(pipeline?._id));
  };

  return (
    <PipelineCardBase
      pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
      onClickFunction={onClickFunction}
      tooltip={"Click to view Pipeline"}
    />
  );
}

PipelineCard.propTypes = {
  pipeline: PropTypes.object,
};