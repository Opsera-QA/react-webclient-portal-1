import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import kafkaConnectStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/kafkaConnect-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import KafkaConnectGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectGitRepositoryInput";
import KafkaConnectGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectGitBranchInput";
import KafkaConnectBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectBitbucketWorkspaceInput";
import KafkaConnectToolSelectInput from "./inputs/KafkaConnectToolSelectInput";
import KafkaConnectSCMToolTypeSelectInput from "./inputs/KafkConnectSCMToolTypeSelectInput";
import KafkaConnectSCMToolSelectInput from "./inputs/KafkaConnectSCMToolSelectInput";
import KafkaConnectSCMRepoFiles from "./inputs/KafkaConnectSCMRepoFiles";

function KafkaConnectStepConfiguration({ pipelineId, stepTool, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [kafkaConnectStepConfigurationDto, setKafkaConnectStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let kafkaConnectConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, kafkaConnectStepFormMetadata);

    setKafkaConnectStepConfigurationDataDto(kafkaConnectConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const item = {
      configuration: kafkaConnectStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || kafkaConnectStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={kafkaConnectStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <KafkaConnectToolSelectInput dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <KafkaConnectSCMToolTypeSelectInput dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <KafkaConnectSCMToolSelectInput dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <KafkaConnectBitbucketWorkspaceInput dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <KafkaConnectGitRepositoryInput dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <KafkaConnectGitBranchInput  dataObject={kafkaConnectStepConfigurationDto} setDataObject={setKafkaConnectStepConfigurationDataDto} />
      <TextInputBase setDataObject={setKafkaConnectStepConfigurationDataDto} dataObject={kafkaConnectStepConfigurationDto} fieldName={"connectorFilePath"} />
      <KafkaConnectSCMRepoFiles setDataObject={setKafkaConnectStepConfigurationDataDto} dataObject={kafkaConnectStepConfigurationDto} />
    </PipelineStepEditorPanelContainer>
  );
}

KafkaConnectStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default KafkaConnectStepConfiguration;
