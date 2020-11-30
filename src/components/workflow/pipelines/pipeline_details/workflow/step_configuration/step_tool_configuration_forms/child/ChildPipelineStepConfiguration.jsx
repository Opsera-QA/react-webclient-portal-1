import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import childPipelineStepConfigurationMetadata from "./child-pipeline-step-configuration-metadata";
import PipelineInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineInput";
import BooleanToggleInput from "../../../../../../../common/input/dto_input/BooleanToggleInput";
import thresholdMetadata from "../../../../../../../common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "../../../../../../../common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import LenientSaveButton from "../../../../../../../common/buttons/saving/LenientSaveButton";

function ChildPipelineStepConfiguration({ stepTool, plan, stepId, pipelineId, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [childPipelineStepConfigurationDto, setChildPipelineStepConfigurationDataDto] = useState(undefined);
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
      setChildPipelineStepConfigurationDataDto(new Model(configuration, childPipelineStepConfigurationMetadata, false));
    } else {
      setChildPipelineStepConfigurationDataDto(
        new Model({ ...childPipelineStepConfigurationMetadata.newModelBase }, childPipelineStepConfigurationMetadata, false)
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
    <PipelineStepEditorPanelContainer>
      <div className="mx-2">
        Opsera supports orchestrating a &quot;child pipeline&quot; within a step.
        This allows users to include another pipeline as a step in this pipeline.
        As such the overall success or failure of that pipeline will impact this one.
        In order to use this feature,
        please ensure that the child pipeline is already configured and runs successfully,
        then add it to this step.
      </div>
      <PipelineInput
        dataObject={childPipelineStepConfigurationDto}
        setDataObject={setChildPipelineStepConfigurationDataDto}
        currentPipelineId={pipelineId}
        fieldName={"pipelineId"}
      />
      {/*TODO: Make threshold editor panel component*/}
      <div className="mt-3">
        <div className="mx-2"><label>Threshold</label></div>
        <BooleanToggleInput dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"ensureSuccess"}/>
        <BooleanToggleInput dataObject={thresholdDto} setDataObject={setThresholdDto} fieldName={"completeFirst"}/>
      </div>
      <div className="mt-3">
        <LenientSaveButton updateRecord={callbackFunction} recordDto={childPipelineStepConfigurationDto}/>
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

ChildPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ChildPipelineStepConfiguration;
