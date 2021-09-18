import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  getMissingRequiredFieldsErrorDialog
} from "../../../../../../../common/toasts/toasts";

import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import StepConfigWorkspaceDeleteToggleInput from "../common/inputs/StepConfigWorkspaceDeleteToggleInput";

import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import junitPipelineStepConfigurationMetadata from "./junitPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";


function JUnitStepConfiguration({ 
  pipelineId, 
  stepTool, 
  stepId, 
  createJob, 
  closeEditorPanel,
  setToast,
  setShowToast
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [jobType, setJobType] = useState("");
    const [junitStepConfigurationDto, setJunitStepConfigurationDto] = useState(undefined);
    const [thresholdVal, setThresholdValue] = useState("");
    const [thresholdType, setThresholdType] = useState("");

    useEffect(() => {
        loadData();
      }, []);
    
      const loadData = async () => {
        setIsLoading(true);
        let { threshold, job_type } = stepTool;
        let junitConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, junitPipelineStepConfigurationMetadata);
    
        if (junitConfigurationData.getData("sourceScript") === true) {
          junitConfigurationData.setMetaDataFields(junitPipelineStepConfigurationMetadata.fields);
        }
    
        setJunitStepConfigurationDto(junitConfigurationData);
    
        if (job_type) {
          setJobType(job_type);
        }
    
        if (threshold) {
          setThresholdType(threshold?.type);
          setThresholdValue(threshold?.value);
        }
    
        setIsLoading(false);
      };


      const handleCreateAndSave = async () => {
        const toolId = junitStepConfigurationDto.getData("toolConfigId");
        
        if (validateRequiredFields() && toolId) {
          // setLoading(true);
          
          const createJobPostBody = {
            jobId: "",
            pipelineId: pipelineId,
            stepId: stepId,
            buildParams: {},
          };
          
          
    
          const toolConfiguration = {
            configuration: junitStepConfigurationDto.getPersistData(),
            threshold: {
              type: thresholdType,
              value: thresholdVal,
            },
            job_type: "opsera-job",
          };
          
    
          await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
        }
      };

      const validateRequiredFields = () => {
        if (
          junitStepConfigurationDto.getData("toolConfigId").length === 0 ||
          junitStepConfigurationDto.getData("jenkinsUrl").length === 0 ||
          junitStepConfigurationDto.getData("jUserId").length === 0 ||
          junitStepConfigurationDto.getData("jAuthToken").length === 0 ||
          (junitStepConfigurationDto.getData("buildType") === "docker"
            ? junitStepConfigurationDto.getData("dockerName").length === 0 || 
            junitStepConfigurationDto.getData("dockerTagName").length === 0
            : false)
        ) {
            let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
            setToast(toast);
            setShowToast(true);        
            return false;
        } else {
            return true;
        }
      };
    
      if (isLoading || junitStepConfigurationDto == null) {
        return <DetailPanelLoadingDialog />;
      }

      return (
        <PipelineStepEditorPanelContainer
          handleClose={closeEditorPanel}
          recordDto={junitStepConfigurationDto}
          persistRecord={handleCreateAndSave}
          isLoading={isLoading}
        >
          <StepConfigJenkinsToolInput model={junitStepConfigurationDto} setModel={setJunitStepConfigurationDto} />
          <StepConfigJenkinsJobInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} typeFilter={""} />
          <StepConfigJenkinsAccountInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} />
          <StepConfigBitbucketWorkspaceInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} />
          <StepConfigGitRepositoryInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} />
          <StepConfigGitBranchInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} />
          <StepConfigWorkspaceDeleteToggleInput dataObject={junitStepConfigurationDto} setDataObject={setJunitStepConfigurationDto} fieldName={"workspaceDeleteFlag"} />
        </PipelineStepEditorPanelContainer>
      );
}

JUnitStepConfiguration.propTypes = {
    pipelineId: PropTypes.string,
    stepId: PropTypes.string,
    createJob: PropTypes.func,
    stepTool: PropTypes.object,
    closeEditorPanel: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};
    
export default JUnitStepConfiguration;