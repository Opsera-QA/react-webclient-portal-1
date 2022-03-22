import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import terraformVcsStepFormMetadata from "./terraform-vcs-stepForm-metadata";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";
import TerraformVcsCloudOrganizationsSelectInput from "./inputs/TerraformVcsCloudOrganizationsSelectInput";
import TerraformEnterpriseToolSelectInput from "../terraform/inputs/terraform_cloud/TerraformEnterpriseToolSelectInput";
import TerraformEnvironmentVariables from "../terraform/inputs/custom_scripts/TerraformEnvironmentVariables";
import TerraformInputParameters from "../terraform/inputs/TerraformInputParameters";
import { Col } from "react-bootstrap";
import TerraformVcsWorkspaceSelectInput from "./inputs/TerraformVcsWorkspaceSelectInput";
import { getMissingRequiredFieldsErrorDialog } from "components/common/toasts/toasts";
import TerraformVcsJobTypeSelectInput from "./inputs/TerraformVcsJobTypeSelectInput";

function TerraformVcsStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback, setToast, setShowToast }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [terraformVcsStepConfigurationModel, setTerraformVcsStepConfiguration] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let terraformConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, terraformVcsStepFormMetadata);

    if (terraformConfigurationData.getData("iamRoleFlag") === true) {
      terraformConfigurationData.setMetaDataFields(terraformVcsStepFormMetadata.fieldsAlt);
    }

    setTerraformVcsStepConfiguration(terraformConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    
    if (validateRequiredFields()) {
      
      const createPipelinePostBody = {        
        pipelineId: pipelineId,
        stepId: stepId,
      };
      
      const toolConfiguration = {
        configuration: terraformVcsStepConfigurationModel?.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };
      
      await createJob(toolConfiguration, stepId, createPipelinePostBody);
    }
  };

  const validateRequiredFields = () => {
    if (
      terraformVcsStepConfigurationModel.getData("terraformCloudId").length === 0 ||
      terraformVcsStepConfigurationModel.getData("organizationName").length === 0 ||
      terraformVcsStepConfigurationModel.getData("workspaceName").length === 0
    ) {
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);        
        return false;
    } else {
        return true;
    }
  };

  if (isLoading || terraformVcsStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={terraformVcsStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TerraformVcsJobTypeSelectInput 
        dataObject={terraformVcsStepConfigurationModel} 
        setDataObject={setTerraformVcsStepConfiguration} 
      />
      <TerraformEnterpriseToolSelectInput 
        model={terraformVcsStepConfigurationModel} 
        setModel={setTerraformVcsStepConfiguration}      
      />      
      <TerraformVcsCloudOrganizationsSelectInput 
        dataObject={terraformVcsStepConfigurationModel} 
        setDataObject={setTerraformVcsStepConfiguration}
        disabled={!terraformVcsStepConfigurationModel?.getData("terraformCloudId")} 
        toolId={terraformVcsStepConfigurationModel?.getData("terraformCloudId")}
      />
      <TerraformVcsWorkspaceSelectInput 
        dataObject={terraformVcsStepConfigurationModel} 
        setDataObject={setTerraformVcsStepConfiguration}
        disabled={!terraformVcsStepConfigurationModel?.getData("organizationName")} 
        toolId={terraformVcsStepConfigurationModel?.getData("terraformCloudId")}
      />
      <Col className="p-0 mt-3 mb-3">
        <TerraformInputParameters
          dataObject={terraformVcsStepConfigurationModel}
          setDataObject={setTerraformVcsStepConfiguration}
        />
      </Col>
      <Col className="p-0 mb-3">
        <TerraformEnvironmentVariables
          dataObject={terraformVcsStepConfigurationModel}
          setDataObject={setTerraformVcsStepConfiguration}
        />
      </Col>      
      <TerraformCustomParametersInput
        model={terraformVcsStepConfigurationModel}
        setModel={setTerraformVcsStepConfiguration}
        fieldName={"saveParameters"}
      />      
    </PipelineStepEditorPanelContainer>
  );
}

TerraformVcsStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default TerraformVcsStepConfiguration;
