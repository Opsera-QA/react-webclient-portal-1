import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/error";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  spinnakerUrl: "",
  appName: "",
  toolName: "",
};

// Debounce function
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return debouncedValue;
}

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SpinnakerStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault }) {
  
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [isAppSearching, setIsAppSearching] = useState(true);
  const [isToolSearching, setIsToolSearching] = useState(true);

  const debouncedSearchURL = useDebounce(formData.spinnakerUrl, 1000);

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
  const searchApplications = async (spinnakerURL) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : "spinnaker",
      metric : "applications",
      url: spinnakerURL
    };

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
        setErrors("Data is missing!");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const searchTools = async (appName) => {    
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : "spinnaker",
      metric : "tools",
      appname: appName
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res.data && res.data.data) {
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
        setErrors("Data is missing!");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  useEffect(
    () => {
      async function fetchApplications(url){
        // Set results state
        let results = await searchApplications(url);
        if(results) {
          setApplicationList(formatOptions(results));
          setIsAppSearching(false);
        }
      }
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchURL) {
        // API call
        fetchApplications(debouncedSearchURL);      
      } else {
        setApplicationList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [debouncedSearchURL]
  );

  
  useEffect(
    () => {
      async function fetchTools(appname){
        // Set results state
        let results = await searchTools(appname);
        if(results) {
          setToolsList(formatOptions(results));
          setIsToolSearching(false);
        }
      }
      if (formData.appName) {
        // Fire off our API call
        fetchTools(formData.appName);
      } else {
        setToolsList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.appName]
  );
 
  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };

  const validateRequiredFields = () => {
    let { spinnakerUrl, appName, toolName } = formData;
    if (
      spinnakerUrl.length === 0 || 
      appName.length === 0 || 
      toolName.length === 0 ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handleApplicationChange = (selectedOption) => {
    setFormData({ ...formData, appName: selectedOption.value });    
  };
  
  const handleToolChange = (selectedOption) => {
    setFormData({ ...formData, toolName: selectedOption.value });    
  };

  return (
    <>
      {error && 
        <ErrorDialog  error={error} />
      }
      <Form>
        { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

        <Form.Group controlId="spinnakerURL">
          <Form.Label>Spinnaker URL*</Form.Label>
          <Form.Control maxLength="256" type="text" placeholder="" value={formData.spinnakerUrl || ""} onChange={e => setFormData({ ...formData, spinnakerUrl: e.target.value })} />
        </Form.Group>

        {/* use this if we get the spinnaker url from tools registry */}
      
        {/* <Form.Group controlId="platform">
        <Form.Label>application Name*</Form.Label>
        {renderForm && SpinnakerURLList ? 
          <DropdownList
            data={SpinnakerURLList}
            valueField='id'
            textField='label'
            defaultValue={formData.spinnakerUrk ? SpinnakerURLList[SpinnakerURLList.findIndex(x => x.value === formData.spinnakerUrl)] : SpinnakerURLList[0]}
            onChange={handleSpinnaketUrlChange}             
          /> : null }
      </Form.Group> */}

        <Form.Group controlId="platform">
          <Form.Label>application Name*</Form.Label>
          {isAppSearching ? (
            <small className="form-text text-muted mt-2 text-center">Type in Spinnaker URL to get application list</small>
          ) :(
            <>
              {renderForm && applicationList ? 
                <DropdownList
                  data={applicationList}
                  valueField='name'
                  textField='name'
                  defaultValue={formData.appName ? applicationList[applicationList.findIndex(x => x.name === formData.appName)] : applicationList[0]}
                  onChange={handleApplicationChange}             
                /> : null }
            </>

          )}
        </Form.Group>
      
        <Form.Group controlId="s3Step">
          <Form.Label>Tool Name:*</Form.Label>
          {isToolSearching ? (
            <small className="form-text text-muted mt-2 text-center">Select an application to get list of tools.</small>
          ) :(
            <>
              {renderForm && toolsList ?
                <DropdownList
                  data={toolsList}
                  valueField='value'
                  textField='name'
                  defaultValue={formData.toolName ? toolsList[toolsList.findIndex(x => x.value === formData.toolName)] : toolsList[0]}
                  onChange={handleToolChange}             
                /> : null }
            </>
          )}
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

SpinnakerStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default SpinnakerStepConfiguration;
