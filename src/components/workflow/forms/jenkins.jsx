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
  jobType: "BUILD", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  dockerName: "",
  dockerTagName: "",
  buildType: "gradle" //hardcoded now but needs to get it from a dropdown
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault }) {

  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setjenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

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
        let results = await searchjenkinsList(service);
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
        setErrors("Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.");
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
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
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

  return (
    <>
      {error && 
        <ErrorDialog  error={error} />
      }
      <Form>
        { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}

        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Registered Tool*</Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Jenkins accounts from registry</div>
          ) :(
            <>
              {renderForm && jenkinsList && jenkinsList.length > 1 ? 
                <DropdownList
                  data={jenkinsList}
                  value={formData.toolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] : jenkinsList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.toolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] : jenkinsList[0]}
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

        {(!formData.toolConfigId && formData.jenkinsUrl) &&
        <div className="form-text text-muted mb-3">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 yellow" fixedWidth/> 
              Unregistered Tool settings in use.  The settings below can be used in this step, but cannot be updated.  You must register 
              a new Jenkins server in the 
          <Link to="/inventory/tools"> Tool Registry</Link> and add its configuration details. </div>}


        <Form.Group controlId="repoField">
          <Form.Label>Jenkins Container URL</Form.Label>
          <Form.Control disabled={true} type="text" placeholder="" value={formData.jenkinsUrl || ""} />
        </Form.Group>
        <Form.Group controlId="branchField">
          <Form.Label>Jenkins Port</Form.Label>
          <Form.Control disabled={true} type="text" placeholder="" value={formData.jenkinsPort || ""} />
        </Form.Group>
        <Form.Group controlId="branchField">
          <Form.Label>Jenkins User ID</Form.Label>
          <Form.Control disabled={true} type="text" placeholder="" value={formData.jUserId || ""}  />
        </Form.Group>

        <Form.Group controlId="branchField">
          <Form.Label>Job Name*</Form.Label>
          <Form.Control maxLength="150" disabled={false} type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="threshold">
          <Form.Label>Success Threshold</Form.Label>
          <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
        </Form.Group>




        {(formData.jenkinsUrl && jenkinsList.length > 1) &&
        <Form.Group controlId="formBasicCheckbox" className="mt-4 ml-1">
          <Form.Check type="checkbox" label="Enable Docker Build Support" 
            checked={formData.buildType === "docker" ? true : false} onChange={() => setFormData({ ...formData, buildType: formData.buildType === "docker" ? "gradle" : "docker", dockerTagName : "", dockerName: ""  })}  />  
          {/* <Form.Text className="text-muted"></Form.Text>       */}
        </Form.Group> }
      
        {formData.buildType === "docker" && 
        <>
          <Form.Group controlId="branchField">
            <Form.Label>Docker Name*</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" value={formData.dockerName || ""} onChange={e => setFormData({ ...formData, dockerName: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="branchField">
            <Form.Label>Docker Tag*</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" value={formData.dockerTagName || ""} onChange={e => setFormData({ ...formData, dockerTagName: e.target.value })} />
          </Form.Group>
          
        </> }

      
        <Button variant="primary" type="button"  className="mt-3"
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

JenkinsStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default JenkinsStepConfiguration;

//disabled={(urlVal.length == 0 || userIdVal.length == 0 || authTokenVal.length == 0 || urlVal.length > 100 || portVal.length > 5 || userIdVal.length > 50 || authTokenVal.length > 500 || jobVal.length > 150)}