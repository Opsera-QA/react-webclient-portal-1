import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../../common/status_notifications/error";
import JUnitStepConfiguration from "../junit/JUnitStepConfiguration";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog
} from "../../../../../../../common/toasts/toasts";

import pipelineActions from "components/workflow/pipeline-actions";
import { DialogToastContext, showServiceUnavailableDialog } from "contexts/DialogToastContext";
import {jenkinsAgentArray} from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";

const JOB_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" }
];

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
  
  // agentLabels : "",
 
  accountUsername: "",
  projectId: "",
  defaultBranch: "",
  dockerName: "",
  dockerTagName: "",
  buildStepId: "", //this will have docker name and tag

  buildType: "", //hardcoded now but needs to get it from a dropdown
  gitToolId: "",
  repoId: "",
  gitUrl: "",
  sshUrl: "",
  service: "",
  gitCredential: "",
  gitUserName: "",
  repository: "",
  branch: "",
  workspace: "",
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function DockerPushStepConfiguration({
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
  const contextType = useContext(AuthContext);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jobType, setJobType] = useState("");
  
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);


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
    if (jobType === "job") {
      setFormData({ ...formData, jobType : "DOCKER PUSH" });
    }
  }, [jobType]);

  useEffect(() => {
    setShowToast(false);

    async function fetchJenkinsDetails(service) {
      setisJenkinsSearching(true);
      // Set results state
      let results = await pipelineActions.getToolsList(service, getAccessToken);
      //console.log(results);
      if (typeof(results) != "object") {
        setJenkinsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Jenkins information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setisJenkinsSearching(false);
        return;
      }
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setJenkinsList(filteredList);
        setisJenkinsSearching(false);
      }
    }

    // Fire off our API call
    fetchJenkinsDetails("jenkins");
  }, []);

  // search aws
  useEffect(() => {
    setShowToast(false);

    async function fetchAWSDetails(service) {
      setIsAwsSearching(true);
      // Set results state
      let results = await pipelineActions.getToolsList(service, getAccessToken);
      //console.log(results);
      if (typeof(results) != "object") {
        setAwsList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "AWS information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsAwsSearching(false);
        return;
      }
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setAwsList(filteredList);
        setIsAwsSearching(false);
      }
    }

    // Fire off our API call
    fetchAWSDetails("aws_account");
  }, []);

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
    if (formData.toolConfigId) {
      // console.log(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
      setAccountsList(
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ] ? 
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ].accounts : []
      );
    }
  }, [jenkinsList, formData.toolConfigId]);

  useEffect(() => {
    if (formData.toolConfigId) {
      setJobsList(
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ] ? 
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ].jobs : []
      );
    }
  }, [jenkinsList, formData.toolConfigId]);

  useEffect(() => {
    if (jobsList && jobsList.length > 0 && formData.toolJobId && formData.toolJobId.length > 0 && !jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)]) {
     let toast = getErrorDialog(
        "Preselected job is no longer available.  It may have been deleted.  Please select another job from the list or recreate the job in the Registry.",
        setShowToast,
        "detailPanelTop"
      );
      setToast(toast);
      setShowToast(true);
      return;
    }
    setShowToast(false);
  }, [jobsList, formData.toolJobId]);

  useEffect(() => {
    if (formData.toolJobType && formData.toolJobType.includes("SFDC")) {
      setFormData({ ...formData, buildType: "ant" });
    }
  }, [formData.toolJobType]);


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

  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });
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

    if(jobType === "job") {
      if(jobName.length === 0) {
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    }
    else  {
    if (
      toolConfigId.length === 0 ||
      jenkinsUrl.length === 0 ||
      jUserId.length === 0 ||
      jAuthToken.length === 0
      // jobName.length === 0 ||
      // (buildType === "docker"
      //   ? dockerName.length === 0 || dockerTagName.length === 0
      //   : false)
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

  //todo: can this use the initial value const above to reset everything?  Right now this means we have ot maintain the values in two places.
  const handleJenkinsChange = (selectedOption) => {
    setLoading(true);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        toolConfigId: selectedOption.id,
        jenkinsUrl: selectedOption.configuration.jenkinsUrl,
        jUserId: selectedOption.configuration.jUserId,
        jenkinsPort: selectedOption.configuration.jenkinsPort,
        jAuthToken: selectedOption.configuration.jAuthToken,
        gitToolId: "",
        repoId: "",
        gitUrl: "",
        sshUrl: "",
        service: "",
        gitCredential: "",
        gitUserName: "",
        repository: "",
        workspace:"",
        branch: "",
        toolJobId: "",
        toolJobType: "",
        accountUsername: "",
        projectId: "",
        defaultBranch: "",
      });
    }
    if (selectedOption.accounts && selectedOption.jobs) {
      setAccountsList(selectedOption.accounts);
      setJobsList(selectedOption.jobs);
    }
    setLoading(false);
  };

  const handleAWSChange = (selectedOption) => {
    setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        awsToolConfigId: selectedOption.id ? selectedOption.id : "",
        awsAccountId: selectedOption.configuration
          ? selectedOption.configuration.awsAccountId
          : "",
        accessKey: selectedOption.configuration
          ? selectedOption.configuration.accessKey
          : "",
        secretKey: selectedOption.configuration
          ? selectedOption.configuration.secretKey
          : "",
        regions: selectedOption.configuration
          ? selectedOption.configuration.regions
          : "",
      });
    }
    setLoading(false);
  };

  const handleJobChange = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption.type[0] === "DOCKER PUSH" ) {      
        setFormData({
          ...formData,
          toolJobId: selectedOption._id,
          toolJobType: selectedOption.type,
          jobType: selectedOption.type[0],
          ...selectedOption.configuration,
          buildToolVersion: "6.3",
          projectKey:"",
          buildArgs: {},
        });
    } else {
      let errorMessage = "Selected Job is not a Docker push Job!  Please ensure the selected job has Docker configurations.";
      let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };


  const handleJobTypeChange = (selectedOption) => {
    setShowToast(false);
    setJobType(selectedOption.value);
      setFormData({
        ...formData,
        awsToolConfigId: "",
        jobName: "",
        buildType: "", 
        jobDescription: "",
        jobType: "",
        toolJobId: "",
        toolJobType: "",
      });
  };

  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and
              account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new
              entry to a dropdown or update settings, make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span>{" "}
                          {a[1]}
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
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Please select any tool/account to get the details.
            </div>
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
            Step Tool*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(
                jenkinsList[
                  jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
                ]
              )}
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
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted mr-1"
                fixedWidth
              />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {renderForm && jenkinsList && jenkinsList.length > 0 ? (
                <>
                  <DropdownList
                    data={jenkinsList}
                    value={
                      jenkinsList[
                        jenkinsList.findIndex(
                          (x) => x.id === formData.toolConfigId
                        )
                      ]
                    }
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
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    No accounts have been registered for{" "}
                    <span className="upper-case-first">{formData.service}</span>
                    . Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an
                    entry for this repository in order to proceed.
                  </div>
                </>
              )}
            </>
          )}
          {formData.toolConfigId && formData.toolConfigId.length > 0 && (
            <Form.Label className="mt-2 pl-1">
              <Link to={"/inventory/tools/details/" + formData.toolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit
                this tool&apos;s Registry settings
              </Link>
            </Form.Label>
          )}
        </Form.Group>

        {/*{(!formData.toolConfigId && formData.jenkinsUrl) &&
      <div className="form-text text-muted mb-3">
        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 yellow" fixedWidth/>
        Unregistered Tool settings in use. The settings below can be used in this step, but cannot be updated. You
        must register
        a new Jenkins server in the
        <Link to="/inventory/tools"> Tool Registry</Link> and add its configuration details. </div>}
*/}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Type*</Form.Label>
          {jobType !== undefined ? (
            <DropdownList
              data={JOB_OPTIONS}
              valueField="id"
              textField="label"
              value={
                JOB_OPTIONS[JOB_OPTIONS.findIndex((x) => x.value === jobType)]
              }
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
              onChange={(e) =>
                setFormData({ ...formData, jobName: e.target.value })
              }
            />
          </Form.Group>
        ) : 
        <>
        {jobType === "opsera-job" && (
          <>
            {formData.jenkinsUrl && jenkinsList.length > 0 && (
              <>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="w-100">
                  Job*
                  <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="left"
                    overlay={RegistryPopover(
                      jobsList[
                        jobsList.findIndex((x) => x._id === formData.toolJobId)
                      ]
                    )}
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
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    No jobs have been created for{" "}
                    <span>{formData.jenkinsUrl}</span>. Please go to
                    <Link to={"/inventory/tools/details/" + formData.toolConfigId}>
                      {" "}
                      Tool Registry
                    </Link>{" "}
                    and add credentials and register a job for this Jenkins in
                    order to proceed.{" "}
                  </div>
                )}
                {jobsList !== undefined && jobsList.length > 0 ? (
                  <DropdownList
                    data={jobsList}
                    valueField="id"
                    textField="name"
                    value={
                      jobsList && jobsList.length > 0 &&
                      jobsList[
                        jobsList.findIndex((x) => x._id === formData.toolJobId)
                      ]
                    }
                    filter="contains"
                    onChange={handleJobChange}
                  />
                ) : null}
              </Form.Group>
              {/* <Form.Group controlId="formJenkinsAgent">
                <Form.Label className="w-100">
                  Jenkins Agent
                </Form.Label>
              
                <DropdownList
                  data={jenkinsAgentArray}
                  groupBy="env"
                  valueField="agentLabel"
                  textField="name"
                  value={jenkinsAgentArray[
                    jenkinsAgentArray.findIndex((x) => x.agentLabel === formData.agentLabels)
                  ]}
                  filter="contains"
                  onChange={(item)=> setFormData({...formData, agentLabels: item.agentLabel }) }
                />
              </Form.Group> */}
            </>
            )}
          </>
        )}

        {(formData.jobType === "DOCKER PUSH" ) && (
          <Form.Group controlId="awsList">
            <Form.Label className="w-100">
              AWS Credentials*
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={RegistryPopover(
                  awsList[
                    awsList.findIndex((x) => x.id === formData.awsToolConfigId)
                  ]
                )}
              >
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="fa-pull-right pointer pr-1"
                  onClick={() => document.body.click()}
                />
              </OverlayTrigger>
            </Form.Label>
            {isAwsSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-muted mr-1"
                  fixedWidth
                />
                Loading AWS accounts from Tool Registry
              </div>
            ) : (
              <>
                {renderForm && awsList && awsList.length > 0 ? (
                  <>
                    <DropdownList
                      data={awsList}
                      value={
                        awsList[
                          awsList.findIndex(
                            (x) => x.id === formData.awsToolConfigId
                          )
                        ]
                      }
                      valueField="id"
                      textField="name"
                      filter="contains"
                      onChange={handleAWSChange}
                    />
                  </>
                ) : (
                  <>
                    <div className="form-text text-muted p-2">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-muted mr-1"
                        fixedWidth
                      />
                      No accounts have been registered for AWS. Please go
                      to
                      <Link to="/inventory/tools">Tool Registry</Link> and add a
                      AWS Account entry in order to proceed.
                    </div>
                  </>
                )}
              </>
            )}
          </Form.Group>
        )}

        <Form.Group controlId="s3Step">
          <Form.Label>Build Step Info*</Form.Label>
          {listOfSteps ? (
            <DropdownList
              data={listOfSteps}
              value={
                formData.buildStepId
                  ? listOfSteps[
                      listOfSteps.findIndex(
                        (x) => x._id === formData.buildStepId
                      )
                    ]
                  : listOfSteps[0]
              }
              valueField="_id"
              textField="name"
              defaultValue={
                formData.buildStepId
                  ? listOfSteps[
                      listOfSteps.findIndex(
                        (x) => x._id === formData.buildStepId
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
                <FontAwesomeIcon icon={faSave} className="mr-1" />
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
                <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
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

DockerPushStepConfiguration.propTypes = {
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

export default DockerPushStepConfiguration;
