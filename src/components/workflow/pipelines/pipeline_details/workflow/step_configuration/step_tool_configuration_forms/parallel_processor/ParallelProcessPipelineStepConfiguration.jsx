import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import thresholdMetadata from "../../../../../../../common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "../../../../../../../common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PipelineMultiSelectInput
  from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineMultiSelectInput";
import parallelProcessorPipelineStepConfigurationMetadata
  from "./parallel-processor-pipeline-step-configuration-metadata";

function ParallelProcessPipelineStepConfiguration({ stepTool, pipelineId, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [parallelPipelineStepConfigurationDto, setParallelPipelineStepConfigurationDataDto] = useState(undefined);
  const [thresholdDto, setThresholdDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setParallelPipelineStepConfigurationDataDto(new Model(configuration, parallelProcessorPipelineStepConfigurationMetadata, false));
    } else {
      setParallelPipelineStepConfigurationDataDto(
        new Model({ ...parallelProcessorPipelineStepConfigurationMetadata.newObjectFields }, parallelProcessorPipelineStepConfigurationMetadata, false)
      );
    }
    if (typeof threshold !== "undefined") {
      setThresholdDto(new Model({...threshold}, thresholdMetadata, false));
    } else {
      setThresholdDto(new Model({...thresholdMetadata.newObjectFields}, thresholdMetadata, true)
      );
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: {...parallelPipelineStepConfigurationDto.getPersistData()},
      threshold: {
        ...thresholdDto.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || parallelPipelineStepConfigurationDto == null || thresholdDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={parallelPipelineStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-1">
        Opsera supports orchestrating multiple &quot;child pipelines&quot; within a
        &quot;Parallel Processor&quot; step.
        This allows users to include one or more pipeline executions inside this a single
        step in this pipeline.
        As such the overall success or failure of those pipelines will impact this one.
        In order to use this feature,
        please ensure that all children pipeline are configured and ready to run.
      </div>

      <div className="mt-4 ml-2 title-text-7" style={{paddingBottom: "0"}}>Settings</div>
      <PipelineMultiSelectInput
        dataObject={parallelPipelineStepConfigurationDto}
        setDataObject={setParallelPipelineStepConfigurationDataDto}
        currentPipelineId={pipelineId}
        fieldName={"pipelines"}
      />
      {/*TODO: Make threshold editor panel component*/}
      <div className="mt-5">
        <div className="ml-2 title-text-7">Threshold</div>
        <BooleanToggleInput disabled={true} dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"ensureSuccess"}/>
        <BooleanToggleInput disabled={true} dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"completeFirst"}/>
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

ParallelProcessPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ParallelProcessPipelineStepConfiguration;
