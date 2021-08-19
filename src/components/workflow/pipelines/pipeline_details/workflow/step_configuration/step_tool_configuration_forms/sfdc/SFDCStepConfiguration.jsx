import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import sfdcStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/sfdc-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
// input imports
import SfdcJenkinsToolInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SfdcJenkinsToolInput";
import SfdcDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SfdcDependencyTypeInput";
import SfdcJobConfigurationPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/configuration_forms/SfdcJobConfigurationPanel";
import { getMissingRequiredFieldsErrorDialog } from "../../../../../../../common/toasts/toasts";

function SFDCStepConfiguration({ 
  pipelineId, 
  stepTool,
  plan, 
  stepId, 
  createJob, 
  closeEditorPanel,
  setToast,
  setShowToast,
  parentCallback
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
    setShowToast(false);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let sfdcConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, sfdcStepFormMetadata);

    setSFDCStepConfigurationDataDto(sfdcConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });

    // console.log({STEP_OPTIONS});

    return STEP_OPTIONS;
  };

  // const validateRequiredFields = () => {
  //   console.log({sfdcStepConfigurationDto})
  //   let reqFieldsErr = sfdcStepConfigurationDto.getFields().filter(field => 
  //     (field.isRequired && sfdcStepConfigurationDto.getData(field.id).length <= 0));    
  //   // reqFields.forEach(field => {
  //   //   if(sfdcStepConfigurationDto.getData(field.id).length <= 0){
  //   //     let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
  //   //     setToast(toast);
  //   //     setShowToast(true);
  //   //     console.log('return false')
  //   //     return false;        
  //   //   }
  //   // })
  //   if(reqFieldsErr.length > 0){
  //     return false;
  //   }else{
  //     return true;
  //   }    
  // }

  const validateRequiredFields = () => {

    console.log({sfdcStepConfigurationDto});

    if(!sfdcStepConfigurationDto.getData("toolConfigId") || 
    sfdcStepConfigurationDto.getData("toolConfigId").length <=0 ||    
    sfdcStepConfigurationDto.getData("toolJobId").length <=0 ||
    sfdcStepConfigurationDto.getData("jobType").length <=0){
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    }else {
      return true;
    }
  };

  const handleCreateAndSave = async () => {

    // console.log({sfdcStepConfigurationDto});

    const toolId = sfdcStepConfigurationDto.getData("toolConfigId");
    const job_type = sfdcStepConfigurationDto.getData("jobType");
    // console.log("saving and creating job for toolID: ", toolId);
    if (validateRequiredFields() && toolId) {
    // if (toolId) {      
      // setLoading(true);
      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      // console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: sfdcStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        // job_type: "sfdc-ant",
        job_type: job_type
      };
      // console.log("item: ", toolConfiguration);

      if(job_type.toUpperCase() === "SFDC CREATE PACKAGE XML" || job_type.toUpperCase() === "SFDC PROFILE DEPLOY"){
        await parentCallback(toolConfiguration);
      }else{
        await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
      }
    }
  };

  if (isLoading || sfdcStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={sfdcStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >      
      <SfdcJenkinsToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* depending on job type dynamic forms needs ot be displayed */}
      <SfdcJobConfigurationPanel sfdcStepConfigurationDto={sfdcStepConfigurationDto} setSfdcStepConfigurationDataDto={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
      <SfdcDependencyTypeInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
    </PipelineStepEditorPanelContainer>
  );
}

SFDCStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.string,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
  parentCallback: PropTypes.func,    
};

export default SFDCStepConfiguration;
