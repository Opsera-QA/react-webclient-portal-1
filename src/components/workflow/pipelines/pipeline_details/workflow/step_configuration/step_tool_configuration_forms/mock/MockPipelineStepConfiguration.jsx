import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import mockPipelineStepConfigurationMetadata from "./mock-pipeline-step-configuration-metadata";
import PipelineStepEditorPanelContainer
  from "../../../../../../../common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function MockPipelineStepConfiguration({ stepTool, parentCallback, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mockPipelineStepConfigurationDto, setMockPipelineStepConfigurationDataDto] = useState(undefined);
  // const [thresholdDto, setThresholdDto] = useState(undefined);

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
      setMockPipelineStepConfigurationDataDto(new Model(configuration, mockPipelineStepConfigurationMetadata, false));
    } else {
      setMockPipelineStepConfigurationDataDto(
        new Model({ ...mockPipelineStepConfigurationMetadata.newObjectFields }, mockPipelineStepConfigurationMetadata, false)
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
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={mockPipelineStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TextInputBase dataObject={mockPipelineStepConfigurationDto} setDataObject={setMockPipelineStepConfigurationDataDto} fieldName={"mockTextOne"}/>
      <TextInputBase dataObject={mockPipelineStepConfigurationDto} setDataObject={setMockPipelineStepConfigurationDataDto} fieldName={"mockTextTwo"}/>
    </PipelineStepEditorPanelContainer>
  );
}

MockPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default MockPipelineStepConfiguration;
