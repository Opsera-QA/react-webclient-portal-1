import React from "react";
import PropTypes from "prop-types";
import useGetPipelines from "hooks/workflow/pipelines/useGetPipelines";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";

export default function FollowedPipelinesPanel({className}) {
  const {
    pipelines,
    isLoading,
    error,
  } = useGetPipelines(
    undefined,
    undefined,
    false,
    undefined,
    true
  );

  return (
    <div className={className}>
      <PipelineCardView
        pipelines={pipelines}
        isLoading={isLoading}
        noDataMessage={"You are not currently following any Pipelines"}
      />
    </div>
  );
}

FollowedPipelinesPanel.propTypes = {
  className: PropTypes.string
};
