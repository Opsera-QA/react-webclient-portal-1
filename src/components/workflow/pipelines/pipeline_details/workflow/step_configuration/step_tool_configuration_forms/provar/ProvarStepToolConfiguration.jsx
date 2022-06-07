import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import provarStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/provar/provar-step-config";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import ProvarGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/provar/inputs/ProvarGitRepositoryInput";
import ProvarGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/provar/inputs/ProvarGitBranchInput";
import ProvarBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/provar/inputs/ProvarBitbucketWorkspaceInput";
import ProvarSCMToolTypeSelectInput from "./inputs/ProvarSCMToolTypeSelectInput";
import ProvarSourceControlManagementToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/provar/inputs/ProvarStepSourceControlManagementToolSelectInput";
import RoleRestrictedToolByIdentifierInputBase from "../../../../../../../common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function ProvarConfiguration({
  pipelineId,
  stepTool,
  stepId,
  closeEditorPanel,
  parentCallback,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [provarStepConfigurationDto, setProvarConfigurationDataDto] =
    useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let provarConfigurationData =
      modelHelpers.getPipelineStepConfigurationModel(
        stepTool,
        provarStepFormMetadata,
      );

    setProvarConfigurationDataDto(provarConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const item = {
      configuration: provarStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || provarStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={provarStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"provar"}
        toolFriendlyName={"Provar"}
        fieldName={"provarToolId"}
        model={provarStepConfigurationDto}
        setModel={setProvarConfigurationDataDto}
      />
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"sfdc-configurator"}
        toolFriendlyName={"Salesforce Credentials"}
        fieldName={"sfdcToolId"}
        model={provarStepConfigurationDto}
        setModel={setProvarConfigurationDataDto}
      />
      <ProvarSCMToolTypeSelectInput
        dataObject={provarStepConfigurationDto}
        setDataObject={setProvarConfigurationDataDto}
      />
      <ProvarSourceControlManagementToolSelectInput
        model={provarStepConfigurationDto}
        setModel={setProvarConfigurationDataDto}
        disabled={provarStepConfigurationDto.getData("service").length === 0}
      />
      <ProvarBitbucketWorkspaceInput
        dataObject={provarStepConfigurationDto}
        setDataObject={setProvarConfigurationDataDto}
      />
      <ProvarGitRepositoryInput
        dataObject={provarStepConfigurationDto}
        setDataObject={setProvarConfigurationDataDto}
      />
      <ProvarGitBranchInput
        dataObject={provarStepConfigurationDto}
        setDataObject={setProvarConfigurationDataDto}
      />
      <TextInputBase
        setDataObject={setProvarConfigurationDataDto}
        dataObject={provarStepConfigurationDto}
        fieldName={"antTarget"}
      />
      <TextInputBase
        setDataObject={setProvarConfigurationDataDto}
        dataObject={provarStepConfigurationDto}
        fieldName={"buildXmlPath"}
      />
      <TextInputBase
        setDataObject={setProvarConfigurationDataDto}
        dataObject={provarStepConfigurationDto}
        fieldName={"sfdcConnectionName"}
      />
      {/*<ProvarSCMRepoFiles*/}
      {/*    setDataObject={setProvarConfigurationDataDto}*/}
      {/*    dataObject={provarStepConfigurationDto}*/}
      {/*    disabled={*/}
      {/*        provarStepConfigurationDto && provarStepConfigurationDto.getData("connectorFilePath")*/}
      {/*            ? provarStepConfigurationDto.getData("connectorFilePath").length === 0*/}
      {/*            : true*/}
      {/*    }*/}
      {/*    tool_prop={*/}
      {/*        provarStepConfigurationDto && provarStepConfigurationDto.getData("kafkaToolId")*/}
      {/*            ? provarStepConfigurationDto.getData("kafkaToolId")*/}
      {/*            : ""*/}
      {/*    }*/}
      {/*/>*/}
    </PipelineStepEditorPanelContainer>
  );
}

ProvarConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
};

export default ProvarConfiguration;
