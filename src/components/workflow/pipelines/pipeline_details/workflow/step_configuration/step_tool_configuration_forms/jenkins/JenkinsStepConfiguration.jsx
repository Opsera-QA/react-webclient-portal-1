import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Popover, Row, Col, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog,
} from "../../../../../../../common/toasts/toasts";
import SFDCConfiguration from "./jenkins_step_config_sub_forms/SFDCConfiguration";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import pipelineActions from "components/workflow/pipeline-actions";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";
import CloseButton from "../../../../../../../common/buttons/CloseButton";

import DockerSecretsInput from "./DockerSecretsInput";
import PythonFilesInput from "./PythonFilesInput";
import Model from "core/data_model/model";
import _ from "lodash";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import StepConfigTerraformStepSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigTerraformStepSelectInput";
import StepConfigUseTerraformOutput from "../common/inputs/StepConfigUseTerraformOutput";
import PipelineStepEditorPanelContainer
  from "../../../../../../../common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import ParameterSelectListInputBase
  from "../../../../../../../common/list_of_values_input/parameters/ParameterSelectListInputBase";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";

const JOB_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" },
  { value: "sfdc-ant", label: "SFDC Package Generation Job" },
  { value: "sfdc-ant-profile", label: "SFDC Profile Migration" },
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "",
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  toolJobId: "",
  toolJobType: "",
  rollbackBranchName: "",
  stepIdXML: "",
  sfdcDestToolId: "",
  destAccountUsername: "",
  sfdcToolId: "",
  accountUsername: "",
  projectId: "",
  defaultBranch: "",
  dockerName: "",
  dockerTagName: "",
  dockerPath: "",
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
  buildArgs: {},
  isOrgToOrg: false,
  isFullBackup: false,
  sfdcUnitTestType: "",
  workspace: "",
  workspaceName: "",
  workspaceDeleteFlag: false,
  isNewBranch: false,
  hasUpstreamBranch: false,
  upstreamBranch: "",
  outputPath: "",
  outputFileName: "",
  inputFileName: "",
  inputFilePath: "",
  agentLabels : "",
  autoScaleEnable: "",
  dockerBuildPathJson: {},
  dockerSecretKeys: [],
  customScript: false,
  inputDetails: [],
  commands: "",
  isManualRollBackBranch: false,
  terraformStepId: "",
  customParameters: [],
  useTerraformOutput: false
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  callbackGetFromVault,
  callbackDeleteFromVault,
  createJob,
  setToast,
  setShowToast,
  closeEditorPanel
}) {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jobType, setJobType] = useState("");

  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);

  const [dockerNameErr, setDockerNameErr] = useState(false);
  const [dockerTagErr, setDockerTagErr] = useState(false);

  const [listOfSteps, setListOfSteps] = useState([]);
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);
  
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);

  const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);  
  const [dataObject, setDataObject] = useState(undefined);
  const [pythonScriptData, setPythonScriptData] = useState(undefined);

  let step = {};

  let stepArrayIndex = plan.findIndex(x => x._id === stepId);
  if (stepArrayIndex > 0) {
    step = plan[stepArrayIndex];
  }
  
  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{"zIndex": 1500}} {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

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

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {        
        await loadFormData(stepTool);
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);
      controller.abort();
    };
  }, [stepTool]);

  useEffect(() => {
    setShowToast(false);
    async function fetchJenkinsDetails(service) {
      setisJenkinsSearching(true);
      // Set results state
      let results = await pipelineActions.getToolsList(service, getAccessToken);
      if (typeof(results) != "object") {
        setJenkinsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Jenkins information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setisJenkinsSearching(false);
        return;
      }
      const filteredList = results.filter(
        (el) => el.configuration !== undefined,
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setJenkinsList(filteredList);
        setisJenkinsSearching(false);
      }
    }
    fetchJenkinsDetails("jenkins");

    setDataObject(new Model({dockerSecrets: []}, {
      fields: [
        {
          label: "Docker Secrets",
          id: "dockerSecrets"
        }
      ]
    }, true));

    setPythonScriptData(new Model({inputDetails: []}, {
      fields: [
        {
          label: "Want to use a Custom Script",
          id: "customScript"
        },
        {
          label: "Input Details",
          id: "inputDetails"
        },
        {
          label: "Commands",
          id: "commands"
        },
        {
          label: "Terraform Step",
          id: "terraformStepId"
        },
        {
          label: "Custom Parameters",
          id: "customParameters",
          maxItems: 15,
        },
        {
          label: "Use Terraform Output",
          id: "useTerraformOutput"
        }
      ]
    }, true));

  }, []);

  useEffect(() => {
    if (formData.toolConfigId) {
      // console.log(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
      setAccountsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)].accounts
          : []
      );

      setJobsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)].jobs
          : []
      );
    }
  }, [jenkinsList, formData.toolConfigId]);

  
  useEffect(() => {
    if (jobsList && jobsList.length > 0 && formData.toolJobId && formData.toolJobId.length > 0 && !jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)]) {
     let toast = getErrorDialog(
        "Preselected job is no longer available.  It may have been deleted.  Please select another job from the list or recreate the job in Tool Registry.",
        setShowToast,
        "detailPanelTop"
      );
      setToast(toast);
      setShowToast(true);
      return;
    }
    setShowToast(false);
  }, [jobsList, formData.toolJobId]);

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

  useEffect(() => {
    if (formData.toolJobType && formData.toolJobType.includes("SFDC")) {
      setFormData({ ...formData, buildType: "ant" });
    }
  }, [formData.toolJobType]);

  // Populating docker secret keys
  useEffect(() => {
    if(dataObject){
      let tmp = dataObject;
      tmp.setData("dockerSecrets", formData.dockerSecretKeys);
      setDataObject(tmp);
    }    
  }, [formData.dockerSecretKeys]);

  useEffect(() => {
    if(pythonScriptData){
      let tmp = pythonScriptData;
      tmp.setData("inputDetails", formData.inputDetails);
      tmp.setData("commands", formData.commands);
      tmp.setData("customScript", formData.customScript);
      tmp.setData("terraformStepId", formData.terraformStepId);
      tmp.setData("customParameters", formData.customParameters);
      tmp.setData("useTerraformOutput", formData.useTerraformOutput);
      setPythonScriptData(tmp);
    }    
  }, [formData.inputDetails, formData.commands, formData.customScript, formData.terraformStepId, formData.customParameters, formData.useTerraformOutput]);

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
    console.log("saving and creating job for toolID: ", toolId);

    if (validateRequiredFields() && toolId) {
      setLoading(true);

      // if(formData.sfdcUnitTestType === "RunSpecifiedTests") {
      //   await getTestClasses(pipelineId, stepId, toolId);
      //   return;
      // }

      if(formData.buildType === "python") {
        handlePythonScriptDetails();
      }

      if( formData.buildType === "docker" && (deleteDockerSecrets || _.isEmpty(formData.dockerBuildPathJson)) && dataObject.data.dockerSecrets?.length !== 0){
        let dockerSecretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", dataObject.data.dockerSecrets);
        let keys = dataObject.data.dockerSecrets.map(secret => ({
          name: secret.name,
          value: dockerSecretKey
        }));
        setFormData(Object.assign(formData, {
          dockerBuildPathJson: dockerSecretKey,
          dockerSecretKeys: keys
        }));
      } else if (deleteDockerSecrets){        
        await deleteSecrets();
      }

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {
          stepId: formData?.stepIdXML,
        },
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jobType,
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const callbackFunction = async () => {
    console.log("saving data");
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
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };

  // const getSecrets = async () => {
  //   const response = await callbackGetFromVault(formData.dockerBuildPathJson.vaultKey);
  //   console.log({response})
  // }

  const deleteSecrets = async () => {
    try {
      const response = await callbackDeleteFromVault(formData.dockerBuildPathJson.vaultKey);      
      setFormData(Object.assign(formData, {
        dockerBuildPathJson: {},
        dockerSecretKeys: []
      }));      
    }catch (err) {
      console.error(err);
    }
  };

  const handlePythonScriptDetails = () => {
    if(pythonScriptData.getData("customScript")){
      setFormData(Object.assign(formData, {
        customScript: true,
        inputDetails: [],
        commands: pythonScriptData.getData("commands"),
        terraformStepId: pythonScriptData.getData("terraformStepId"),
        customParameters: pythonScriptData.getData("customParameters"),
        useTerraformOutput: pythonScriptData.getData("useTerraformOutput")
      }));
    }else {
      setFormData(Object.assign(formData, {
        customScript: false,
        inputDetails: pythonScriptData.getData("inputDetails"),
        commands: "",
        terraformStepId: "",
        customParameters: [],
        useTerraformOutput: false
      }));
    }
  };

  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": JSON.stringify(value)
    };
    const response = await callbackSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, dockerBuildPathJson: {} };
      });
      setLoading(false);
      let errorMessage = "ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.";
      let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return "";
    }
  };

  const validateRequiredFields = () => {
    const regex = RegExp("^[ a-z0-9_.-]*$");
    let { toolConfigId, toolJobId, jenkinsUrl, jUserId, jobName, buildType, dockerName, dockerTagName, sfdcUnitTestType } = formData;
    if(jobType === "opsera-job" && (!toolJobId || toolJobId.length === 0 )) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    }
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
        (formData.jobType === "SFDC UNIT TESTING" ? sfdcUnitTestType.length === 0 : false) ||
        (buildType === "docker" ? dockerName.length === 0 || !regex.test(dockerName) || dockerTagName.length === 0 || !regex.test(dockerTagName) : false) 
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

  const handleJenkinsChange = (selectedOption) => {
    if (!selectedOption.configuration) {
      let errorMessage =
        "Connection information missing for this tool!  This Jenkins tool does not have connection details defined in its Tool Registry record.  Please go into Tool Registry and add connection information in order for Opsera to work with this tool.";
      let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return;
    }

    //setLoading(true);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        toolConfigId: selectedOption.id,
        jenkinsUrl: selectedOption.configuration.jenkinsUrl,
        jUserId: selectedOption.configuration.jUserId,
        jenkinsPort: selectedOption.configuration.jenkinsPort,
        autoScaleEnable: selectedOption.configuration.autoScaleEnable,
        // jAuthToken: selectedOption.configuration.jAuthToken,
        gitToolId: "",
        repoId: "",
        gitUrl: "",
        sshUrl: "",
        service: "",
        gitCredential: "",
        gitUserName: "",
        repository: "",
        workspace:"",
        workspaceName: "",
        branch: "",
        toolJobId: "",
        toolJobType: "",
        rollbackBranchName: "",
        stepIdXML: "",
        sfdcDestToolId: "",
        destAccountUsername: "",
        sfdcToolId: "",
        accountUsername: "",
        projectId: "",
        defaultBranch: "",
      });
    }
    if (selectedOption.accounts && selectedOption.jobs) {
      setAccountsList(selectedOption.accounts);
      setJobsList(selectedOption.jobs);
    }
    //setLoading(false);
  };

  // console.log(formData);

  const handleJobChange = (selectedOption) => {
    switch (selectedOption.type[0]) {
      case "SFDC":
        setFormData({
          ...formData,
          toolJobId: selectedOption._id,
          toolJobType: selectedOption.type,
          jobType: selectedOption.configuration.jobType,
          ...selectedOption.configuration,
          stepIdXML: "",
          sfdcDestToolId: "",
          destAccountUsername: "",
          buildArgs: {},
        });
        break;
      default:
        setFormData({
          ...formData,
          toolJobId: selectedOption._id,
          toolJobType: selectedOption.type,
          jobType: selectedOption.type[0],
          ...selectedOption.configuration,
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          destAccountUsername: "",
          buildToolVersion: "6.3",
          buildArgs: {},
        });
        break;
    }
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({
      ...formData,
      gitToolId: selectedOption.toolId,
      gitCredential: selectedOption.gitCredential,
      gitUserName: selectedOption.gitUserName,
      service: selectedOption.service,
      repoId: "",
      gitUrl: "",
      sshUrl: "",
      repository: "",
      workspace:"",
      workspaceName: "",
      branch: "",
      projectId: "",
      defaultBranch: "",
    });
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

  const handleUpstreamBranchChange = (selectedOption) => {
    setFormData({
      ...formData,
      upstreamBranch: selectedOption.value,
    });
  };

  const handleCreateNewBranchFlag = (e) => {
    if(!e.target.checked) {
      setFormData({ ...formData, isNewBranch: e.target.checked, branch: "", gitBranch: "", hasUpstreamBranch: false, upstreamBranch: "" });
      return;
    }
    setFormData({ ...formData, isNewBranch: e.target.checked });
  };

  const handleJobTypeChange = (selectedOption) => {
    setShowToast(false);
    setJobType(selectedOption.value);
    switch (selectedOption.value) {
      case "sfdc-ant":
        setFormData({
          ...formData,
          // jobName: "",
          buildType: "ant",
          jobDescription: "PACKAGEXML_CREATION",
          jobType: "SFDC CREATE PACKAGE XML",
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: false,
        });
        break;
      case "sfdc-ant-profile":
        setFormData({
          ...formData,
          // jobName: "",
          buildType: "ant",
          jobDescription: "Profile-migration",
          jobType: "SFDC PROFILE DEPLOY",
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: true,
        });
        break;
      default:
        setFormData({
          ...formData,
          sfdcToolId: "",
          accountUsername: "",
          // jobName: "",
          buildType: "gradle", // defaults
          jobDescription: "",
          jobType: "BUILD", // defaults
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: false,
          buildArgs: {}
        });
        break;
    }
  };
  
  const handleJsonInputUpdate = (e) => {
    if (e.error) {
      console.log(e.error);
      return;
    }
    if (e.jsObject && Object.keys(e.jsObject).length > 0) {
      setFormData({ ...formData, buildArgs: e.jsObject });
      return;
    }
  };

  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, stepIdXML: selectedOption._id });
  };
  
  const handleShow = () => setShow(true);

  // const getTestClasses = async(pipelineId, stepId, toolId) => {
    
  //   setSave(true);
  //   // call api to get test classes
  //   try {
  //     // const accessToken = await getAccessToken();
  //     const res = await sfdcPipelineActions.setTestClassesList({"sfdcToolId": formData.sfdcToolId, "pipelineId": pipelineId, "stepId": stepId }, getAccessToken);
  //     if (res.data.status != 200 ) {
  //       let toast = getErrorDialog(
  //         res.data.message,
  //         setShowToast,
  //         "detailPanelTop"
  //       );
  //       setToast(toast);
  //       setShowToast(true);
  //       setSave(false);
  //       return;
  //     }
  //     handleShow();
  //   } catch (error) {
  //     console.error("Error getting API Data: ", error);
  //     toastContext.showLoadingErrorDialog(error);
  //   }
  // }

  const saveConfig = async() => {
    const createJobPostBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
        stepId: formData?.stepIdXML,
      },
    };
    console.log("createJobPostBody: ", createJobPostBody);

    const toolConfiguration = {
      configuration: formData,
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: jobType,
    };
    console.log("item: ", toolConfiguration);

    await createJob( formData.toolConfigId, toolConfiguration, stepId, createJobPostBody);
  
  };

  const getTerraformSelect = () => {
    if (pythonScriptData?.getData("useTerraformOutput")) {
      return (
        <StepConfigTerraformStepSelectInput setDataObject={setPythonScriptData} dataObject={pythonScriptData} plan={plan} stepId={stepId} />
      );
    }
  };

  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
              make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
          </Popover.Content>
        </Popover>
      );
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="jenkinsList">
          <Form.Label className="w-100">
            Tool*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)])}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="fa-pull-right pointer pr-1"
                onClick={() => document.body.click()}
              />
            </OverlayTrigger>
          </Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {renderForm && jenkinsList && jenkinsList.length > 0 ? (
                <>
                  <DropdownList
                    data={jenkinsList}
                    value={jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]}
                    valueField="id"
                    textField="name"
                    placeholder="Please select an account"
                    filter="contains"
                    onChange={handleJenkinsChange}
                  />
                </>
              ) : (
                <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                    No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.
                    Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
                    proceed.
                  </div>
                </>
              )}
            </>
          )}
          {formData.toolConfigId && formData.toolConfigId.length > 0 && (
            <Form.Label className="mt-2 pl-1">
              <Link to={"/inventory/tools/details/" + formData.toolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit this tool&apos;s Registry settings
              </Link>
            </Form.Label>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Type*</Form.Label>
          {jobType !== undefined ? (
            <DropdownList
              data={JOB_OPTIONS}
              valueField="id"
              textField="label"
              value={JOB_OPTIONS[JOB_OPTIONS.findIndex((x) => x.value === jobType)]}
              filter="contains"
              placeholder="Please select an account"
              onChange={handleJobTypeChange}
            />
          ) : null}
        </Form.Group>

        {jobType === "job" ? (
          <Form.Group controlId="branchField">
            <Form.Label>Job Name*</Form.Label>
            <Form.Control
              maxLength="150"
              disabled={false}
              type="text"
              placeholder=""
              value={formData.jobName || ""}
              onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
            />
          </Form.Group>
        ) : (
          <>
            {jobType === "opsera-job" && (
              <>
                {formData.jenkinsUrl && jenkinsList.length > 0 && jobsList.length > 0 && (
                  <>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="w-100">
                      Job*
                      <OverlayTrigger
                        trigger="click"
                        rootClose
                        placement="left"
                        overlay={RegistryPopover(jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)])}
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          className="fa-pull-right pointer pr-1"
                          onClick={() => document.body.click()}
                        />
                      </OverlayTrigger>
                    </Form.Label>
                    {jobsList.length < 1 && (
                      <div className="form-text text-muted p-2">
                        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                        No jobs have been created for <span>{formData.jenkinsUrl}</span>. Please go to
                        <Link to={"/inventory/tools/details/" + formData.toolConfigId}> Tool Registry</Link> and add credentials
                        and register a job for this Jenkins in order to proceed.{" "}
                      </div>
                    )}
                    {jobsList !== undefined && jobsList.length > 0 && jobsList.length > 0  ? (
                      <DropdownList
                        data={jobsList}
                        valueField="id"
                        textField="name"
                        defaultValue={
                          jobsList &&
                          jobsList.length > 0 &&
                          jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)]
                        }
                        filter="contains"
                        onChange={handleJobChange}
                      />
                    ) : null}
                  </Form.Group>  
                  </>
                )}
              </>
            )}

            <SFDCConfiguration
              plan={plan}
              pipelineId={pipelineId}
              stepId={stepId}
              step={step}
              show={show}
              setShow={setShow}
              save={save}
              setSave={setSave}
              renderForm={renderForm}
              jobType={jobType}
              jenkinsList={jenkinsList}
              accountsList={accountsList}
              formData={formData}
              setFormData={setFormData}
              setToast={setToast}
              setShowToast={setShowToast}
              saveConfig={saveConfig}
            />

            {formData.jenkinsUrl && jenkinsList.length > 0 && formData.jobType && formData.jobType.length > 0 && (
              <>
                {formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
                  formData.jobType != "SFDC UNIT TESTING" &&
                  formData.jobType != "SFDC DEPLOY" &&
                  !formData.isOrgToOrg && (
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="w-100">
                        Account*
                      </Form.Label>
                      {accountsList.length < 1 && (
                        <div className="form-text text-muted p-2">
                          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                          No Credentials have been created for <span>{formData.jenkinsUrl}</span>. Please go to
                          <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in
                          order to proceed.
                        </div>
                      )}
                      {accountsList !== undefined && accountsList.length > 0 ? (
                        <DropdownList
                          data={accountsList}
                          valueField="gitCredential"
                          textField="gitCredential"
                          defaultValue={
                            accountsList &&
                            accountsList.length > 0 &&
                            accountsList[accountsList.findIndex((x) => x.gitCredential === formData.gitCredential)]
                          }
                          filter="contains"
                          onChange={handleAccountChange}
                        />
                      ) : null}
                    </Form.Group>
                  )}

              {formData.service && formData.service === "bitbucket" && 
              formData.gitToolId &&
              formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
              formData.jobType != "SFDC UNIT TESTING" &&
              formData.jobType != "SFDC DEPLOY" && !formData.isOrgToOrg && (
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
                      <DropdownList
                        data={workspacesList}
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
                        onChange={handleWorkspacesChange}
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

            {formData.service &&
              formData.gitToolId &&
              formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
              formData.jobType != "SFDC UNIT TESTING" &&
              formData.jobType != "SFDC DEPLOY" &&
              (formData.service === "bitbucket"? 
                formData.workspace 
                && formData.workspace.length > 0 : true ) && 
              !formData.isOrgToOrg && (
                <Form.Group controlId="account" className="mt-2">
                  <Form.Label>Repository*</Form.Label>
                  {isRepoSearching ? (
                    <div className="form-text text-muted mt-2 p-2">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      Loading repositories from registry
                    </div>
                  ) : (
                    <>
                      {repoList ? (
                        <DropdownList
                          data={repoList}
                          value={repoList[repoList.findIndex((x) => x.name === formData.repository)]}
                          valueField="value"
                          textField="name"
                          filter="contains"
                          onChange={handleRepoChange}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      )}
                    </>
                  )}
                  {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
                </Form.Group>
              )}

            {formData.service &&
              formData.gitToolId &&
              formData.repoId &&
              formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
              formData.jobType != "SFDC UNIT TESTING" &&
              formData.jobType != "SFDC DEPLOY" &&
              formData.jobType != "SFDC BACK UP" &&
              formData.jobType != "SFDC PUSH ARTIFACTS" &&
              !formData.isOrgToOrg && (
                <>
                <Form.Group controlId="account" className="mt-2">
                  <Form.Label>Branch*</Form.Label>
                  {isBranchSearching ? (
                    <div className="form-text text-muted mt-2 p-2">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      Loading branches from selected repository
                    </div>
                  ) : (
                    <>
                      {branchList && branchList.length > 0 ? (
                        <DropdownList
                          data={branchList}
                          value={branchList[branchList.findIndex((x) => x.value === formData.branch)]}
                          valueField="value"
                          textField="name"
                          filter="contains"
                          onChange={handleBranchChange}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
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

              
              {formData.jobType === "SFDC BACK UP" && (
                <>
                  <OverlayTrigger
                    placement="left"
                    overlay={renderTooltip("Check this option if back up should be pushed to a branch name of your choice.")}
                    >
                    <Form.Group controlId="formBasicCheckboxIsManualRollBackBranch" className="mt-4 ml-1">
                        <Form.Check
                          type="checkbox"
                          label="Configure Branch Name"
                          checked={formData.isManualRollBackBranch ? formData.isManualRollBackBranch : false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isManualRollBackBranch: e.target.checked,
                            })
                          }
                        /> 
                    </Form.Group>
                  </OverlayTrigger>
                  {formData.isManualRollBackBranch &&
                    <Form.Group controlId="branchName">
                      <Form.Label>Rollback Branch Name*</Form.Label>
                      <Form.Control
                        maxLength="50"
                        type="text"
                        placeholder=""
                        value={formData.rollbackBranchName || ""}
                        onChange={(e) => setFormData({ ...formData, rollbackBranchName: e.target.value })}
                      />
                      <Form.Text className="text-muted">An Orphan branch will be created with only the back up specific files.</Form.Text>
                    </Form.Group>
                  }
                </>
                )}
                
              {formData.jobType === "SFDC PUSH ARTIFACTS" && (
                <>
                {/* isNewBranch -> flag to decide if the branch is a new branch (true) or existing branch (false)
                    artifact branch name -> we can use existing field itself
                    hasUpstreamBranch -> flag to denote if source branch is configured (true) or not (false)
                    upstreamBranch -> contains the upstream branch name
                */}
                  <Form.Group controlId="isNewBranch">
                    <Form.Check inline
                      type="checkbox"
                      label={"Create a new backup branch?"}
                      id={`newBranch`}
                      checked={formData.isNewBranch}
                      onChange={handleCreateNewBranchFlag}
                    />
                    <Form.Text className="text-muted">Creates a new branch and push the artifacts.</Form.Text>
                  </Form.Group>
                
                  {formData.isNewBranch ? 
                  <>
                    <Form.Group controlId="gitBranchName">
                      <Form.Label>Branch Name*</Form.Label>
                      <Form.Control
                        maxLength="50"
                        type="text"
                        placeholder=""
                        value={formData.gitBranch || ""}
                        onChange={(e) => setFormData({ ...formData, gitBranch: e.target.value })}
                      />
                    </Form.Group>
                  
                    <Form.Group controlId="isNewBranch">
                      <Form.Check inline
                        type="checkbox"
                        label={"Use an upstream branch?"}
                        id={`hasUpstreamBranch`}
                        checked={formData.hasUpstreamBranch}
                        onChange={(e) => setFormData({ ...formData, hasUpstreamBranch: e.target.checked })}
                      />
                      <Form.Text className="text-muted">Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts.
                        If no upstream branch is configured, then the new Artifact branch is created as an Orphan branch, having only the artifact files and no commit history. </Form.Text>
                    </Form.Group>

                    {formData.hasUpstreamBranch && 
                    <Form.Group controlId="account" className="mt-2">
                      <Form.Label>Select Upstream Branch*</Form.Label>
                      {isBranchSearching ? (
                        <div className="form-text text-muted mt-2 p-2">
                          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                          Loading branches from selected repository
                        </div>
                      ) : (
                        <>
                          {branchList && branchList.length > 0 ? (
                            <DropdownList
                              data={branchList}
                              value={branchList[branchList.findIndex((x) => x.value === formData.upstreamBranch)]}
                              valueField="value"
                              textField="name"
                              filter="contains"
                              onChange={handleUpstreamBranchChange}
                            />
                          ) : (
                            <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                          )}
                        </>
                      )}
                      {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
                    </Form.Group>
                  }
                  </> 
                  :
                  <Form.Group controlId="account" className="mt-2">
                    <Form.Label>Branch*</Form.Label>
                    {isBranchSearching ? (
                      <div className="form-text text-muted mt-2 p-2">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                        Loading branches from selected repository
                      </div>
                    ) : (
                      <>
                        {branchList && branchList.length > 0 ? (
                          <DropdownList
                            data={branchList}
                            value={branchList[branchList.findIndex((x) => x.value === formData.branch)]}
                            valueField="value"
                            textField="name"
                            filter="contains"
                            onChange={handleBranchChange}
                          />
                        ) : (
                          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                        )}
                      </>
                    )}
                    {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
                  </Form.Group>
                  }                

                  <Form.Group controlId="xmlStep">
                    <Form.Label>Build/Xml Step Info*</Form.Label>
                    {listOfSteps ? (
                      <DropdownList
                        data={listOfSteps}
                        value={
                          formData.stepIdXML
                            ? listOfSteps[
                                listOfSteps.findIndex(
                                  (x) => x._id === formData.stepIdXML
                                )
                              ]
                            : listOfSteps[0]
                        }
                        valueField="_id"
                        textField="name"
                        defaultValue={
                          formData.stepIdXML
                            ? listOfSteps[
                                listOfSteps.findIndex(
                                  (x) => x._id === formData.stepIdXML
                                )
                              ]
                            : listOfSteps[0]
                        }
                        onChange={handleBuildStepChange}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="text-muted ml-2"
                        fixedWidth
                      />
                    )}
                  </Form.Group>
                </>
                )}

                {formData.buildType === "docker" && (
                  <>
                  <Form.Group controlId="dockerName">
                    <Form.Label>Docker Name*</Form.Label>
                    <Form.Control
                      maxLength="256"
                      type="text"
                      placeholder=""
                      value={formData.dockerName || ""}
                      onChange={(e) =>{
                        const regex = RegExp("^[ a-z0-9_.-]*$");
                        if (!regex.test(e.target.value)) {
                          setFormData({ ...formData, dockerName: e.target.value });
                          setDockerNameErr(true);
                          return;
                        }
                        setDockerNameErr(false);
                        setFormData({ ...formData, dockerName: e.target.value });
                      }}
                    />
                     {dockerNameErr ? 
                      <Form.Control.Feedback type="invalid">
                      Please provide a valid docker name.
                      </Form.Control.Feedback> : 
                     <Form.Text className="text-muted">
                       Accepts lowercase alphanumeric characters, periods, dashes, and underscores without spaces.
                      </Form.Text>
                    }
                  </Form.Group>
                  <Form.Group controlId="dockerTag">
                    <Form.Label>Docker Tag*</Form.Label>
                    <Form.Control
                      maxLength="256"
                      type="text"
                      placeholder=""
                      value={formData.dockerTagName || ""}
                      onChange={(e) =>{
                        const regex = RegExp("^[ a-z0-9_.-]*$");
                        if (!regex.test(e.target.value)) {
                          setFormData({ ...formData, dockerTagName: e.target.value });
                          setDockerTagErr(true);
                          return;
                        }
                        setDockerTagErr(false);
                        setFormData({ ...formData, dockerTagName: e.target.value });
                      }}
                    />
                    {dockerTagErr ? 
                      <Form.Control.Feedback type="invalid">
                      Please provide a valid docker tag.
                      </Form.Control.Feedback> : 
                     <Form.Text className="text-muted">
                       Accepts lowercase alphanumeric characters, periods, dashes, and underscores without spaces.
                      </Form.Text>
                    }
                      
                  </Form.Group>
                  <Form.Group controlId="dockerPath">
                    <Form.Label>Docker File Path</Form.Label>
                    <Form.Control
                      maxLength="256"
                      type="text"
                      placeholder=""
                      value={formData.dockerPath || ""}
                      onChange={(e) => setFormData({ ...formData, dockerPath: e.target.value })}
                    />
                  </Form.Group>

                  {/* docker params optional */}                  
                  <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="left"
                    overlay={
                      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
                        <Popover.Title as="h3">Build Arguments</Popover.Title>

                        <Popover.Content>
                          <div className="text-muted mb-2">
                            Enter Runtime Build arguments as a key value pair JSON. You can add any number of runtime arguments to the
                            JSON Object. Sample: {" { Key1: Value1, Key2: value2 }"}
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className="fa-pull-right pointer pr-1"
                      onClick={() => document.body.click()}
                    />
                  </OverlayTrigger>
                  <div className="form-group m-2">
                    <label>Build Arguments (Optional)</label>
                    <div style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}>
                      <JSONInput
                        placeholder={
                            formData.buildArgs && Object.keys(formData.buildArgs).length > 0
                            ? formData.buildArgs
                            : undefined
                        }
                        value={formData.buildArgs ? formData.buildArgs : {}}
                        onChange={(e) => handleJsonInputUpdate(e)}
                        theme="light_mitsuketa_tribute"
                        locale={locale}
                        height="175px"
                      />
                    </div>
                  </div>
                  <small className="form-text text-muted form-group m-2 text-left">
                    Enter runtime build arguments as a JSON Object
                  </small>                  
                  <DockerSecretsInput 
                    setDataObject={setDataObject} 
                    dataObject={dataObject}
                    deleteDockerSecrets={deleteDockerSecrets}
                    setDeleteDockerSecrets={setDeleteDockerSecrets}
                    addSecret={deleteDockerSecrets || _.isEmpty(formData.dockerBuildPathJson)}
                  />
                  {/* { deleteDockerSecrets || _.isEmpty(formData.dockerBuildPathJson) ? (                    
                    <DockerSecretsInput 
                      setDataObject={setDataObject} 
                      dataObject={dataObject}
                      deleteDockerSecrets={deleteDockerSecrets}
                      setDeleteDockerSecrets={setDeleteDockerSecrets}
                    />
                  ) : (
                    <div className="form-group m-2">
                      <label>Secrets</label>
                      { formData.dockerSecretKeys.length > 0 && 
                        formData.dockerSecretKeys.map((secret, index) => {
                          return (
                            <div className="d-flex my-2 justify-content-between" key={index}>
                              <Col sm={12}>
                                <Row>
                                  <Col sm={6} className={"pl-1 pr-0"}>
                                    <input
                                      className="form-control"
                                      type={"text"}                              
                                      placeholder={"Name"}                              
                                      maxLength={30}
                                      disabled={true}
                                      value={secret.name}                                    
                                    />
                                  </Col>
                                  <Col sm={6} className={"pl-1 pr-0"}>
                                    <textarea
                                      style={{WebkitTextSecurity: 'disc'}}
                                      rows={3}
                                      disabled={true}
                                      value={secret.value}                                      
                                      className="form-control"
                                      placeholder={"Value"}
                                    />                                    
                                  </Col>
                                </Row>
                              </Col>                            
                            </div>
                          );                          
                        })
                      }                      
                      <small className="form-text text-muted form-group m-2 text-left">
                        Please delete the existing secrets to add new secrets
                      </small>                      
                      <div className="bottom-zoom-btns">
                        <Button size="sm" variant="light" onClick={() => { setDeleteDockerSecrets(true);
                          }}>Delete Secrets</Button>
                      </div>                      
                    </div>
                  )}                   */}
                  </>
                )}                
                {(formData.buildType === "python") && (
                  <>
                    <BooleanToggleInput 
                      dataObject={pythonScriptData} 
                      setDataObject={setPythonScriptData} 
                      fieldName={"customScript"} 
                    />
                    { pythonScriptData.getData("customScript") ? (
                      <>
                        <StepConfigUseTerraformOutput dataObject={pythonScriptData} setDataObject={setPythonScriptData} fieldName={"useTerraformOutput"} plan={plan} stepId={stepId}/>
                        {getTerraformSelect()}
                        <ParameterSelectListInputBase
                          titleIcon={faHandshake}
                          dataObject={pythonScriptData}
                          setDataObject={setPythonScriptData}
                          fieldName={"customParameters"}
                          allowIncompleteItems={true}
                          type={"Parameter"}
                          regexValidationRequired={false}
                          titleText={"Parameter Selection"}
                          plan={plan}
                          tool_prop={pythonScriptData?.getData("terraformStepId") && pythonScriptData?.getData("terraformStepId").length > 0 ?
                            pythonScriptData?.getData("terraformStepId") : ""}
                        />
                        <TextAreaInput 
                          dataObject={pythonScriptData}                         
                          setDataObject={setPythonScriptData}
                          fieldName={"commands"} 
                        />
                      </>
                    ) : (
                      <PythonFilesInput 
                        setDataObject={setPythonScriptData} 
                        dataObject={pythonScriptData}
                        fieldName={"inputDetails"}
                      />
                    ) }                    
                  </>                  
                )}

                {/* gradle and maven specific attributes */}
                {(formData.buildType === "gradle" || formData.buildType === "maven") && (
                  <>
                   <Form.Group controlId="inputFilePath">
                      <Form.Label>Script File Path</Form.Label>
                      <Form.Control
                        maxLength="256"
                        type="text"
                        placeholder=""
                        value={formData.inputFilePath || ""}
                        onChange={(e) =>{
                          setFormData({ ...formData, inputFilePath: e.target.value });
                        }}
                      />
                      
                    </Form.Group>
                    <Form.Group controlId="inputFileName">
                      <Form.Label>Script File Name</Form.Label>
                      <Form.Control
                        maxLength="256"
                        type="text"
                        placeholder=""
                        value={formData.inputFileName || ""}
                        onChange={(e) =>{
                          setFormData({ ...formData, inputFileName: e.target.value });
                        }}
                      />
                      <Form.Text>File name with extension is expected.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="outputPath">
                      <Form.Label>Output File Path</Form.Label>
                      <Form.Control
                        maxLength="256"
                        type="text"
                        placeholder=""
                        value={formData.outputPath || ""}
                        onChange={(e) =>{
                          setFormData({ ...formData, outputPath: e.target.value });
                        }}
                      />
                      
                    </Form.Group>
                    <Form.Group controlId="outputFileName">
                      <Form.Label>Output File Name</Form.Label>
                      <Form.Control
                        maxLength="256"
                        type="text"
                        placeholder=""
                        value={formData.outputFileName || ""}
                        onChange={(e) =>{
                          setFormData({ ...formData, outputFileName: e.target.value });
                        }}
                      />
                      <Form.Text>File name with extension is expected.</Form.Text>
                    </Form.Group>
                  </>
                )}
              </>
            )}
          </>
        )}

        {jobType === "opsera-job" ? (
          <Row className="mx-1 py-2">
          <div className="d-flex mx-1 px-1">
            <Button
              variant="primary"
              type="button"
              size="sm" 
              onClick={() => {
                handleCreateAndSave(pipelineId, stepId, formData.toolConfigId);
              }}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Working
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="mr-1" />
                  Create Job and Save
                </>
              )}
            </Button>
          </div>
          <CloseButton isLoading={loading} closeEditorCallback={closeEditorPanel} />
          </Row>
        ) : (
          <Row className="mx-1 py-2">
          <div className="d-flex mx-1 px-1">
            <Button
              variant="primary"
              type="button"
              size="sm" 
              onClick={() => {
                callbackFunction();
              }}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Saving
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
                </>
              )}
            </Button>
          </div>
          <CloseButton isLoading={loading} closeEditorCallback={closeEditorPanel} />
          </Row>
        )}

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

JenkinsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  createJob: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  callbackGetFromVault: PropTypes.func,
  callbackDeleteFromVault: PropTypes.func
};

export default JenkinsStepConfiguration;
