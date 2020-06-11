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
  spinnakerId: "",
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
  const [spinnakerList, setSpinnakerList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [isSpinnakerSearching, setIsSpinnakerSearching] = useState(true);
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

  
  useEffect(
    () => {
      setErrors(false);
      async function fetchSpinnakerDetails(service){
        // Set results state
        let results = await searchSpinnakerList(service);
        if(results) {
          console.log(results);
          setSpinnakerList(formatOptions(results));
          setIsSpinnakerSearching(false);
        } else {
          setSpinnakerList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
        }
      }
      
      // Fire off our API call
      fetchSpinnakerDetails("spinnaker");
      // } else {
      //   setSpinnakerList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      // }
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
  
  const searchSpinnakerList = async (service) => {  
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
        setErrors("Data is missing!");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const searchApplications = async (spinnakerId, spinnakerURL) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : "spinnaker",
      metric : "applications",
      id: spinnakerId,
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
      setErrors(false);
      setFormData({ ...formData, spinnakerId: "", spinnakerUrl: "", appName: "", toolName: "" });
      async function fetchApplications(id, url){
        // Set results state
        let results = await searchApplications(id, url);
        if(results) {
          setApplicationList(formatOptions(results));
          setIsAppSearching(false);
        }
      }
      // Make sure we have a value (user has entered something in input)
      if (formData.spinnakerId && formData.spinnakerId.length > 0 ) {
        // API call
        fetchApplications(formData.spinnakerId, formData.spinnakerUrl);      
      } else {
        setApplicationList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.spinnakerId]
  );
  
  useEffect(
    () => {
      setErrors(false); 
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
    let { spinnakerId, spinnakerUrl, appName, toolName } = formData;
    if (
      spinnakerUrl.length === 0 ||    
      spinnakerId.length === 0 || 
      appName.length === 0 || 
      toolName.length === 0 ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handleSpinnakerChange = (selectedOption) => {
    setFormData({ ...formData, spinnakerId: selectedOption.id, spinnakerUrl: selectedOption.configuration ? selectedOption.configuration.spinnakerURL : "" });    
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

        {/* <Form.Group controlId="spinnakerURL">
          <Form.Label>Spinnaker URL*</Form.Label>
          <Form.Control maxLength="256" type="text" placeholder="" value={formData.spinnakerUrl || ""} onChange={e => setFormData({ ...formData, spinnakerUrl: e.target.value })} />
        </Form.Group> */}

        {/* use this if we get the spinnaker url from tools registry */}
      

        <Form.Group controlId="spinnakarlist">
          <Form.Label>Select Spinnaker*</Form.Label>
          {isSpinnakerSearching ? (
            <small className="form-text text-muted mt-2 text-center">Getting list of spinnakers from tools.</small>
          ) :(
            <>
              {renderForm && spinnakerList ? 
                <DropdownList
                  data={spinnakerList}
                  valueField='id'
                  textField='name'
                  defaultValue={formData.spinnakerId ? spinnakerList[spinnakerList.findIndex(x => x.id === formData.spinnakerId)] : spinnakerList[0]}
                  onChange={handleSpinnakerChange}             
                /> : null }
            </>

          )}
        </Form.Group>

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


export default SpinnakerStepConfiguration;
