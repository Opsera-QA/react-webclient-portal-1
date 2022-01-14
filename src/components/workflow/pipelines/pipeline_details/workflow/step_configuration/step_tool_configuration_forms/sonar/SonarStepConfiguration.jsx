import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faSave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../../common/status_notifications/error";
import {
  getErrorDialog,
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
  createJob,
  setToast,
  setShowToast
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);

  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jobType, setJobType] = useState("");
  const [sonarStepModel, setSonarStepModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);

  useEffect(() => {
    loadData();
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

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(stepTool);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      controller.abort();
    };
  }, [stepTool]);

  // fetch repos
  useEffect(() => {
    setShowToast(false);

    async function fetchRepos(service, gitToolId) {
      setIsWorkspacesSearching(true);
      // Set results state
      let results = await pipelineActions.searchWorkSpaces(service, gitToolId, getAccessToken);
      if (typeof(results) != "object") {
        setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Workspace information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsWorkspacesSearching(false);
        return;
      }
        //console.log(results);
        setWorkspacesList(results);
        setIsWorkspacesSearching(false);
    }

    if (
      formData.service === "bitbucket" &&
      formData.gitToolId &&
      formData.gitToolId.length > 0
    ) {
      // Fire off our API call
      fetchRepos(formData.service, formData.gitToolId);
    } else {
      setIsWorkspacesSearching(true);
      setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.gitToolId, formData.gitCredential]);

  // fetch repos
  useEffect(() => {
    setShowToast(false);

    async function fetchRepos(service, gitToolId, workspaces) {
      setIsRepoSearching(true);
      // Set results state
      let results = await pipelineActions.searchRepositories(service, gitToolId, workspaces, getAccessToken);
      if (typeof(results) != "object") {
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Repository information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsRepoSearching(false);
        return;
      }
        //console.log(results);
        setRepoList(results);
        setIsRepoSearching(false);
    }

    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.gitToolId &&
      formData.gitToolId.length > 0
    ) {
      // Fire off our API call
      fetchRepos(formData.service, formData.gitToolId, formData.workspace);
    } else {
      setIsRepoSearching(true);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.gitToolId, formData.gitCredential, formData.workspace]);


  // fetch branches
  useEffect(() => {
    setShowToast(false);

    async function fetchBranches(service, gitToolId, repoId, workspaces) {
      setIsBranchSearching(true);
      // Set results state
      let results = await pipelineActions.searchBranches(service, gitToolId, repoId, workspaces, getAccessToken);
      if (typeof(results) != "object") {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Branch information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsBranchSearching(false);
        return;
      }
        setBranchList(results);
        setIsBranchSearching(false);
    }

    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.gitToolId &&
      formData.gitToolId.length > 0 &&
      formData.repoId &&
      formData.repoId.length > 0
    ) {
      // Fire off our API call
      fetchBranches(formData.service, formData.gitToolId, formData.repoId, formData.workspace);
    } else {
      setIsRepoSearching(true);
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.repoId]);

  const loadFormData = async (step) => {
    let { configuration, threshold, job_type } = step;
    if (typeof configuration !== "undefined") {
      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
      if (typeof job_type !== "undefined") {
        setJobType(job_type);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
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
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);
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
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    }
  };

  const handleWorkspacesChange = (selectedOption) => {
    setFormData({
      ...formData,
      workspace: selectedOption.key,
      workspaceName: selectedOption.name,
      repository: "",
      repoId: "",
      projectId: "",
      gitUrl: "",
      sshUrl: "",
      branch: "",
      defaultBranch: "",
      gitBranch: "",
    });
  };

  const handleRepoChange = (selectedOption) => {
    setFormData({
      ...formData,
      repository: selectedOption.name,
      repoId: selectedOption.id,
      projectId: selectedOption.id,
      gitUrl: selectedOption.httpUrl || "",
      sshUrl: selectedOption.sshUrl || "",
      branch: "",
      defaultBranch: "",
      gitBranch: "",
    });
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
    <>
      {error && <ErrorDialog error={error} align={"top"} setError={setErrors}/>}

      <Form>
        <SonarStepJenkinsToolSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        <SonarStepJobTypeSelectInput
          model={sonarStepModel}
          setModel={setSonarStepModel}
        />
        {getDynamicFields()}
        {jobType === "job" ? (
            <></>
          ) :
          <>
            {formData.service && formData.service === "bitbucket" && formData.gitToolId && (
              <Form.Group controlId="account" className="mt-2">
                <Form.Label>Workspace/Project*</Form.Label>
                {isWorkspacesSearching ? (
                  <div className="form-text text-muted mt-2 p-2">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    Loading workspaces from registry
                  </div>
                ) : (
                  <>
                    {workspacesList ? (
                      <StandaloneSelectInput
                        selectOptions={workspacesList}
                        value={
                          workspacesList[
                            workspacesList.findIndex(
                              (x) => x.key === formData.workspace,
                            )
                            ]
                        }
                        valueField="key"
                        textField="name"
                        filter="contains"
                        setDataFunction={handleWorkspacesChange}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="text-muted mr-1"
                        fixedWidth
                      />
                    )}
                  </>
                )}
              </Form.Group>
            )}

            {formData.service && 
            formData.gitToolId && 
            (formData.service === "bitbucket"? 
              formData.workspace 
              && formData.workspace.length > 0 : true ) && (
              <Form.Group controlId="account" className="mt-2">
                <Form.Label>Repository*</Form.Label>
                {isRepoSearching ? (
                  <div className="form-text text-muted mt-2 p-2">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    Loading repositories from registry
                  </div>
                ) : (
                  <>
                    {repoList ? (
                      <StandaloneSelectInput
                        selectOptions={repoList}
                        value={
                          repoList[
                            repoList.findIndex(
                              (x) => x.name === formData.repository,
                            )
                            ]
                        }
                        valueField="value"
                        textField="name"
                        filter="contains"
                        setDataFunction={handleRepoChange}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="text-muted mr-1"
                        fixedWidth
                      />
                    )}
                  </>
                )}
                {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
              </Form.Group>
            )}

            {formData.service && formData.gitToolId && formData.repoId && (
              <>
              <Form.Group controlId="account" className="mt-2">
                <Form.Label>Branch*</Form.Label>
                {isBranchSearching ? (
                  <div className="form-text text-muted mt-2 p-2">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    Loading branches from selected repository
                  </div>
                ) : (
                  <>
                    {branchList ? (
                      <StandaloneSelectInput
                        selectOptions={branchList}
                        value={
                          branchList[
                            branchList.findIndex((x) => x.value === formData.branch)
                            ]
                        }
                        valueField="value"
                        textField="name"
                        filter="contains"
                        setDataFunction={handleBranchChange}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="text-muted mr-1"
                        fixedWidth
                      />
                    )}
                  </>
                )}
                {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
              </Form.Group>
                <Form.Group controlId="workspaceDeleteFlag">
                  <Form.Check inline
                              type="checkbox"
                              label={"Delete workspace before building"}
                              id={`workspaceDeleteFlag`}
                              checked={formData.workspaceDeleteFlag}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  workspaceDeleteFlag: e.target.checked
                                })
                              }
                  />
                  <Form.Text className="text-muted">Deletes the Jenkins workspace before building.</Form.Text>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="path">
              <Form.Label>Sonar Source Path</Form.Label>
              <Form.Control
                // maxLength="50"
                as="textarea" rows={2}
                placeholder=""
                value={formData.sonarSourcePath || ""}
                onChange={(e) => setFormData({ ...formData, sonarSourcePath: (e.target.value).replace(/\r?\n/g, ',') })}
              />
            </Form.Group>

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
          </>
        }

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

        <small className="form-text text-muted mt-2 text-right">
          * Required Fields
        </small>
      </Form>
    </>
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
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default SonarStepConfiguration;
