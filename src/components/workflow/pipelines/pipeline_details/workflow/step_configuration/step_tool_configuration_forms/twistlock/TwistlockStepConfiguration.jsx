import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import twistlockStepFormMetadata from "./twistlock-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TwistlockToolSelectInput from "./inputs/TwistlockToolSelectInput";
import TwistlockDockerPushSelectInput from "./inputs/TwistlockDockerPushSelectInput";
import TwistlockJenkinsToolSelectInput from "./inputs/TwistlockJenkinsToolSelectInput";

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
      <TwistlockJenkinsToolSelectInput dataObject={twistlockStepConfigurationDto} setDataObject={setTwistlockStepConfigurationDataDto} />
      <TwistlockToolSelectInput dataObject={twistlockStepConfigurationDto} setDataObject={setTwistlockStepConfigurationDataDto} />
      <TwistlockDockerPushSelectInput  
        dataObject={twistlockStepConfigurationDto}
        setDataObject={setTwistlockStepConfigurationDataDto}
        plan={plan}
        stepId={stepId}
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
