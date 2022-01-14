import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import ErrorDialog from "../../../../../../../common/status_notifications/error";
import {
  getMissingRequiredFieldsErrorDialog,
} from "../../../../../../../common/toasts/toasts";

import pipelineActions from "components/workflow/pipeline-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import SonarStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepJenkinsToolSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import sonarPipelineStepMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/sonarPipelineStep.metadata";
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
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import SonarStepSonarSourcePathTextAreaInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/inputs/SonarStepSonarSourcePathTextAreaInput";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  toolJobId: "",
  toolJobType: "",
  projectKey: "",
  sonarToolConfigId: "",
  accountUsername: "",
  projectId: "",
  defaultBranch: "",
  dockerName: "",
  dockerTagName: "",
  buildType: "gradle", //hardcoded now but needs to get it from a dropdown
  gitToolId: "",
  repoId: "",
  gitUrl: "",
  sshUrl: "",
  service: "",
  gitCredential: "",
  gitUserName: "",
  repository: "",
  branch: "",
  sonarSourcePath: "",
  workspace: "",
  workspaceName: "",
  workspaceDeleteFlag: false
  // agentLabels : "",
};

function SonarStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  handleCloseFunction,
  createJob,
}) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jobType, setJobType] = useState("");
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
    let { threshold } = stepTool;
    const newSonarStepModel = modelHelpers.getPipelineStepConfigurationModel(stepTool, sonarPipelineStepMetadata);

    setSonarStepModel(newSonarStepModel);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async (pipelineId, stepId, toolId) => {
    if (validateRequiredFields() && toolId) {
      setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {
          stepId: formData?.stepIdXML,
        },
      };

      const toolConfiguration = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jobType,
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);

      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jobType,
      };
      setLoading(false);
      parentCallback(item);
    }
  };

  const validateRequiredFields = () => {
    let {
      toolConfigId,
      jenkinsUrl,
      jUserId,
      jAuthToken,
      jobName,
      buildType,
      dockerName,
      dockerTagName,
    } = formData;

    if (jobType === "job") {
      if (jobName.length === 0) {
        // let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        // setToast(toast);
        // setShowToast(true);
        return false;
      } else {
        return true;
      }
    } else {
      if (
        toolConfigId.length === 0 ||
        jenkinsUrl.length === 0 ||
        jUserId.length === 0 ||
        jAuthToken.length === 0 ||
        // jobName.length === 0 ||
        (buildType === "docker"
          ? dockerName.length === 0 || dockerTagName.length === 0
          : false)
      ) {
        // let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        // setToast(toast);
        // setShowToast(true);
        return false;
      } else {
        return true;
      }
    }
  };

  const handleBranchChange = (selectedOption) => {
    setFormData({
      ...formData,
      branch: selectedOption.value,
      defaultBranch: selectedOption.value,
      gitBranch: selectedOption.value,
    });
  };

  const getDynamicFields = () => {
    if (sonarStepModel?.getData("opsera_job_type") === SONAR_JOB_TYPES.CUSTOM_JOB) {
      return (
        <TextInputBase
          fieldName={"jobName"}
          dataObject={sonarStepModel}
          setDataObject={setSonarStepModel}
        />
      );
    }

    if (sonarStepModel?.getData("opsera_job_type") === SONAR_JOB_TYPES.OPSERA_MANAGED_JOB) {
      return (
        <>
          <SonarStepJenkinsToolJobSelectInput
            model={sonarStepModel}
            setModel={setSonarStepModel}
            jenkinsToolId={sonarStepModel?.getData("toolConfigId")}
          />
          <SonarStepSonarToolSelectInput
            model={sonarStepModel}
            setModel={setSonarStepModel}
          />
          <TextInputBase
            fieldName={"projectKey"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
          />
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
          <BooleanToggleInput
            fieldName={"workspaceDeleteFlag"}
            dataObject={sonarStepModel}
            setDataObject={setSonarStepModel}
          />
          <SonarStepSonarSourcePathTextAreaInput
            model={sonarStepModel}
            setModel={setSonarStepModel}
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
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
        <SonarStepJenkinsToolSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepJobTypeSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        {getDynamicFields()}
        {jobType === "opsera-job" ? (
          <Button
            variant="primary"
            type="button"
            className="mt-3"
            onClick={() => {
              handleCreateAndSave(pipelineId, stepId, formData.toolConfigId);
            }}
          >
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="mr-1"
                  fixedWidth
                />{" "}
                Working
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1"/>
                Create Job and Save
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            type="button"
            className="mt-3"
            onClick={() => {
              callbackFunction();
            }}
          >
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="mr-1"
                  fixedWidth
                />{" "}
                Saving
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
              </>
            )}
          </Button>
        )}
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
