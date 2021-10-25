import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import ansibleStepMetadata  from "./ansible.step.metadata";
import AnsibleStepToolSelectInput from "./inputs/AnsibleStepToolSelectInput";
import AnsibleStepScmServiceTypeSelectInput from "./inputs/AnsibleStepScmServiceTypeSelectInput";
import AnsibleStepGitRepositorySelectInput from "./inputs/AnsibleStepGitRepositorySelectInput";
import AnsibleStepGitBranchSelectInput from "./inputs/AnsibleStepGitBranchSelectInput";
import AnsibleStepScmRepositoryFileSelectInput from "./inputs/AnsibleStepScmRepositoryFileSelectInput";
import JsonInput from "../../../../../../../common/inputs/object/JsonInput";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function AnsibleStepConfiguration({ stepTool, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ansibleStepModel, setAnsibleStepModel] = useState(undefined);
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

    setAnsibleStepModel(ansibleConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const item = {
      configuration: ansibleStepModel.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || ansibleStepModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={ansibleStepModel}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <AnsibleStepToolSelectInput
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
      />
      <AnsibleStepScmServiceTypeSelectInput
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
      />
      <RoleRestrictedToolByIdentifierInputBase
        fieldName={"gitToolId"}
        toolFriendlyName={"Source Control Management"}
        toolIdentifier={ansibleStepModel?.getData("service")}
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
        disabled={ansibleStepModel.getData("service").length === 0}
      />
      <AnsibleStepGitRepositorySelectInput
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
      />
      <AnsibleStepGitBranchSelectInput
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
      />
      <TextInputBase
        dataObject={ansibleStepModel}
        setDataObject={setAnsibleStepModel}
        fieldName={"playbookFilePath"}
      />
      <AnsibleStepScmRepositoryFileSelectInput
        setModel={setAnsibleStepModel}
        model={ansibleStepModel}
      />
      <JsonInput
        className={"my-2"}
        fieldName={"commandArgs"}
        model={ansibleStepModel}
        setModel={setAnsibleStepModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AnsibleStepConfiguration.propTypes = {
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  stepId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default AnsibleStepConfiguration;
