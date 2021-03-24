import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { 
  Form,
  Button,
  OverlayTrigger,
  Popover 
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faTimes, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../api/apiService";
import ErrorDialog from "../../../../../../common/status_notifications/error";
import JUnitStepConfiguration from "./junit/JUnitStepConfiguration";
import { Link } from "react-router-dom";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog
} from "../../../../../../common/toasts/toasts";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  spinnakerId: "",
  toolURL: "",
  applicationName: "",
  pipelineName: "",
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SpinnakerStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {
  
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinnakerList, setSpinnakerList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [isSpinnakerSearching, setIsSpinnakerSearching] = useState(true);
  const [isAppSearching, setIsAppSearching] = useState(true);
  const [isToolSearching, setIsToolSearching] = useState(true);

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
      async function fetchSpinnakerDetails(service){
        // Set results state
        let results = await searchSpinnakerList(service);
        if(results) {
          setSpinnakerList(formatOptions(results));
          setIsSpinnakerSearching(false);
        } else {
          setSpinnakerList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
        }
      }
      
      fetchSpinnakerDetails("spinnaker");
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
      if( res.data ) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name" : item.name, "id" : item._id, "configuration" : item.configuration });
        });
        return respObj;
      } else {
        let errorMessage = "Spinnaker information is missing or unavailable!  Please ensure the required details are registered and up to date in Tool Registry.";
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

  const searchApplications = async (spinnakerId) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : "spinnaker",
      metric : "applications",
      id: spinnakerId
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res?.data ) {
        let arrOfObj = res.data.spinnakerApplications;
        if(arrOfObj) {
          let result = arrOfObj.map(function(el) {
            let o = Object.assign({}, el);
            o.value = el.name;
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

  const searchTools = async (spinnakerId, appName) => {    
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : "spinnaker",
      metric : "tools",
      id: spinnakerId,
      appname: appName
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res?.data ) {
        let arrOfObj = res.data.spinnakerPipelines;
        if(arrOfObj) {
          var result = arrOfObj.map(function(el) {
            var o = Object.assign({}, el);
            o.value = el.name;
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

  useEffect(
    () => {
      setShowToast(false);
      async function fetchApplications(id, url){
        // Set results state
        let results = await searchApplications(id);
        if(results) {
          setApplicationList(formatOptions(results));
          setIsAppSearching(false);
        }
      }
      // Make sure we have a value (user has entered something in input)
      if (formData.spinnakerId && formData.spinnakerId.length > 0 ) {
        // API call
        fetchApplications(formData.spinnakerId);      
      } else {
        setApplicationList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.spinnakerId]
  );
  
  useEffect(
    () => {
      setShowToast(false); 
      async function fetchTools(id, appname){
        // Set results state
        let results = await searchTools(id, appname);
        if(results) {
          setToolsList(formatOptions(results));
          setIsToolSearching(false);
        }
      }
      if (formData.applicationName) {
        // Fire off our API call
        fetchTools(formData.spinnakerId, formData.applicationName);
      } else {
        setToolsList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.applicationName]
  );
 
  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };

  const validateRequiredFields = () => {
    let { spinnakerId, toolURL, applicationName, pipelineName } = formData;
    if ( 
      spinnakerId.length === 0 || 
      applicationName.length === 0 || 
      pipelineName.length === 0 ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSpinnakerChange = (selectedOption) => {
    setFormData({ ...formData, spinnakerId: selectedOption.id, toolURL: selectedOption.configuration && selectedOption.configuration.toolURL ?  selectedOption.configuration.toolURL : "", applicationName: "", pipelineName: "" });    
  };

  const handleApplicationChange = (selectedOption) => {
    setFormData({ ...formData, applicationName: selectedOption.value, pipelineName: "" });    
  };

  const handleToolChange = (selectedOption) => {
    setFormData({ ...formData, pipelineName: selectedOption.value });    
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
                {Object.entries(data.configuration).map(function(a) {
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
        <Form.Group controlId="spinnakarlist">
          <Form.Label className="w-100">
            Select Spinnaker*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(
                spinnakerList[
                  spinnakerList.findIndex((x) => x.id === formData.spinnakerId)
                  ],
              )}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="fa-pull-right pointer pr-1"
                onClick={() => document.body.click()}
              />
            </OverlayTrigger>
          </Form.Label>
          {isSpinnakerSearching ? (
             <div className="form-text text-muted mt-2 p-2">
             <FontAwesomeIcon
               icon={faSpinner}
               spin
               className="text-muted mr-1"
               fixedWidth
             />
             Loading Jenkins accounts from registry
           </div>
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
            <small className="form-text text-muted mt-2 text-center">Select Spinnaker details to get application list</small>
          ) :(
            <>
              {renderForm && applicationList ? 
                <DropdownList
                  data={applicationList}
                  valueField='name'
                  textField='name'
                  defaultValue={formData.applicationName ? applicationList[applicationList.findIndex(x => x.name === formData.applicationName)] : applicationList[0]}
                  value={formData.applicationName ? applicationList[applicationList.findIndex(x => x.name === formData.applicationName)] : applicationList[0]}
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
                  defaultValue={formData.pipelineName ? toolsList[toolsList.findIndex(x => x.value === formData.pipelineName)] : toolsList[0]}
                  value={formData.pipelineName ? toolsList[toolsList.findIndex(x => x.value === formData.pipelineName)] : toolsList[0]}
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

JUnitStepConfiguration.propTypes = {
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

export default SpinnakerStepConfiguration;
