import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import ansibleStepFormMetadata  from "./ansible-stepForm-metadata";
import AnsibleToolSelectInput from "./inputs/AnsibleToolSelectInput";
import AnsibleSCMToolTypeSelectInput from "./inputs/AnsibleSCMToolTypeSelectInput";
import AnsibleSCMToolSelectInput from "./inputs/AnsibleSCMToolSelectInput";
import AnsibleGitRepositoryInput from "./inputs/AnsibleGitRepositoryInput";
import AnsibleGitBranchInput from "./inputs/AnsibleGitBranchInput";
import AnsibleSCMRepoFiles from "./inputs/AnsibleSCMRepoFiles";

function AnsibleStepConfiguration({ pipelineId, stepTool, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [AnsibleStepConfigurationDto, setAnsibleStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let ansibleConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      ansibleStepFormMetadata
    );

    setAnsibleStepConfigurationDataDto(ansibleConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const item = {
      configuration: AnsibleStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || AnsibleStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={AnsibleStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <AnsibleToolSelectInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleSCMToolTypeSelectInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleSCMToolSelectInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
        disabled={AnsibleStepConfigurationDto.getData("service").length === 0}
      />
      <AnsibleGitRepositoryInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleGitBranchInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
      />
      <TextInputBase
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}  
        fieldName={"playbookFilePath"}
      />
      <AnsibleSCMRepoFiles
        setDataObject={setAnsibleStepConfigurationDataDto}
        dataObject={AnsibleStepConfigurationDto}
        disabled={
          AnsibleStepConfigurationDto && AnsibleStepConfigurationDto.getData("playbookFilePath")
            ? AnsibleStepConfigurationDto.getData("playbookFilePath").length === 0
            : true
        }
        tool_prop={
          AnsibleStepConfigurationDto && AnsibleStepConfigurationDto.getData("toolConfigId")
            ? AnsibleStepConfigurationDto.getData("toolConfigId")
            : ""
        }
      />
    </PipelineStepEditorPanelContainer>
  );
}

AnsibleStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
};

export default AnsibleStepConfiguration;
