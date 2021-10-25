import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import kafkaConnectStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/kafkaConnect-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import KafkaConnectGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectGitRepositoryInput";
import KafkaConnectGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectGitBranchInput";
import KafkaConnectBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectBitbucketWorkspaceInput";
import RoleRestrictedKafkaConnectToolSelectInput from "components/common/list_of_values_input/tools/kafka_connect/tool/RoleRestrictedKafkaConnectToolSelectInput";
import KafkaConnectSCMToolTypeSelectInput from "./inputs/KafkConnectSCMToolTypeSelectInput";
import KafkaConnectStepSourceControlManagementToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/kafka_connect/inputs/KafkaConnectStepSourceControlManagementToolSelectInput";
import KafkaConnectSCMRepoFiles from "./inputs/KafkaConnectSCMRepoFiles";
import OctopusLifecycleSelectInput from "../octopus/input/OctopusLifecycleSelectInput";
import KafkaConnectActionSelectInput from "./inputs/KafkaConnectActionSelectInput";
import KafkaConnectConfigurationSelectInput from "./inputs/KafkaConnectConfigurationsSelect";

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
    let kafkaConnectConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      kafkaConnectStepFormMetadata
    );

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
      <RoleRestrictedKafkaConnectToolSelectInput
        model={kafkaConnectStepConfigurationDto}
        setModel={setKafkaConnectStepConfigurationDataDto}
        fieldName={"kafkaToolId"}
      />
      <KafkaConnectActionSelectInput
        dataObject={kafkaConnectStepConfigurationDto}
        setDataObject={setKafkaConnectStepConfigurationDataDto}
      />
      {kafkaConnectStepConfigurationDto &&
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") &&
        (kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "delete" ||
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "restart" ||
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "resume" ||
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "pause") && (
          <KafkaConnectConfigurationSelectInput
            dataObject={kafkaConnectStepConfigurationDto}
            setDataObject={setKafkaConnectStepConfigurationDataDto}
            tool_prop={kafkaConnectStepConfigurationDto?.getData("kafkaConnectAction")}
          />
        )}
      {kafkaConnectStepConfigurationDto &&
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") &&
        (kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "create" ||
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "update" ||
        kafkaConnectStepConfigurationDto.getData("kafkaConnectAction") === "validate") && (
          <>
            <KafkaConnectSCMToolTypeSelectInput
              dataObject={kafkaConnectStepConfigurationDto}
              setDataObject={setKafkaConnectStepConfigurationDataDto}
            />
            <KafkaConnectStepSourceControlManagementToolSelectInput
              model={kafkaConnectStepConfigurationDto}
              setModel={setKafkaConnectStepConfigurationDataDto}
              disabled={kafkaConnectStepConfigurationDto.getData("service").length === 0}
            />
            <KafkaConnectBitbucketWorkspaceInput
              dataObject={kafkaConnectStepConfigurationDto}
              setDataObject={setKafkaConnectStepConfigurationDataDto}
            />
            <KafkaConnectGitRepositoryInput
              dataObject={kafkaConnectStepConfigurationDto}
              setDataObject={setKafkaConnectStepConfigurationDataDto}
            />
            <KafkaConnectGitBranchInput
              dataObject={kafkaConnectStepConfigurationDto}
              setDataObject={setKafkaConnectStepConfigurationDataDto}
            />
            <TextInputBase
              setDataObject={setKafkaConnectStepConfigurationDataDto}
              dataObject={kafkaConnectStepConfigurationDto}
              fieldName={"connectorFilePath"}
            />
            <KafkaConnectSCMRepoFiles
              setDataObject={setKafkaConnectStepConfigurationDataDto}
              dataObject={kafkaConnectStepConfigurationDto}
              disabled={
                kafkaConnectStepConfigurationDto && kafkaConnectStepConfigurationDto.getData("connectorFilePath")
                  ? kafkaConnectStepConfigurationDto.getData("connectorFilePath").length === 0
                  : true
              }
              tool_prop={
                kafkaConnectStepConfigurationDto && kafkaConnectStepConfigurationDto.getData("kafkaToolId")
                  ? kafkaConnectStepConfigurationDto.getData("kafkaToolId")
                  : ""
              }
            />
          </>
        )}
    </PipelineStepEditorPanelContainer>
  );
}

KafkaConnectStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
};

export default KafkaConnectStepConfiguration;
