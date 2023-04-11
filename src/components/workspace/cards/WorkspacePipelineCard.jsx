import PropTypes from "prop-types";
import React from "react";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { useHistory } from "react-router-dom";
import {workspaceHelper} from "components/workspace/workspace.helper";

export default function WorkspacePipelineCard(
  {
    pipeline,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(workspaceHelper.getWorkspaceItemDetailLink(pipeline));
  };

  return (
    <PipelineCardBase
      pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
      onClickFunction={onClickFunction}
      tooltip={"Click to view Pipeline"}
    />
  );
}

WorkspacePipelineCard.propTypes = {
  pipeline: PropTypes.object,
};