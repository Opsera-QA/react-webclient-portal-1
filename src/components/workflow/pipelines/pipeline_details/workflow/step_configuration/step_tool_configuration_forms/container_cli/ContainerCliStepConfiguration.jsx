import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import containerCliStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/containerCli-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CommandLineDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineDependencyTypeInput";
import CommandLineSourceScriptToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSourceScriptToggleInput";
import StepConfigTerraformStepSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigTerraformStepSelectInput";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import ParameterSelectListInputBase from "components/common/list_of_values_input/parameters/ParameterSelectListInputBase";
import StepConfigUseTerraformOutput from "../common/inputs/StepConfigUseTerraformOutput";
import CommandLineSonarScannerToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSonarScannerToggleInput";
import RoleRestrictedSonarToolSelectInput
  from "components/common/list_of_values_input/tools/sonar/tool/RoleRestrictedSonarToolSelectInput";
import CommandLineSonarCustomParametersToggle from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSonarCustomParametersToggle";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/EditableParameterMappingInput";
import ContainerCliScmToggleInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/ContainerCliScmToggleInput";
import ContainerCliRegistrySelectInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/ContainerCliRegistrySelectInput";
import ScmToolTypeSelectInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/ScmToolTypeSelectInput";
import ScmToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/ScmToolSelectInput";
import BitbucketWorkspaceSelectInput
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/BitbucketWorkspaceSelectInput";
import GitRepositorySelectInput
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/GitRepositorySelectInput";
import GitBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/container_cli/inputs/GitBranchSelectInput";

function ContainerCliStepConfiguration({ pipelineId, stepTool, stepId, parentCallback, closeEditorPanel, plan }) {
  const [isLoading, setIsLoading] = useState(false);
  const [containerCliStepConfigurationModel, setContainerCliStepConfigurationModel] = useState(undefined);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration } = step;

    if (typeof configuration !== "undefined") {
      setContainerCliStepConfigurationModel(new Model(configuration, containerCliStepFormMetadata, false));
    } else {
      setContainerCliStepConfigurationModel(
        new Model({ ...containerCliStepFormMetadata.newObjectFields }, containerCliStepFormMetadata, false)
      );
    }
  };

  const getDynamicFields = () => {
    if (containerCliStepConfigurationModel.getData("sourceScript") === true) {
      return (
        <div>
          <TextInputBase fieldName={"scriptFilePath"} dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} />
          <TextInputBase fieldName={"scriptFileName"} dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} />
        </div>
      );
    }
    return (<TextAreaInput dataObject={containerCliStepConfigurationModel} fieldName={"commands"} setDataObject={setContainerCliStepConfigurationModel} />);
  };

  const getSonarScannerInputFields = () => {
    if (containerCliStepConfigurationModel.getData("sonarScanFlag") === true) {
      return (
        <div>
          <RoleRestrictedSonarToolSelectInput fieldName={"sonarToolConfigId"} model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
          <TextInputBase fieldName={"projectKey"} dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} />
          <CommandLineSonarCustomParametersToggle
            model={containerCliStepConfigurationModel}
            setModel={setContainerCliStepConfigurationModel}
          />
        </div>
      );
    }
  };

  const getTerraformSelect = () => {
    if (containerCliStepConfigurationModel?.getData("useTerraformOutput")) {
      return (
        <StepConfigTerraformStepSelectInput setDataObject={setContainerCliStepConfigurationModel} dataObject={containerCliStepConfigurationModel} plan={plan} stepId={stepId} />
      );
    }
  };

  const handleCreateAndSave = async () => {
    let newDataObject = containerCliStepConfigurationModel;
    setContainerCliStepConfigurationModel({ ...newDataObject });
    const item = {
      configuration: containerCliStepConfigurationModel.getPersistData(),
    };
    await parentCallback(item);
    closeEditorPanel();
  };

  const getScmInputFields = () => {
    if (containerCliStepConfigurationModel?.getData("useScm")) {
      return (
        <>
          <ScmToolTypeSelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
          <ScmToolSelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
          <BitbucketWorkspaceSelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
          <GitRepositorySelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
          <GitBranchSelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
        </>
      );
    }    
  };


  if (isLoading || containerCliStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={containerCliStepConfigurationModel}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >  
      <ContainerCliRegistrySelectInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} />
      <ContainerCliScmToggleInput model={containerCliStepConfigurationModel} setModel={setContainerCliStepConfigurationModel} fieldName={"useScm"} />
      {getScmInputFields()}
      <CommandLineSourceScriptToggleInput dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} fieldName={"sourceScript"} />
      <StepConfigUseTerraformOutput dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} fieldName={"useTerraformOutput"} plan={plan} stepId={stepId} />
      {getTerraformSelect()}
      {getDynamicFields()}
      <EditableParameterMappingInput
        model={containerCliStepConfigurationModel}
        setModel={setContainerCliStepConfigurationModel}
        fieldName={"environmentVariables"}
        nameMaxLength={50}
      />
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={containerCliStepConfigurationModel}
        setDataObject={setContainerCliStepConfigurationModel}
        fieldName={"outputCustomParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Output Parameter Selection"}
        plan={plan}
        tool_prop={containerCliStepConfigurationModel?.getData("terraformStepId") && containerCliStepConfigurationModel?.getData("terraformStepId").length > 0 ?
          containerCliStepConfigurationModel?.getData("terraformStepId") : ""}
      />
      <TextInputBase setDataObject={setContainerCliStepConfigurationModel} dataObject={containerCliStepConfigurationModel} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setContainerCliStepConfigurationModel} dataObject={containerCliStepConfigurationModel} fieldName={"outputFileName"} />
      <CommandLineDependencyTypeInput dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} />
      <CommandLineSonarScannerToggleInput dataObject={containerCliStepConfigurationModel} setDataObject={setContainerCliStepConfigurationModel} fieldName={"sonarScanFlag"} />
      {getSonarScannerInputFields()}
    </PipelineStepEditorPanelContainer>
  );
}

ContainerCliStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array
};

export default ContainerCliStepConfiguration;
