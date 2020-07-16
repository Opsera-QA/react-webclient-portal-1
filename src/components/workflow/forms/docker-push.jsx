import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../common/error";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "DOCKER PUSH", //hardcoded   
  jenkinsToolConfigId: "",
  awsToolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  accessKey: "", 
  secretKey: "", // store in vault
  regions: "",
  awsAccountId: "",
  buildStepId: "", //this will have docker name and tag

  dockerName: "",
  dockerTagName : ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function DockerPushStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault }) {
 
  const contextType = useContext(AuthContext);

  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  const [renderForm, setRenderForm] = useState(false);
  const [error, setErrors] = useState(false);
  
  const [jenkinsList, setjenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  
  const [awsList, setAWSList] = useState([]);
  const [isAWSSearching, setIsAWSSearching] = useState(false);
  

  useEffect(()=> {
    if( plan && stepId ) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(0, plan.findIndex( (element) => element._id === stepId));
    STEP_OPTIONS.unshift({ _id: "", name : "Select One",  isDisabled: "yes" });
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


  useEffect(
    () => {
      setErrors(false);
      async function fetchJenkinsDetails(service){
        setisJenkinsSearching(true);
        // Set results state
        let results = await searchToolList(service);
        if(results) {
          console.log(results);
          setjenkinsList(formatOptions(results));
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
      setErrors(false);
      async function fetchAWSDetails(service){
        setIsAWSSearching(true);
        // Set results state
        let results = await searchToolList(service);
        if(results) {
          console.log(results);
          setAWSList(formatOptions(results));
          setIsAWSSearching(false);
        }
      }
      // Fire off our API call
      fetchAWSDetails("aws_account");
    },
    []
  );
  
  const searchToolList = async (service) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/"+service;   // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      console.log(res);
      if( res.data ) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name" : item.name, "id" : item._id, "configuration" : item.configuration });
        });
        console.log(respObj);
        return respObj;
      } else {
        setErrors("information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };


  const loadFormData = async (step) => {
    let { configuration } = step;
    if (typeof(configuration) !== "undefined") {
      setFormData(configuration);
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);

      // let newConfiguration = formData;
      
      // if (typeof(newConfiguration.secretKey) === "string") {
      //   newConfiguration.secretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
      // }

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

  const validateRequiredFields = () => {

    let { jenkinsToolConfigId, awsToolConfigId, jenkinsUrl, jUserId, jAuthToken, accessKey, secretKey, regions, awsAccountId, dockerName, dockerTagName, buildStepId } = formData;
    if ( accessKey.length === 0 ||
      jenkinsToolConfigId.length === 0 ||
      awsToolConfigId.length === 0 ||
      secretKey.length === 0 ||
      regions.length === 0 ||
      awsAccountId.length === 0 ||
    // dockerName.length === 0 ||
    // dockerTagName.length === 0 ||
       buildStepId.length === 0 ||
      jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0
    ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };
  
  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });    
  };

  
  const handleJenkinsChange = (selectedOption) => {
    setFormData({ ...formData, jenkinsToolConfigId: selectedOption.id ? selectedOption.id : "", jenkinsUrl: selectedOption.configuration ? selectedOption.configuration.jenkinsUrl : "",
      jUserId: selectedOption.configuration ? selectedOption.configuration.jUserId : "",
      jenkinsPort: selectedOption.configuration ? selectedOption.configuration.jenkinsPort : "",
      jAuthToken: selectedOption.configuration ? selectedOption.configuration.jAuthToken : ""
    });    
  };

  
  const handleAWSChange = (selectedOption) => {
    setFormData({ ...formData, awsToolConfigId: selectedOption.id ? selectedOption.id : "", awsAccountId: selectedOption.configuration ? selectedOption.configuration.awsAccountId : "",
      accessKey: selectedOption.configuration ? selectedOption.configuration.accessKey : "",
      secretKey: selectedOption.configuration ? selectedOption.configuration.secretKey : "",
      regions: selectedOption.configuration ? selectedOption.configuration.regions : ""
    });    
  };

  console.log(formData);
  return (
    <>
      {error && 
        <ErrorDialog  error={error} />
      }
      <Form>
        { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

        {/* Leave the threshold form group as is for now, just read only for all forms */}
        {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}

        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Jenkins Tool Configuration*</Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Jenkins accounts from registry</div>
          ) :(
            <>
              {renderForm && jenkinsList && jenkinsList.length > 1 ? 
                <DropdownList
                  data={jenkinsList}
                  value={formData.jenkinsToolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.jenkinsToolConfigId)] : jenkinsList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.jenkinsToolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.jenkinsToolConfigId)] : jenkinsList[0]}
                  onChange={handleJenkinsChange}             
                /> : <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
            </>

          )}
        </Form.Group>
        
        {(!formData.jenkinsToolConfigId || !formData.awsToolConfigId) &&
        <div className="form-text text-muted mb-3">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 yellow" fixedWidth/> 
              Unregistered Tool settings in use.  The settings below can be used in this step, but cannot be updated.  You must register 
              a new Jenkins server in the 
          <Link to="/inventory/tools"> Tool Registry</Link> and add its configuration details. </div>}

        {formData.jenkinsUrl && formData.jenkinsUrl.length > 0 &&
        
        <>
          <Form.Group controlId="jenkinsUrl">
            <Form.Label>Jenkins Container URL*</Form.Label>
            <Form.Control maxLength="100" type="text" disabled={true} placeholder="" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value })} />
          </Form.Group>
              
          <Form.Group controlId="jUserId">
            <Form.Label>Jenkins User ID*</Form.Label>
            <Form.Control maxLength="50" type="text" disabled={true} placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
          </Form.Group>
          {/* <Form.Group controlId="jAuthToken">
                  <Form.Label>Jenkins Token</Form.Label>
                  <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value })} />
                </Form.Group> */}
          <Form.Group controlId="jobName">
            <Form.Label>Job Name*</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
          </Form.Group>
        </>
        }

        <Form.Group controlId="jenkinsList">
          <Form.Label>Select AWS Account Configuration*</Form.Label>
          {isAWSSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Sonar accounts from registry</div>
          ) :(
            <>
              {renderForm && awsList && awsList.length > 1 ? 
                <DropdownList
                  data={awsList}
                  value={formData.awsToolConfigId ? awsList[awsList.findIndex(x => x.id === formData.awsToolConfigId)] : awsList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.awsToolConfigId ? awsList[awsList.findIndex(x => x.id === formData.awsToolConfigId)] : awsList[0]}
                  onChange={handleAWSChange}             
                /> : <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
            </>

          )}
        </Form.Group>

        {formData.accessKey && formData.accessKey.length > 0 &&
        
        <>
          {/* <Form.Group controlId="accessKey">
            <Form.Label>AWS Access Key ID*</Form.Label>
            <Form.Control maxLength="256" disabled={true} type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
          </Form.Group> */}
      
          {/* <Form.Group controlId="accessKey">
            <Form.Label>AWS Secret Access Key*</Form.Label>
            <Form.Control maxLength="256"  disabled={true}  type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />            
            <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
          </Form.Group>

          <Form.Group controlId="awsRegion">
            <Form.Label>AWS Region*</Form.Label>
            <Form.Control maxLength="150"  disabled={true}  type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value })} />
          </Form.Group> */}

          <Form.Group controlId="awsAccountId">
            <Form.Label>AWS Account ID*</Form.Label>
            <Form.Control maxLength="150"  disabled={true}  type="text" placeholder="" value={formData.awsAccountId || ""} onChange={e => setFormData({ ...formData, awsAccountId: e.target.value })} />
          </Form.Group>
        </>
        }

        <Form.Group controlId="s3Step">
          <Form.Label>Build Step Info*</Form.Label>
          {listOfSteps ?
            <DropdownList
              data={listOfSteps}
              value = {formData.buildStepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.buildStepId)] : listOfSteps[0]}
              valueField='_id'
              textField='name'
              defaultValue={formData.buildStepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.buildStepId)] : listOfSteps[0]}
              onChange={handleBuildStepChange}             
            /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
        </Form.Group>

        <Button variant="primary" type="button" 
          onClick={() => { callbackFunction(); }}> 
          {loading ? 
            <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Saving</> :
            <><FontAwesomeIcon icon={faSave} className="mr-1"/> Save</> }
        </Button>
      
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

DockerPushStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default DockerPushStepConfiguration;
