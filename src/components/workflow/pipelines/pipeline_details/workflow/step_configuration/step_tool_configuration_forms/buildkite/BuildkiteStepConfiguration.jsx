import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import buildkiteMetadata from "./buildkite-metadata";
import BuildkiteToolSelectInput from "./inputs/BuildkiteToolSelectInput";
import BuildkitePipelineSelectInput from "./inputs/BuildkitePipelineSelectInput";
import KafkaConnectSCMToolTypeSelectInput from "../kafka_connect/inputs/KafkConnectSCMToolTypeSelectInput";
import KafkaConnectStepSourceControlManagementToolSelectInput
  from "../kafka_connect/inputs/KafkaConnectStepSourceControlManagementToolSelectInput";
import KafkaConnectBitbucketWorkspaceInput from "../kafka_connect/inputs/KafkaConnectBitbucketWorkspaceInput";
import KafkaConnectGitRepositoryInput from "../kafka_connect/inputs/KafkaConnectGitRepositoryInput";
import KafkaConnectGitBranchInput from "../kafka_connect/inputs/KafkaConnectGitBranchInput";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";

function BuildkiteStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [buildkiteStepConfigurationDto, setBuildkiteStepConfigurationDataDto] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let buildkiteConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, buildkiteMetadata);
    setBuildkiteStepConfigurationDataDto(buildkiteConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: buildkiteStepConfigurationDto.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || buildkiteStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={buildkiteStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <BuildkiteToolSelectInput model={buildkiteStepConfigurationDto} setModel={setBuildkiteStepConfigurationDataDto} />
      <KafkaConnectSCMToolTypeSelectInput
        dataObject={buildkiteStepConfigurationDto}
        setDataObject={setBuildkiteStepConfigurationDataDto}
      />
      <KafkaConnectStepSourceControlManagementToolSelectInput
        model={buildkiteStepConfigurationDto}
        setModel={setBuildkiteStepConfigurationDataDto}
        disabled={buildkiteStepConfigurationDto.getData("service").length === 0}
      />
      <KafkaConnectBitbucketWorkspaceInput
        dataObject={buildkiteStepConfigurationDto}
        setDataObject={setBuildkiteStepConfigurationDataDto}
      />
      <KafkaConnectGitRepositoryInput
        dataObject={buildkiteStepConfigurationDto}
        setDataObject={setBuildkiteStepConfigurationDataDto}
      />
      <KafkaConnectGitBranchInput
        dataObject={buildkiteStepConfigurationDto}
        setDataObject={setBuildkiteStepConfigurationDataDto}
      />
      <TextInputBase
        setDataObject={setBuildkiteStepConfigurationDataDto}
        dataObject={buildkiteStepConfigurationDto}
        fieldName={"message"}
      />
      <TextInputBase
        setDataObject={setBuildkiteStepConfigurationDataDto}
        dataObject={buildkiteStepConfigurationDto}
        fieldName={"commit"}
      />
      <BuildkitePipelineSelectInput
        dataObject={buildkiteStepConfigurationDto}
        setDataObject={setBuildkiteStepConfigurationDataDto}
        tool={buildkiteStepConfigurationDto?.getData("toolConfigId")}
        disabled={buildkiteStepConfigurationDto?.getData("toolConfigId")?.length === 0}
      />
    </PipelineStepEditorPanelContainer>
  );
}

BuildkiteStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  createJob: PropTypes.func,
};

export default BuildkiteStepConfiguration;
