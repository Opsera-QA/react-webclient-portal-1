import React from "react";
import PropTypes from "prop-types";
import useGetPipelinesByPipelineInstructionsUsage
  from "components/common/list_of_values_input/workflow/instructions/usage/useGetPipelinesByPipelineInstructionsUsage";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineUsageFieldBase from "components/common/list_of_values_input/pipelines/usage/PipelineUsageFieldBase";

export default function PipelineInstructionsPipelineUsageField(
  {
    pipelineInstructionsId,
    closePanel,
    className,
  }) {
  const {
    pipelines,
    isLoading,
    error,
    loadData,
  } = useGetPipelinesByPipelineInstructionsUsage(pipelineInstructionsId);

  if (isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  return (
    <PipelineUsageFieldBase
      className={className}
      isLoading={isLoading}
      pipelines={pipelines}
      type={"set of Pipeline Instructions"}
      error={error}
      loadPipelinesFunction={loadData}
      closePanel={closePanel}
    />
  );
}

PipelineInstructionsPipelineUsageField.propTypes = {
  pipelineInstructionsId: PropTypes.string,
  closePanel: PropTypes.func,
  className: PropTypes.string,
};