import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button, OverlayTrigger, Popover, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward, faPlay, faSpinner, faTimes, faHistory, faPause, faFlag } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import Checkbox from "../../common/checkbox";
import "../workflows.css";
import LoadingDialog from "components/common/loading";
import ErrorDialog from "components/common/error";


const INITIAL_COMPONENT_TYPES_FORM = {
  "accountId": "", //toolRegistry ID for SFDC Account
  "customerId": "", //ssoUsersID assgined at the Node layer
  "lastCommitTimeStamp": "", //asOfDate value as string
  "pipelineId": "", 
  "stepId": "", //assume for now it's the first
  "componentTypes": []
};

const SfdcPipelineStart = ({ pipelineId, pipelineSteps, handlePipelineWizardRequest, handleClose }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 
  const [loadingRegistry, setLoadingRegistry] = useState(false); 
  const [error, setError] = useState(false); 
  const [configurationError, setConfigurationError] = useState(false); 
  const [save, setSave] = useState(false);
  const [stepId, setStepId] = useState("");
  const [registryData, setRegistryData] = useState([]);
  const [componentTypes, setComponentTypes] = useState([]);

  const [selectedComponentTypes, setSelectedComponentTypes] = useState([]);

  const [componentTypeForm, setComponentTypeForm] = useState(INITIAL_COMPONENT_TYPES_FORM); 

  Moment.locale("en");
  momentLocalizer();
  const [asOfDate, setAsOfDate] = useState(Moment().format());

  useEffect(() => {
    setConfigurationError(false);
    loadData();
    loadRegistryData();
    setComponentTypeForm(INITIAL_COMPONENT_TYPES_FORM);    
    loadSfdcInitStep(pipelineSteps);
  }, []);

  //must find step ID of the Sfdc Jenkins Config step (typically first step and has step.tool.job_type set to "sfdc-ant")
  const loadSfdcInitStep = async (steps)=> {
    //find index of step that is jenkins & sfdc-ant type.  If none found, default to index 0

    console.log(steps);

    let stepArrayIndex = steps.findIndex(x => (x.tool && x.tool.job_type === "sfdc-ant" && x.tool.tool_identifier === "jenkins")); 
    console.log(stepArrayIndex);
    if (stepArrayIndex === -1) {
      setError("Warning, this pipeline is missing the default SFDC Jenkins Step needed to run.  Please edit the workflow and add the SFDC Ant Job setting to allow this pipeline to run.");
      setConfigurationError(true);
    } else {
      console.log("step ID: ", steps[stepArrayIndex]._id);
      setStepId(steps[stepArrayIndex]._id);
    }

    
  };


  const loadData = async () => {
    setLoading(true);
    let apiUrl = "/pipelines/sfdc/component-types";

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      console.log(response.data);
      setComponentTypes(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
    
  };

  const loadRegistryData = async () => {
    setLoadingRegistry(true);
    const apiUrl = "/registry/properties/sfdc";

    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      console.log(response.data);
      setRegistryData(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoadingRegistry(false);
    
  };

  const dateAsOf = (
    <DateTimePicker
      time={false} 
      max={new Date()}
      defaultValue={new Date()} 
      onChange={value => handleAsOfDateChange({ value })}
      initialValue={new Date()}
    />
    
  );

  

  const handleAsOfDateChange = (value) => {
    const date = Moment(value.value).toISOString();
    setAsOfDate(date);    
  };

  const handleSetAccount = (selectedOption) => {
    setComponentTypeForm({ ...componentTypeForm, accountId: selectedOption._id });
  };


  const handleSubmitComponentTypes = () => {
    console.log("submitting component types form");
    const postBody = componentTypeForm;
    postBody.pipelineId = pipelineId;
    postBody.stepId = stepId;
    postBody.lastCommitTimeStamp = asOfDate;
    postBody.componentTypes = selectedComponentTypes;
    
    console.log("componentTypeForm: ", postBody);
  };



  const handleComponentCheck = (e) => {
    console.log(e.target.checked, e.target.name);
    const options = selectedComponentTypes;
    let index;
    if (e.target.checked) {
      options.push(e.target.name);
    } else {
      index = options.indexOf(e.target.name);
      options.splice(index, 1);
    }
    setSelectedComponentTypes(options);
  };

  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <div className="mt-5"><ErrorDialog error={error} /></div>}
          
          { !configurationError && 
          <>
            <div className="mx-3 mt-3">        
              <div className="mb-3" style={{ display: "flex" }}>
                <div className="px-2" style={{ flex: "50%" }}>
                  <div className="text-muted pl-1 pb-1">Select Date Filter:</div>
                  {dateAsOf}</div>
                <div className="px-2" style={{ flex: "50%" }}>
                  <div className="text-muted pl-1 pb-1">Select SalesForce Account (configured in Registry):</div>
                  <AccountDropDown data={registryData} setAccount={handleSetAccount} isLoading={loadingRegistry} />
                </div>
              </div>
            </div>
            <div className="mx-5 mt-3">  
              <div className="text-muted ">Select Component Types:</div>
              <div className="d-flex flex-wrap">
                {loading ? <LoadingDialog size="sm" /> : 
                  <>
                    {componentTypes.map((item, idx) => (
                      <div key={idx} className="p-2 w-25">
                        <input type="checkbox" className="form-check-input" id={idx} name={item} onClick={handleComponentCheck} />
                        <label className="form-check-label" htmlFor={idx}>{item}</label>
                      </div>
                    ))} 
                  </> } 
              </div>          
            </div>
          </>}
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button variant="success" size="sm"
            onClick={() => {  setSave(true); handleSubmitComponentTypes(); }}
            disabled={false}>
            {save ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>}Next</Button>

          <Button variant="secondary" size="sm" className="ml-2"
            onClick={() => {  handleClose(); }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>

        </div>
      </div> 
    </div>   
  );
};


const AccountDropDown = ({ data, setAccount, isLoading }) => {

  return (
    <DropdownList
      data={data} busy={isLoading}
      valueField='id'
      textField='name'
      onChange={setAccount}             
    /> 
  );
};

SfdcPipelineStart.propTypes = {
  pipelineId: PropTypes.string,
  pipelineSteps: PropTypes.array,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func,
  isLoading: PropTypes.bool
};

export default SfdcPipelineStart;