import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import mockPipelineStepConfigurationMetadata from "./mock-pipeline-step-configuration-metadata";
import EditorPanelContainer from "../../../../../../../common/panels/detail_panel_container/EditorPanelContainer";
import SaveButtonContainer from "../../../../../../../common/buttons/saving/containers/SaveButtonContainer";
import thresholdMetadata from "../../../../../../../common/metadata/pipelines/thresholdMetadata";
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
import LenientSaveButton from "../../../../../../../common/buttons/saving/LenientSaveButton";

function MockPipelineStepConfiguration({ stepTool, plan, stepId, pipelineId, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mockPipelineStepConfigurationDto, setMockPipelineStepConfigurationDataDto] = useState(undefined);
  // const [thresholdDto, setThresholdDto] = useState(undefined);

  useEffect(() => {
    loadData();
    console.log("plan: " + JSON.stringify(plan))
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setMockPipelineStepConfigurationDataDto(new Model(configuration, mockPipelineStepConfigurationMetadata, false));
    } else {
      setMockPipelineStepConfigurationDataDto(
        new Model({ ...mockPipelineStepConfigurationMetadata.newModelBase }, mockPipelineStepConfigurationMetadata, false)
      );
    }
    // TODO: If threshold is needed, uncomment
    // if (typeof threshold !== "undefined") {
    //   setThresholdDto(new Model({...threshold}, thresholdMetadata, false));
    // } else {
    //   setThresholdDto(
    //     new Model({...thresholdMetadata.newObjectFields}, thresholdMetadata, true)
    //   );
    // }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: mockPipelineStepConfigurationDto.getPersistData(),
      // TODO: If threshold is needed, uncomment
      // threshold: {
      //   ...thresholdDto.getPersistData()
      // },
    };
    parentCallback(item);
  };

  if (isLoading || mockPipelineStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer>
      <DtoTextInput dataObject={mockPipelineStepConfigurationDto} setDataObject={setMockPipelineStepConfigurationDataDto} fieldName={"mockTextOne"}/>
      <DtoTextInput dataObject={mockPipelineStepConfigurationDto} setDataObject={setMockPipelineStepConfigurationDataDto} fieldName={"mockTextTwo"}/>
      <SaveButtonContainer>
        <LenientSaveButton updateRecord={callbackFunction} recordDto={mockPipelineStepConfigurationDto}/>
      </SaveButtonContainer>
    </EditorPanelContainer>
  );
}

MockPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default MockPipelineStepConfiguration;
