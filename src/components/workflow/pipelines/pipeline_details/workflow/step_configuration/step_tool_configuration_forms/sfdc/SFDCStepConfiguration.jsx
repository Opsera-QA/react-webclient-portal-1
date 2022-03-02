import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { faSave, faSpinner, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog
} from "../../../../../../../common/toasts/toasts";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

const SERVICE_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" },
  { value: "bitbucket", label: "Bitbucket" }
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "CREATE PACKAGE XML", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
  
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
 
  // gitToolId: "",
  // gitUserName: "",
  // gitUrl: "",
  // gitBranch: "",
  // gitCredential: "",

  service: "",
  accountId : "",
  username: "",
  password: "",
  repository: "", 
  branch: "",

  jobDescription: "PACKAGEXML_CREATION",

  buildType: "Ant" //hardcoded now but needs to get it from a dropdown
};

// TODO: This needs a heavy refactor
//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SFDCStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setjenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  const [accountList, setAccountList] = useState([]);
  const [isAccountSearching, setIsAccountSearching] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
    

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

  
  useEffect(
    () => {
      setShowToast(false);
      async function fetchJenkinsDetails(service){
        setisJenkinsSearching(true);
        // Set results state
        let results = await searchjenkinsList(service);
        console.log(results);
        const filteredList = results.filter(el => el.configuration !== undefined); //filter out items that do not have any configuration data!
        if(filteredList) {          
          setjenkinsList(formatOptions(filteredList));
          setisJenkinsSearching(false);
        }
      }
      // Fire off our API call
      fetchJenkinsDetails("jenkins");
    },
    []
  );
  


  useEffect(
    () => {
      setShowToast(false);
      // setFormData({ ...formData, accountId: "", username: "", password: "", branch : "" });
      // console.log(formData);
      async function fetchApps(service){
        setIsAccountSearching(true);
        // Set results state
        let results = await searchAccounts(service);
        if(results) {
          setAccountList(formatOptions(results));
          setIsAccountSearching(false);
        }
      }
      if (formData.service && formData.service.length > 0) {
        // Fire off our API call
        fetchApps(formData.service);
      } else {
        setIsAccountSearching(true);
        setAccountList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.service]
  );
  
  useEffect(
    () => {
      setShowToast(false);
      // setFormData({ ...formData, branch : "" });
      async function fetchRepos(service, accountId){
        setIsRepoSearching(true);
        // Set results state
        let results = await searchRepositories(service, accountId);
        if(results) {
          //console.log(results);
          setRepoList(formatOptions(results));
          setIsRepoSearching(false);
        }
      }
      if (formData.service && formData.service.length > 0 && formData.accountId && formData.accountId.length > 0) {
        // Fire off our API call
        fetchRepos(formData.service, formData.accountId);
      } else {
        setIsRepoSearching(true);
        setRepoList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.service, formData.accountId]
  );
  
  const handleAccountChange = (selectedOption) => {
    setFormData({ ...formData, accountId: selectedOption.id ? selectedOption.id : "", username: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",  password: selectedOption.configuration ? selectedOption.configuration.accountPassword : "", repository: "" });
  };
  
  const handleRepoChange = (selectedOption) => {
    setFormData({ ...formData, repository: selectedOption.value, branch: "" });  
  };
 
  const handleServiceChange = (selectedOption) => {
    
    setShowToast(false);
    //setAccountList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
    //setRepoList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
    setFormData({ ...formData, service: selectedOption.value, accountId: "", username: "", password: "", repository: "" });
  };
  
  const searchAccounts = async (service) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/"+service;   // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if( res.data ) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name" : item.name, "id" : item._id, "configuration" : item.configuration });
        });
        return respObj;
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
  
  const searchRepositories = async (service, gitAccountId) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : service,
      metric : "getRepositories",
      gitAccountId: gitAccountId
    };
    //console.log(postBody);
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res.data && res.data.data ) {
        let arrOfObj = res.data.data;
        if(arrOfObj) {
          let result = arrOfObj.map(function(el) {
            let o = Object.assign({});
            o.value = el;
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

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof(configuration) !== "undefined") {

      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }


    } else {
      setFormData(INITIAL_DATA);
    }
  };
  
  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);
   
      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        }
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };
  
  const searchjenkinsList = async (service) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/"+service;   // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if( res.data ) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name" : item.name, "id" : item._id, "configuration" : item.configuration });
        });
        return respObj;
      } else {
        let errorMessage = "Jenkins information is missing or unavailable!  Please ensure the required Jenkins credentials are registered and up to date in Tool Registry.";
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

  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };

  const validateRequiredFields = () => {
    let { toolConfigId, jenkinsUrl, jUserId, jAuthToken, jobName, buildType, dockerName, dockerTagName  } = formData;
    if (
      toolConfigId.length === 0 ||    
      jenkinsUrl.length === 0 || 
      jUserId.length === 0 || 
      jAuthToken.length === 0 || 
      jobName.length === 0 ||
      (buildType === "docker" ?  dockerName.length === 0 || 
      dockerTagName.length === 0  : false )
    ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleJenkinsChange = (selectedOption) => {
    setLoading(true);    
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({ ...formData, toolConfigId: selectedOption.id, 
        jenkinsUrl: selectedOption.configuration.jenkinsUrl, 
        jUserId: selectedOption.configuration.jUserId, 
        jenkinsPort: selectedOption.configuration.jenkinsPort, 
        jAuthToken: selectedOption.configuration.jAuthToken,
        jobType : "BUILD"
      });
    }
    setLoading(false);    
  };
  
  
  const popover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Title as="h3">Tool Details</Popover.Title>
      <Popover.Content>
        <div className="text-muted mb-2">Information below is from the selected Tool Registry item.  To changes these values, edit the entry in Tool Registry.</div>
        <div className="mb-1">
          <div className="text-muted pr-1">Container URL:</div>
          <div>{formData.jenkinsUrl || ""}</div>
        </div>
        <div className="mb-1">
          <div className="text-muted pr-1">Port:</div>
          <div>{formData.jenkinsPort || ""}</div>
        </div>
        <div className="mb-1">
          <div className="text-muted pr-1">User ID:</div>
          <div>{formData.jUserId || ""}</div>
        </div>        
      </Popover.Content>
    </Popover>
  );



  return (
    <>
      <Form>
        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Registered Tool*</Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <LoadingIcon className={"text-muted mr-1"}/>
            Loading Jenkins accounts from registry</div>
          ) :(
            <>
              {renderForm && jenkinsList && jenkinsList.length > 1 ? <>
                <StandaloneSelectInput
                  selectOptions={jenkinsList}
                  value={formData.toolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] : jenkinsList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.toolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] : jenkinsList[0]}
                  setDataFunction={handleJenkinsChange}
                /> 
                <div className="text-right pt-2">
                  <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
                    <Button variant="outline-dark" size="sm">Info</Button>
                  </OverlayTrigger>
                </div>
              </> : <>
                <div className="form-text text-muted p-2">
                  <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
              No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                  <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
              </> }
            </>

          )}
        </Form.Group>

        {(!formData.toolConfigId && formData.jenkinsUrl) &&
        <div className="form-text text-muted mb-3">
          <IconBase icon={faExclamationTriangle} className={"mr-1 yellow"}/>
              Unregistered Tool settings in use.  The settings below can be used in this step, but cannot be updated.  You must register 
              a new Jenkins server in the 
          <Link to="/inventory/tools"> Tool Registry</Link> and add its configuration details. </div>}

        <Form.Group controlId="branchField">
          <Form.Label>Job Name*</Form.Label>
          <Form.Control maxLength="150" disabled={false} type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
        </Form.Group>

        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Platform*</Form.Label>
          {formData.service !== undefined ?
            <StandaloneSelectInput
              selectOptions={SERVICE_OPTIONS}
              valueField='id'
              textField='label'
              defaultValue={formData.service ? SERVICE_OPTIONS[SERVICE_OPTIONS.findIndex(x => x.value === formData.service)] : SERVICE_OPTIONS[0]}
              setDataFunction={handleServiceChange}
            /> : null }
        </Form.Group>
        
        {formData.service && 
        <Form.Group controlId="account"  className="mt-2">
          <Form.Label>Select Account*</Form.Label>
          {isAccountSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <LoadingIcon className={"text-muted mr-1"}/>
              Loading accounts from registry</div>
          ) :(
            <>
              {accountList && accountList.length > 1 ? 
                <StandaloneSelectInput
                  selectOptions={accountList}
                  value={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                  setDataFunction={handleAccountChange}
                /> : 
                <>
                  <div className="form-text text-muted p-2">
                    <IconBase icon={faExclamationCircle} className={"text-muted mr-1"}/>
                No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group> }
        
        {formData.username && formData.password  &&
        <>
          <Form.Group controlId="userName">
            <Form.Label>Account</Form.Label>
            <Form.Control maxLength="75" type="text" disabled placeholder="Username" value={formData.username || ""} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </Form.Group> 
          {/* <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control maxLength="75" type="password" disabled placeholder="Password" value={formData.password || ""} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          </Form.Group>  */}
        </>
        }
         
        {formData.service && formData.accountId && 
        <Form.Group controlId="account"  className="mt-2">
          <Form.Label>Select Repository*</Form.Label>
          {isRepoSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <LoadingIcon className={"text-muted mr-1"}/>
              Loading repositories from registry</div>
          ) :(
            <>
              {repoList ?
                <StandaloneSelectInput
                  selectOptions={repoList}
                  value={formData.repository ? repoList[repoList.findIndex(x => x.value === formData.repository)] : repoList[0]}
                  valueField='value'
                  textField='name'
                  defaultValue={formData.repository ? repoList[repoList.findIndex(x => x.name === formData.repository)] : repoList[0]}
                  setDataFunction={handleRepoChange}
                /> : <LoadingIcon className={"text-muted mr-1"}/> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group>  }
       
        {formData.service && formData.repository && 
        <Form.Group controlId="branchField">
          <Form.Label>Branch*</Form.Label>
          { formData.repository.length > 0 &&
          <>
            <Form.Control maxLength="75" type="text" placeholder="" value={formData.branch || ""} onChange={e => setFormData({ ...formData, branch: e.target.value })} /> 
            <small className="form-text text-muted mt-2 text-center">Branch within repository to watch: &ldquo;master&rdquo; or &ldquo;feature X&rdquo;</small>
          </>
          }
        </Form.Group> }

        {((formData.service === "github" || formData.service === "gitlab") && accountList.length > 1) &&
        <Form.Group controlId="formBasicCheckbox" className="mt-4 ml-1">
          <Form.Check type="checkbox" label="Enable Event Based Trigger" 
            checked={formData.trigger_active ? true : false} onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}  />  
          <Form.Text className="text-muted">To use an webhook based event trigger with your source repository, the hook URL below (and optional security key) must 
            be setup in your source repository.</Form.Text>      
        </Form.Group> }
      


        <Form.Group controlId="threshold">
          <Form.Label>Success Threshold</Form.Label>
          <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
        </Form.Group>


      
        <Button variant="primary" type="button"  className="mt-3"
          onClick={() => { callbackFunction(); }}> 
          {loading ? 
            <><LoadingIcon className={"mr-1"}/> Saving</> :
            <><IconBase icon={faSave} className={"mr-1"}/> Save</> }
        </Button>
      
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

SFDCStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
  stepTool: PropTypes.object,
  plan: PropTypes.object
};

export default SFDCStepConfiguration;