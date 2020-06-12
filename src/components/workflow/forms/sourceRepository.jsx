import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCopy, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/error";

//value maps to the tool_identifer string used for each tool
const SERVICE_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" },
  { value: "bitbucket", label: "Bitbucket" }
];

const INITIAL_DATA = {
  name: "",
  service: "",
  accountId : "",
  username: "",
  password: "",
  repository: "", 
  branch: "",
  key: "",
  trigger_active: false
};


function SourceRepositoryConfig( { data, parentCallback }) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [error, setErrors] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isAccountSearching, setIsAccountSearching] = useState(true);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(true);
    
  useEffect(() => {
    if (data !== undefined) {
      let { workflow } = data;
      if (workflow.source !== undefined) {
        setFormData(workflow.source);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  useEffect(
    () => {
      setErrors(false);
      setFormData({ ...formData, accountId: "", username: "", password: "", branch : "" });
      console.log(formData);
      async function fetchApps(service){
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
        setAccountList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.service]
  );
  
  useEffect(
    () => {
      setErrors(false);
      setFormData({ ...formData, branch : "" });
      async function fetchRepos(service, accountId){
        // Set results state
        let results = await searchRepositories(service, accountId);
        if(results) {
          console.log(results);
          setRepoList(formatOptions(results));
          setIsRepoSearching(false);
        }
      }
      if (formData.service && formData.service.length > 0 && formData.accountId && formData.accountId.length > 0) {
        // Fire off our API call
        fetchRepos(formData.service, formData.accountId);
      } else {
        setRepoList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.service, formData.accountId]
  );
  
  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({ ...formData, accountId: selectedOption.id, username: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",  password: selectedOption.configuration ? selectedOption.configuration.accountPassword : "" });
  };
  
  const handleRepoChange = (selectedOption) => {
    setFormData({ ...formData, repository: selectedOption.value });    
  };
 
  const callbackFunction = () => {
    if (validateRequiredFields()) {
      let { name, service, accountId, username, password, repository, branch, key, trigger_active } = formData;
      const item = {
        name: name,
        service: service, 
        accountId: accountId,
        username : username,
        password: password,
        repository: repository,
        branch: branch,
        key: key, 
        trigger_active: trigger_active
      };


      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { service, accountId, username, password, repository, branch } = formData;
    if (service.length === 0 || repository.length === 0 || branch.length === 0 || accountId.length === 0 || username.length === 0 || password.length === 0  ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };


  const handleServiceChange = (selectedOption) => {
    
    setErrors(false);
    setAccountList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
    setRepoList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
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
        setErrors("Account information is missing or unavailable!  Please ensure the required account is registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
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
    console.log(postBody);
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res.data && res.data.data ) {
        let arrOfObj = res.data.data;
        if(arrOfObj) {
          var result = arrOfObj.map(function(el) {
            var o = Object.assign({}, el);
            o.value = el.name;
            return o;
          });
          return result;
        }
      } else {
        setErrors("Account information is missing or unavailable!  Please ensure the required account is registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };


  return (
    <>
      {error && 
        <ErrorDialog  error={error} />
      }
      <Form>
        { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}
      
        <Form.Group controlId="repoField">
          <Form.Label>Step Name</Form.Label>
          <Form.Control maxLength="150" type="text" placeholder="" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Platform*</Form.Label>
          {data.workflow.source !== undefined ?
            <DropdownList
              data={SERVICE_OPTIONS}
              valueField='id'
              textField='label'
              defaultValue={data.workflow.source.service ? SERVICE_OPTIONS[SERVICE_OPTIONS.findIndex(x => x.value === data.workflow.source.service)] : SERVICE_OPTIONS[0]}
              onChange={handleServiceChange}             
            /> : null }
        </Form.Group>
        
        {formData.service && 
        <Form.Group controlId="account"  className="mt-2">
          <Form.Label>Select Account*</Form.Label>
          {isAccountSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
              Loading accounts from registry</div>
          ) :(
            <>
              {accountList && accountList.length > 1 ? 
                <DropdownList
                  data={accountList} 
                  value={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                  onChange={handleAccountChange}             
                /> : 
                <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
                No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group> }
        
        {formData.username && formData.password  &&
        <>
          <Form.Group controlId="useerName">
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
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
              Loading repositories from registry</div>
          ) :(
            <>
              {repoList ?
                <DropdownList
                  data={repoList} 
                  value={formData.repository ? repoList[repoList.findIndex(x => x.name === formData.repository)] : repoList[0]}
                  valueField='name'
                  textField='name'
                  defaultValue={formData.repository ? repoList[repoList.findIndex(x => x.name === formData.repository)] : repoList[0]}
                  onChange={handleRepoChange}             
                /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group>  }
       
        {formData.service && formData.repository && 
        <Form.Group controlId="branchField">
          <Form.Label>Branch*</Form.Label>
          { formData.repository.length > 0 ?
            <Form.Control maxLength="75" type="text" placeholder="Branch to watch" value={formData.branch || ""} onChange={e => setFormData({ ...formData, branch: e.target.value })} /> :
            <small className="form-text text-muted mt-2 text-center">Branch within repository</small>
          }
        </Form.Group> }

        {((formData.service === "github" || formData.service === "gitlab") && accountList.length > 1) &&
        <Form.Group controlId="formBasicCheckbox" className="mt-3 ml-1">
          <Form.Check type="checkbox" label="Enable Event Based Trigger" 
            checked={formData.trigger_active ? true : false} onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}  />  
          <Form.Text className="text-muted">To use an webhook based event trigger with your source repository, the hook URL below (and optional security key) must 
            be setup in your source repository.</Form.Text>      
        </Form.Group> }
      
        {formData.trigger_active === true && 
        <>
          <EventBasedTriggerDetails pipelineId={data._id} />
          <Form.Group controlId="securityKeyField">
            <Form.Label>Webhook Security Key</Form.Label>
            <Form.Control maxLength="75" type="password" placeholder="Optional security key/token from service" value={formData.key || ""} onChange={e => setFormData({ ...formData, key: e.target.value })} />
            <Form.Text className="text-muted">Optional security key/token configured in Source Repository to ensure secure webhook communication.</Form.Text>
          </Form.Group>
        </> }
      
        <Button variant="primary" type="button" className="mt-2"
          onClick={() => { callbackFunction(); }}> 
          <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
        </Button>
      
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}


function EventBasedTriggerDetails({ pipelineId }) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${pipelineId}/source`);
    setCopySuccess(false);
  }, [pipelineId]);

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    setCopySuccess(true);
  };

  return (
    <div className="mt-3">
      <Form.Group controlId="branchField">
        <Form.Label>Webhook URL</Form.Label>
        
        <InputGroup className="mb-1">
          <Form.Control maxLength="75" type="text" value={triggerUrl || ""} disabled={true} />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => { copyToClipboard(triggerUrl); }}><FontAwesomeIcon icon={faCopy} /></Button>            
          </InputGroup.Append>
        </InputGroup>

        <Form.Text className="text-muted">
          Use the URL above to configure your Webhook in the source repository.  If a Secret Key/Token is required, ensure the settings above match your hook configuration.  Ensure 
          Enable SSL is selected in your repo, only PUSH events are configured and for GitHub, make sure the Content Type is: application/json.
        </Form.Text>
      </Form.Group>
      { copySuccess ? <div className="green">Copied to Clipboard!</div> : <div className="py-2"></div> }
    </div>
  );
}




SourceRepositoryConfig.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

EventBasedTriggerDetails.propTypes = {
  pipelineId: PropTypes.string
};

export default SourceRepositoryConfig;