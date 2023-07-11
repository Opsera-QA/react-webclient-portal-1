import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import cypressPipelineStepConfigurationMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/cypressPipelineStepConfigurationMetadata";
import CypressStepJenkinsToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsToolSelectInput";
import LoadingDialog from "components/common/status_notifications/loading";
import CypressStepJobTypeSelectInput, { CYPRESS_JOB_TYPES } from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CypressStepJenkinsJobSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsJobSelectInput";
import CypressStepRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepRepositorySelectInput";
import CypressStepBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepBranchSelectInput";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";
import CypressStepBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepBitbucketWorkspaceSelectInput";
import CypressStepJenkinsAccountSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsAccountSelectInput";

function CypressStepConfiguration({
  stepTool,
  pipelineId,
  stepId,
  parentCallback,
  createJob,
  closeEditorPanel,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdVal] = useState("");
  const [thresholdType] = useState("");
  const [cypressStepModel, setCypressStepModel] = useState(undefined);

  useEffect(() => {
    loadFormData(stepTool);
  }, [stepTool]);

  // TODO: Rework
  const loadFormData = (step) => {
    const newModel = modelHelpers.parseObjectIntoModel(step?.configuration, cypressPipelineStepConfigurationMetadata);
    setCypressStepModel({...newModel});
  };

  const handleCreateAndSave = async () => {
    const toolId = cypressStepModel?.getData("toolConfigId");

    if (toolId) {
      setIsLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {
          stepId: cypressStepModel?.getData("stepIdXML"),
        },
      };

      const toolConfiguration = {
        configuration: cypressStepModel?.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: cypressStepModel?.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const callbackFunction = async () => {
    setIsLoading(true);

    const item = {
      configuration: cypressStepModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: cypressStepModel?.getData("jobType"),
    };
    setIsLoading(false);
    parentCallback(item);
  };

  if (cypressStepModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Step"} />);
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={cypressStepModel}
      persistRecord={cypressStepModel?.getData("opsera_job_type") === CYPRESS_JOB_TYPES.OPSERA_MANAGED_JOB ? handleCreateAndSave : callbackFunction}
      isLoading={isLoading}
    >
      <CypressStepJobTypeSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepJenkinsToolSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepJenkinsJobSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepJenkinsAccountSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepBitbucketWorkspaceSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepRepositorySelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CypressStepBranchSelectInput
        model={cypressStepModel}
        setModel={setCypressStepModel}
      />
      <CheckboxInputBase
        model={cypressStepModel}
        setModel={setCypressStepModel}
        fieldName={"workspaceDeleteFlag"}
        disabled={cypressStepModel?.getData("branch") === ""}
      />
      <TextInputBase
        fieldName={"jsonPath"}
        dataObject={cypressStepModel}
        setDataObject={setCypressStepModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

CypressStepConfiguration.propTypes = {
  stepTool: PropTypes.string,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  createJob: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default CypressStepConfiguration;
