import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import childPipelineStepConfigurationMetadata from "./child-pipeline-step-configuration-metadata";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";

function ChildPipelineStepConfiguration({ stepTool, pipelineId, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [childPipelineStepConfigurationDto, setChildPipelineStepConfigurationDataDto] = useState(undefined);
  const [thresholdDto, setThresholdDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData();
    setIsLoading(false);
  };

  const loadFormData = async () => {
    let { configuration, threshold } = stepTool;
    if (typeof configuration !== "undefined") {
      setChildPipelineStepConfigurationDataDto(new Model(configuration, childPipelineStepConfigurationMetadata, false));
    } else {
      setChildPipelineStepConfigurationDataDto(
        new Model({ ...childPipelineStepConfigurationMetadata.newObjectFields }, childPipelineStepConfigurationMetadata, false)
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
      configuration: {...childPipelineStepConfigurationDto.getPersistData()},
      threshold: {
        ...thresholdDto.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || childPipelineStepConfigurationDto == null || thresholdDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={childPipelineStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-1">
        Opsera supports orchestrating a &quot;child pipeline&quot; within a step.
        This allows users to run another pipeline as a step within this pipeline.
        As such the overall success or failure of that pipeline will impact this one.
        In order to use this feature, please ensure that the child pipeline is already configured
        and runs successfully, then add it to this step.
      </div>

      <div className="mt-4 title-text-7" style={{paddingBottom: "0"}}>Settings</div>
      <PipelineSelectInput
        dataObject={childPipelineStepConfigurationDto}
        setDataObject={setChildPipelineStepConfigurationDataDto}
        currentPipelineId={pipelineId}
        fieldName={"pipelineId"}
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

ChildPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ChildPipelineStepConfiguration;
