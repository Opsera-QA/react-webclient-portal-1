import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import salesforceScanStepFormMetadata from "./salesforceScan-stepForm-metadata";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SalesforceScanGatesMultiSelectInput from "./inputs/SalesforceScanGatesMultiSelectInput";
import RoleRestrictedToolByIdentifierInputBase
  from "../../../../../../../common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
  
function SalesforceScanStepConfiguration({
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
  const [sfdxScanStepConfigurationDto, setSfdxScanStepConfigurationDto] = useState(undefined);
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
    let scanConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, salesforceScanStepFormMetadata);

    setSfdxScanStepConfigurationDto(scanConfigurationData);

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

    const toolId = sfdxScanStepConfigurationDto.getData("toolConfigId");

    if (toolId) {
      // setLoading(true);
      const createJobPostBody = {
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: sfdxScanStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: "opsera-job",
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || sfdxScanStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={sfdxScanStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <StepConfigJenkinsToolInput model={sfdxScanStepConfigurationDto} setModel={setSfdxScanStepConfigurationDto} />
      <StepConfigJenkinsJobInput dataObject={sfdxScanStepConfigurationDto} setDataObject={setSfdxScanStepConfigurationDto} typeFilter={"SFDC_CODE_SCAN"} />
      <SelectInputBase
        setDataObject={setSfdxScanStepConfigurationDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={sfdxScanStepConfigurationDto}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"stepIdXML"}
      />
      <RoleRestrictedToolByIdentifierInputBase
          toolIdentifier={"salesforce-code-analyzer"}
          toolFriendlyName={"Salesforce Code Analyzer"}
          fieldName={"sfdxScanToolId"}
          model={sfdxScanStepConfigurationDto}
          setModel={setSfdxScanStepConfigurationDto}
          configurationRequired={false}
      />
      <SalesforceScanGatesMultiSelectInput
          dataObject={sfdxScanStepConfigurationDto} setDataObject={setSfdxScanStepConfigurationDto} fieldName={"qualityGateIds"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

SalesforceScanStepConfiguration.propTypes = {
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

export default SalesforceScanStepConfiguration;