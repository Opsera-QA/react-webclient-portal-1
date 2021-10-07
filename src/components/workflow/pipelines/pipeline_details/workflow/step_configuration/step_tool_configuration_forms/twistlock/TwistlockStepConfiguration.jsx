import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import twistlockStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/twistlock/twistlockPipelineStepForm.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TwistlockDockerPushSelectInput from "./inputs/TwistlockDockerPushSelectInput";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";
import RoleRestrictedTwistlockToolSelectInput
  from "components/common/list_of_values_input/tools/twistlock/RoleRestrictedTwistlockToolSelectInput";
import TwistlockStepComplianceThresholdInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/twistlock/inputs/TwistlockStepComplianceThresholdInput";
import TwistlockStepVulnerabilityThresholdInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/twistlock/inputs/TwistlockStepVulnerabilityThresholdInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function TwistlockStepConfiguration({ pipelineId, stepTool, stepId, closeEditorPanel, parentCallback, plan, createJob}) {
  const [isLoading, setIsLoading] = useState(false);
  const [twistlockStepConfigurationDto, setTwistlockStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let twistlockConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      twistlockStepFormMetadata
    );

    setTwistlockStepConfigurationDataDto(twistlockConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const toolId = twistlockStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: twistlockStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: twistlockStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || twistlockStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={twistlockStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <RoleRestrictedJenkinsToolSelectInput
        model={twistlockStepConfigurationDto}
        setModel={setTwistlockStepConfigurationDataDto}
        fieldName={"toolConfigId"}
      />
      <RoleRestrictedTwistlockToolSelectInput
        model={twistlockStepConfigurationDto}
        setModel={setTwistlockStepConfigurationDataDto}
        fieldName={"twistlockToolId"}
      />
      <TwistlockDockerPushSelectInput
        dataObject={twistlockStepConfigurationDto}
        setDataObject={setTwistlockStepConfigurationDataDto}
        plan={plan}
        stepId={stepId}
      />
      <BooleanToggleInput
        dataObject={twistlockStepConfigurationDto}
        setDataObject={setTwistlockStepConfigurationDataDto}
        fieldName={"clientSideThreshold"}
      />
      <TwistlockStepComplianceThresholdInput
       model={twistlockStepConfigurationDto}
       setModel={setTwistlockStepConfigurationDataDto}
       visible={twistlockStepConfigurationDto.getData("clientSideThreshold")}
      />
      <TwistlockStepVulnerabilityThresholdInput
       model={twistlockStepConfigurationDto}
       setModel={setTwistlockStepConfigurationDataDto}
       visible={twistlockStepConfigurationDto.getData("clientSideThreshold")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

TwistlockStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
  createJob: PropTypes.func,
};

export default TwistlockStepConfiguration;
