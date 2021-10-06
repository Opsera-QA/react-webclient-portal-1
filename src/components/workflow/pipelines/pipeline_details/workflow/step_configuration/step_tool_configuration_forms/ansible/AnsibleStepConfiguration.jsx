import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import ansibleStepMetadata  from "./ansible-step-metadata";
import AnsibleStepToolSelectInput from "./inputs/AnsibleStepToolSelectInput";
import AnsibleStepScmToolTypeSelectInput from "./inputs/AnsibleSteopScmToolTypeSelectInput";
import AnsibleStepScmToolSelectInput from "./inputs/AnsibleStepScmToolSelectInput";
import AnsibleStepGitRepositoryInput from "./inputs/AnsibleStepGitRepositoryInput";
import AnsibleStepGitBranchInput from "./inputs/AnsibleStepGitBranchInput";
import AnsibleStepScmRepositoryFileSelectInput from "./inputs/AnsibleStepScmRepositoryFileSelectInput";
import JsonInput from "../../../../../../../common/inputs/object/JsonInput";

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
      ansibleStepMetadata
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
      <AnsibleStepToolSelectInput
        model={AnsibleStepConfigurationDto}
        setModel={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleStepScmToolTypeSelectInput
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleStepScmToolSelectInput
        model={AnsibleStepConfigurationDto}
        setModel={setAnsibleStepConfigurationDataDto}
        disabled={AnsibleStepConfigurationDto.getData("service").length === 0}
      />
      <AnsibleStepGitRepositoryInput
        model={AnsibleStepConfigurationDto}
        setModel={setAnsibleStepConfigurationDataDto}
      />
      <AnsibleStepGitBranchInput
        model={AnsibleStepConfigurationDto}
        setModel={setAnsibleStepConfigurationDataDto}
      />
      <TextInputBase
        dataObject={AnsibleStepConfigurationDto}
        setDataObject={setAnsibleStepConfigurationDataDto}  
        fieldName={"playbookFilePath"}
      />
      <AnsibleStepScmRepositoryFileSelectInput
        setModel={setAnsibleStepConfigurationDataDto}
        model={AnsibleStepConfigurationDto}
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
        <JsonInput
          className={"my-2"}
          fieldName={"commandArgs"}
          model={AnsibleStepConfigurationDto}
          setModel={setAnsibleStepConfigurationDataDto}
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
