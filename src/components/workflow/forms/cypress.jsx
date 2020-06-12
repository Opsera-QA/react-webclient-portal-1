import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../common/error";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: ""
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function CypressStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault }) {
  
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cypressList, setCypressList] = useState([]);
  const [isCypressSearching, setIsCypressSearching] = useState(false);

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
      async function fetchCypressDetails(service){
        setIsCypressSearching(true);
        // Set results state
        let results = await searchCypressList(service);
        if(results) {
          console.log(results);
          setCypressList(formatOptions(results));
          setIsCypressSearching(false);
        }
      }
      // Fire off our API call
      fetchCypressDetails("cypress");
    },
    []
  );
  

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
   
      const item = {
        configuration: formData
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };
  
  const searchCypressList = async (service) => {  
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
        setErrors("Cypress information is missing or unavailable!  Please ensure the required Cypress creds are registered and up to date in Tool Registry.");
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
    let { toolConfigId, jenkinsUrl, jUserId, jAuthToken } = formData;
    if (
      toolConfigId.length === 0 ||    
      jenkinsUrl.length === 0 || 
      jUserId.length === 0 || 
      jAuthToken.length === 0 ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handleCypressChange = (selectedOption) => {
    setFormData({ ...formData, toolConfigId: selectedOption.id ? selectedOption.id : "", jenkinsUrl: selectedOption.configuration ? selectedOption.configuration.jenkinsUrl : "",
      jUserId: selectedOption.configuration ? selectedOption.configuration.jUserId : "",
      jAuthToken: selectedOption.configuration ? selectedOption.configuration.jAuthToken : ""
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

        <Form.Group controlId="cypressList">
          <Form.Label>Select Cypress*</Form.Label>
          {isCypressSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Cypress accounts from registry</div>
          ) :(
            <>
              {renderForm && cypressList && cypressList.length > 1 ? 
                <DropdownList
                  data={cypressList}
                  value={formData.toolConfigId ? cypressList[cypressList.findIndex(x => x.id === formData.toolConfigId)] : cypressList[0]}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.toolConfigId ? cypressList[cypressList.findIndex(x => x.id === formData.toolConfigId)] : cypressList[0]}
                  onChange={handleCypressChange}             
                /> : <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
            </>

          )}
        </Form.Group>

          
        {formData.jenkinsUrl && 
        <>
          <Form.Group controlId="jenkinsUrl">
            <Form.Label>Jenkins URL</Form.Label>
            <Form.Control maxLength="75" disabled type="text" disabled placeholder="Jenkins URL" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value })} />
          </Form.Group> 
        </>
        }
               
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


export default CypressStepConfiguration;
