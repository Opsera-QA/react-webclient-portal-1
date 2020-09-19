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
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../common/status_notifications/error";
import JUnitStepConfiguration from "./JUnitStepConfiguration";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog
} from "../../../../../../common/toasts/toasts";

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
      let results = await searchToolsList(service);
      //console.log(results);
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
      let results = await searchToolsList(service);
      //console.log(results);
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

    // setFormData({ ...formData, branch : "" });
    async function fetchRepos(service, gitToolId) {
      setIsRepoSearching(true);
      // Set results state
      let results = await searchRepositories(service, gitToolId);
      if (results) {
        //console.log(results);
        setRepoList(results);
        setIsRepoSearching(false);
      }
    }

    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.gitToolId &&
      formData.gitToolId.length > 0
    ) {
      // Fire off our API call
      fetchRepos(formData.service, formData.gitToolId);
    } else {
      setIsRepoSearching(true);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.gitToolId, formData.gitCredential]);

  // fetch branches
  useEffect(() => {
    setShowToast(false);

    // setFormData({ ...formData, branch : "" });
    async function fetchBranches(service, gitToolId, repoId) {
      setIsBranchSearching(true);
      // Set results state
      let results = await searchBranches(service, gitToolId, repoId);
      if (results) {
        //console.log(results);
        setBranchList(results);
        setIsBranchSearching(false);
      }
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
      fetchBranches(formData.service, formData.gitToolId, formData.repoId);
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
    if (formData.toolJobType && formData.toolJobType.includes("SFDC")) {
      setFormData({ ...formData, buildType: "ant" });
    }
  }, [formData.toolJobType]);

  console.log(formData);
  // console.log(jobsList);

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
          stepId: formData.stepIdXML && formData.stepIdXML,
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

  //TODO: Refactor this into actions.jsx
  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        //console.log(respObj);
        return respObj;
      } else {
        let errorMessage = "Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.";
        let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
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
    console.log(selectedOption)
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
      branch: "",
      projectId: "",
      defaultBranch: "",
    });
  };

  const handleRepoChange = (selectedOption) => {
    setFormData({
      ...formData,
      repository: selectedOption.name,
      repoId: selectedOption.id,
      projectId: selectedOption.id,
      gitUrl: selectedOption.httpUrl,
      sshUrl: selectedOption.sshUrl,
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

  //todo: the api needs to be moved to actions.jsx
  const searchRepositories = async (service, gitAccountId) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getRepositories",
      gitAccountId: gitAccountId,
    };
    //console.log(postBody);
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        return arrOfObj;
      } else {
        let toast = getServiceUnavailableDialog(setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  //todo: the api needs to be moved to actions.jsx
  const searchBranches = async (service, gitAccountId, repoId) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getBranches",
      gitAccountId: gitAccountId,
      repoId: repoId,
    };
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (arrOfObj) {
          var result = arrOfObj.map(function (el) {
            var o = Object.assign({});
            o.value = el.toLowerCase();
            o.name = el;
            return o;
          });
          return result;
        }
      } else {
        let toast = getServiceUnavailableDialog(setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
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
              <Link to={"/inventory/tools/" + formData.toolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit
                this tool's Registry settings
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
                    <Link to={"/inventory/tools/" + formData.toolConfigId}>
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

        {formData.jenkinsUrl && jenkinsList.length > 0 && (
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="w-100">
              Account*
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={RegistryPopover(
                  accountsList[
                    accountsList.findIndex(
                      (x) => x.gitCredential === formData.gitCredential
                    )
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
            {accountsList.length < 1 && (
              <div className="form-text text-muted p-2">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-muted mr-1"
                  fixedWidth
                />
                No Credentials have been created for{" "}
                <span>{formData.jenkinsUrl}</span>. Please go to
                <Link to="/inventory/tools"> Tool Registry</Link> and add
                credentials for this Jenkins in order to proceed.
              </div>
            )}
            {accountsList !== undefined && accountsList.length > 0 ? (
              <DropdownList
                data={accountsList}
                valueField="gitCredential"
                textField="gitCredential"
                defaultValue={
                  accountsList && accountsList.length > 0 &&
                  accountsList[
                    accountsList.findIndex(
                      (x) => x.gitCredential === formData.gitCredential
                    )
                  ]
                }
                filter="contains"
                onChange={handleAccountChange}
              />
            ) : null}
          </Form.Group>
        )}

        {formData.service && formData.gitToolId && (
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
                  <DropdownList
                    data={repoList}
                    value={
                      repoList[
                        repoList.findIndex(
                          (x) => x.name === formData.repository
                        )
                      ]
                    }
                    valueField="value"
                    textField="name"
                    filter="contains"
                    onChange={handleRepoChange}
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
                  <DropdownList
                    data={branchList}
                    value={
                      branchList[
                        branchList.findIndex((x) => x.value === formData.branch)
                      ]
                    }
                    valueField="value"
                    textField="name"
                    filter="contains"
                    onChange={handleBranchChange}
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
{/* 
        {formData.jobType === "VALIDATE PACKAGE XML" ? (
          <Form.Group controlId="s3Step">
            <Form.Label>Generate XML Step Info*</Form.Label>
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
                filter="contains"
                onChange={handleXMLStepChange}
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
        ) : (
          <></>
        )} */}

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
}

export default DockerPushStepConfiguration;
