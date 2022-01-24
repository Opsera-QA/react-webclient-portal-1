import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SonarStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJenkinsToolSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import SonarStepJobTypeSelectInput
  , {SONAR_JOB_TYPES} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SonarStepSonarToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepSonarToolSelectInput";
import SonarStepJenkinsToolJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJenkinsToolJobSelectInput";
import SonarStepJenkinsToolAccountSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJenkinsToolAccountSelectInput";
import axios from "axios";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SonarStepBitbucketWorkspaceSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepBitbucketWorkspaceSelectInput";
import SonarStepRepositorySelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepRepositorySelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import SonarStepBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepBranchSelectInput";
import SonarStepSonarSourcePathTextAreaInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepSonarSourcePathTextAreaInput";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import sonarPipelineStepMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/sonarPipelineStep.metadata";

function SonarStepConfiguration(
  {
    stepTool,
    pipelineId,
    plan,
    stepId,
    parentCallback,
    handleCloseFunction,
    createJob,
  }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [sonarStepModel, setSonarStepModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const  threshold = stepTool?.threshold;
    const jobType = stepTool?.job_type;
    const newSonarStepModel = modelHelpers.getPipelineStepConfigurationModel(stepTool, sonarPipelineStepMetadata);
    newSonarStepModel.setData("job_type", jobType);

    setSonarStepModel(newSonarStepModel);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const createJobPostBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
        stepId: sonarStepModel?.getData("stepIdXML"),
      },
    };

    const toolConfiguration = {
      configuration: sonarStepModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: sonarStepModel?.getData("job_type"),
    };

    return await createJob(sonarStepModel?.getData("toolConfigId"), toolConfiguration, stepId, createJobPostBody);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: sonarStepModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: sonarStepModel?.getData("job_type"),
    };

    return await parentCallback(item);
  };

  const getBranchScanToggleOptionDynamicFields = () => {
    if (sonarStepModel?.getData("isScanArtifact") === true) {
      return (
        <PipelineStepSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
          fieldName={"stepIdXml"}
          plan={plan}
          stepId={stepId}
        />
      );
    }

    return (
      <>
        <SonarStepJenkinsToolAccountSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepBitbucketWorkspaceSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepRepositorySelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepBranchSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepSonarSourcePathTextAreaInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
      </>
    );
  };

  const getDynamicFields = () => {
    if (sonarStepModel?.getData("job_type") === SONAR_JOB_TYPES.CUSTOM_JOB) {
      return (
        <TextInputBase
          fieldName={"jobName"}
          dataObject={sonarStepModel}
          setDataObject={setSonarStepModel}
        />
      );
    }

    if (sonarStepModel?.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB) {
      return (
        <>
          <SonarStepJenkinsToolJobSelectInput
            model={sonarStepModel}
            setModel={setSonarStepModel}
            jenkinsToolId={sonarStepModel?.getData("toolConfigId")}
          />
          <BooleanToggleInput
            fieldName={"isScanArtifact"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
          />
          {getBranchScanToggleOptionDynamicFields()}
          <SonarStepSonarToolSelectInput
            model={sonarStepModel}
            setModel={setSonarStepModel}
          />
          <TextInputBase
            fieldName={"projectKey"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
          />
          <BooleanToggleInput
            fieldName={"workspaceDeleteFlag"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
          />
          <TextInputBase
            fieldName={"successThreshold"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
            disabled={true}
          />
        </>
      );
    }
  };

  if (isLoading === true || sonarStepModel == null) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading Sonar Step"}
      />
    );
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={handleCloseFunction}
      recordDto={sonarStepModel}
      persistRecord={sonarStepModel.getData("job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB ? handleCreateAndSave : callbackFunction}
      isLoading={isLoading}
    >
      <div className={"mb-5"}>
        <SonarStepJenkinsToolSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepJobTypeSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        {getDynamicFields()}
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

SonarStepConfiguration.propTypes = {
  stepTool: PropTypes.string,
  pipelineId: PropTypes.string,
  plan: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  createJob: PropTypes.func,
  handleCloseFunction: PropTypes.func,
};

export default SonarStepConfiguration;
