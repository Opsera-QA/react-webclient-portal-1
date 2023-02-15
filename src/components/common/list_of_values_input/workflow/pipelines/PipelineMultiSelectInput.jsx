import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import Model from "core/data_model/model";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelines from "hooks/workflow/pipelines/useGetPipelines";

function PipelineMultiSelectInput(
  {
    fieldName,
    currentPipelineId,
    model,
    setModel,
    disabled,
    visible,
  }) {
  const {
    isLoading,
    error,
    pipelines,
  } = useGetPipelines();

  // TODO: Make pipeline list component with link to pipeline (open in new window)
  const getSelectedPipelineSummary = (selectedPipelineId) => {
    let foundPipeline = pipelines.find(pipeline => pipeline._id === selectedPipelineId);

    if (foundPipeline != null) {
      const pipelineDataObject = new Model({...foundPipeline}, pipelineMetadata, false);
      const run = foundPipeline.workflow?.lastRun?.run;

      return (
        <PipelineSummaryCard
          pipelineData={pipelineDataObject}
          run={run != null ? `${run}` : `0`}
        />
      );
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getPipelineSummaries = () => {
    if (model?.getArrayData(fieldName).length > 0 && !isLoading) {
      return (
        model.getData(fieldName).map((selectedPipelineId) => {
          return(
            <div key={selectedPipelineId}>
              {getSelectedPipelineSummary(selectedPipelineId)}
            </div>
          );
        })
      );
    }

    return <span>Select a pipeline to get started.</span>;
  };

  const getTextField = (pipeline) => {
    return `${pipeline.name} (${pipeline._id})`;
  };

  const getDisabledPipeline = () => {
    if (isMongoDbId(currentPipelineId) && Array.isArray(pipelines) && pipelines?.length > 0) {
      return pipelines.find((pipeline) => pipeline._id === currentPipelineId);
    }
  };

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        selectOptions={pipelines}
        dataObject={model}
        setDataObject={setModel}
        valueField={"_id"}
        textField={isLoading && (!Array.isArray(pipelines) || pipelines.length === 0) ? "_id" : getTextField}
        busy={isLoading}
        disabled={disabled || [getDisabledPipeline()]}
        visible={visible}
        error={error}
        pluralTopic={"Pipelines"}
      />
      {getPipelineSummaries()}
    </div>
  );
}

PipelineMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default PipelineMultiSelectInput;