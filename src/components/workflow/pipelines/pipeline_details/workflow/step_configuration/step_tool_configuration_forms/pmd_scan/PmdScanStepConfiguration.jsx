import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import pmdScanStepFormMetadata from "./pmdScan-stepForm-metadata";
import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import StepConfigWorkspaceDeleteToggleInput from "../common/inputs/StepConfigWorkspaceDeleteToggleInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PmdScanThresholdInputBase
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/pmd_scan/inputs/PmdScanThresholdInputBase";
import PMDScanHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/pmd_scan/pmd-scan-helper";

const RULE_LIST_VALUES = [
  "bestPracticeThreshold",
  "codeStyleThreshold",
  "designThreshold",
  "errorProneThreshold",
  "securityThreshold",
];
  
function PmdScanStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  createJob,
  setToast,
  setShowToast,
  closeEditorPanel
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [pmdStepConfigurationDto, setPmdStepConfigurationDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

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
    return STEP_OPTIONS;
  };


  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let pmdConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, pmdScanStepFormMetadata);

    setPmdStepConfigurationDto(pmdConfigurationData);

    if (job_type) {
        setJobType(job_type);
    }

    if (threshold) {
        setThresholdType(threshold?.type);
        setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  // console.log(pmdStepConfigurationDto);

  const constructPMDQualityGates = async () => {

    let qualityGates = await PMDScanHelper.constructQualityGate(pmdStepConfigurationDto.getPersistData());

    pmdStepConfigurationDto.setData("qualityGate", qualityGates);
  };
  
  const handleCreateAndSave = async () => {

    const toolId = pmdStepConfigurationDto.getData("toolConfigId");

    if (toolId) {
      // setLoading(true);
      await constructPMDQualityGates();

      const createJobPostBody = {
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: pmdStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: "opsera-job",
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || pmdStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={pmdStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <StepConfigJenkinsToolInput model={pmdStepConfigurationDto} setModel={setPmdStepConfigurationDto} />
      <StepConfigJenkinsJobInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} typeFilter={"PMD_SCAN"} />
      {/* <StepConfigJenkinsAccountInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} />
      <StepConfigBitbucketWorkspaceInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} />
      <StepConfigGitRepositoryInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} />
      <StepConfigGitBranchInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} />
      <StepConfigWorkspaceDeleteToggleInput dataObject={pmdStepConfigurationDto} setDataObject={setPmdStepConfigurationDto} fieldName={"workspaceDeleteFlag"} /> */}
      <SelectInputBase
        setDataObject={setPmdStepConfigurationDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={pmdStepConfigurationDto}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"stepIdXML"}
      />
      {RULE_LIST_VALUES.map((rule, index) => {
        return(
          <div key={index}>
            <PmdScanThresholdInputBase
              fieldName={rule}
              model={pmdStepConfigurationDto}
              className={"mb-3"}
              setModel={setPmdStepConfigurationDto}
              // disabled={disabled}
            />
          </div>
        );
      })}

    </PipelineStepEditorPanelContainer>
  );
}

PmdScanStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.object,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default PmdScanStepConfiguration;