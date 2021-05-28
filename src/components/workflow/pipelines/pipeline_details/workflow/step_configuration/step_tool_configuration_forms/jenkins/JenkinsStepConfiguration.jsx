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
import locale from "react-json-editor-ajrm/locale/en";
import CloseButton from "../../../../../../../common/buttons/CloseButton";

import DockerSecretsInput from "./DockerSecretsInput";
import PythonFilesInput from "./PythonFilesInput";
import Model from "core/data_model/model";
import _ from "lodash";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import jenkinsPipelineStepConfigurationMetadata from "./jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsStepConfigTool from "./inputs/jenkinsStepConfigTool";
import JenkinsStepConfigJobType from "./inputs/jenkinsStepConfigJobType";
import JenkinsStepConfigJobName from "./inputs/jenkinsStepConfigJobName";
import JenkinsStepConfigToolJobId from "./inputs/jenkinsStepConfigToolJobId";
import JenkinsStepConfGitCredential from "./inputs/jenkinsStepConfGitCredeintail";
import JenkinsStepConfWorkspaceProjectInput from "./inputs/jenkinsStepConfWorkspaceProjectInput";
import JenkinsStepConfRepository from "./inputs/jenkinsStepConfRepository";
import JenkinsStepConfBranch from "./inputs/jenkinsStepConfBranch";
import JenkinsStepConfPython from "./inputs/jenkinsStepConfPython";
import JenkinsStepConfGradleMavenScriptFilePath from "./inputs/jenkinsStepConfGradleMavenScriptFilePath";

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
  agentLabels: "",
  autoScaleEnable: "",
  dockerBuildPathJson: {},
  dockerSecretKeys: [],
  customScript: false,
  inputDetails: [],
  commands: "",
  isManualRollBackBranch: false
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

  const [jenkinsStepConfigurationDto, setJenkinsStepConfigurationDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  let step = {};

  let stepArrayIndex = plan.findIndex(x => x._id === stepId);
  if (stepArrayIndex > 0) {
    step = plan[stepArrayIndex];
  }

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
      setIsLoading(true);
      // Set results state
      let results = await pipelineActions.getToolsList(service, getAccessToken);
      if (typeof (results) != "object") {
        setJenkinsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Jenkins information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsLoading(false);
        return;
      }
      const filteredList = results.filter(
        (el) => el.configuration !== undefined,
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setJenkinsList(filteredList);
        setIsLoading(false);
      }
    }
    fetchJenkinsDetails("jenkins");

    setDataObject(new Model({ dockerSecrets: [] }, {
      fields: [
        {
          label: "Docker Secrets",
          id: "dockerSecrets"
        }
      ]
    }, true));

    setPythonScriptData(new Model({ inputDetails: [] }, {
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
        }
      ]
    }, true));

  }, []);

  const loadFormData = async (step) => {
    let { configuration, threshold, job_type } = step;
    let stepToolNew = null;
    if (typeof configuration !== "undefined") {
      stepToolNew = { configuration: { ...configuration, jenkinsJobType: '' } };

      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
      if (typeof job_type !== "undefined") {
        stepToolNew.configuration.jenkinsJobType = job_type;
        setJobType(job_type);

      } else {
        stepToolNew.configuration.jenkinsJobType = '';
      }

    } else {
      setFormData(INITIAL_DATA);
    }
    let configureData = modelHelpers.getPipelineStepConfigurationModel(stepToolNew, jenkinsPipelineStepConfigurationMetadata);
    setJenkinsStepConfigurationDto(configureData);

  };
  const callbackFunction = async () => {
    console.log("saving data");
    //if (validateRequiredFields()) {
    setIsLoading(true);

    const item = {
      configuration: jenkinsStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: jenkinsStepConfigurationDto.data.jenkinsJobType,
    };
    console.log("item: ", item);
    setIsLoading(false);
    parentCallback(item);
    // }
  };

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



  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={jenkinsStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >

      <JenkinsStepConfigTool dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto}
        jenkinsList={jenkinsList} renderForm={renderForm} setToast={setToast}
        setShowToast={setShowToast} setAccountsList={setAccountsList} setJobsList={setJobsList} />
      <JenkinsStepConfigJobType dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} setShowToast={setShowToast} />
      <JenkinsStepConfigJobName dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
      <JenkinsStepConfigToolJobId dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} jobsList={jobsList} />
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
        jobType={jenkinsStepConfigurationDto?.data.jenkinsJobType}
        jenkinsList={jenkinsList}
        accountsList={accountsList}
        formData={formData}
        setFormData={setFormData}
        setToast={setToast}
        setShowToast={setShowToast}
        saveConfig={saveConfig}
      />
      <JenkinsStepConfGitCredential dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} jobsList={jobsList} accountsList={accountsList} />
      <JenkinsStepConfWorkspaceProjectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} jobsList={jobsList} accountsList={accountsList} />
      <JenkinsStepConfRepository dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
      <JenkinsStepConfBranch dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} />
      <JenkinsStepConfPython dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
      <JenkinsStepConfGradleMavenScriptFilePath dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />

    </PipelineStepEditorPanelContainer>
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
