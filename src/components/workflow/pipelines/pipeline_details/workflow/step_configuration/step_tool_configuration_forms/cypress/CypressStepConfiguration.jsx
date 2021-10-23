import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import pipelineActions from "components/workflow/pipeline-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import cypressPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/cypressPipelineStepConfigurationMetadata";
import {AuthContext} from "contexts/AuthContext";
import CypressStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsToolSelectInput";
import LoadingDialog from "components/common/status_notifications/loading";
import CypressStepJobTypeSelectInput
  , {CYPRESS_JOB_TYPES} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CypressStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsJobSelectInput";
import CypressStepRepositorySelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepRepositorySelectInput";
import CypressStepBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepBranchSelectInput";
import CheckboxInput from "components/common/inputs/boolean/CheckboxInput";
import CypressStepBitbucketWorkspaceSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepBitbucketWorkspaceSelectInput";
import CypressStepJenkinsAccountSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJenkinsAccountSelectInput";

function CypressStepConfiguration({
  stepTool,
  pipelineId,
  stepId,
  parentCallback,
  createJob,
  handleClose,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdVal] = useState("");
  const [thresholdType] = useState("");
  const [cypressStepModel, setCypressStepModel] = useState("");

  useEffect(() => {
    loadFormData(stepTool);
  }, [stepTool]);

  // TODO: Rework
  const loadFormData = (step) => {
    const newModel = modelHelpers.parseObjectIntoModel(step?.configuration, cypressPipelineStepConfigurationMetadata);
    setCypressStepModel({...newModel});
  };

  const handleCreateAndSave = async (pipelineId, stepId, toolId) => {
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
      handleClose={handleClose}
      recordDto={cypressStepModel}
      persistRecord={cypressStepModel?.getData("opsera_job_type") === CYPRESS_JOB_TYPES.OPSERA_MANAGED_JOB ? handleCreateAndSave(pipelineId, stepId, formData.toolConfigId) : callbackFunction}
      isLoading={isLoading}
    >
      <Form>
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
        <CheckboxInput
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
        {/*TODO: Remove this*/}
        <Form.Group controlId="threshold">
          <Form.Label>Success Threshold</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={thresholdVal || ""}
            onChange={(e) => setThresholdValue(e.target.value)}
            disabled={true}
          />
        </Form.Group>
      </Form>
    </PipelineStepEditorPanelContainer>
  );
}

CypressStepConfiguration.propTypes = {
  stepTool: PropTypes.string,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  createJob: PropTypes.func,
  handleClose: PropTypes.func,
};

export default CypressStepConfiguration;
