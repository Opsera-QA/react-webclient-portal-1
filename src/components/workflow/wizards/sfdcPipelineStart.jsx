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
import "../workflows.css";


const INITIAL_COMPONENT_TYPES_FORM = {
  "accountId": "", //toolRegistry ID for SFDC Account
  "customerId": "", //ssoUsersID
  "lastCommitTimeStamp": "", //asOfDate value as string
  "pipelineId": "", 
  "stepId": "",
  "componentTypes": []
};

const SfdcPipelineStart = ({ pipelineId, handlePipelineWizardRequest, handleClose }) => {
  const contextType = useContext(AuthContext);
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 
  const [loadingRegistry, setLoadingRegistry] = useState(false); 
  const [error, setError] = useState(false); 
  const [save, setSave] = useState(false);
  
  const [registryData, setRegistryData] = useState([]);
  const [componentTypes, setComponentTypes] = useState([]);
  const [componentTypeForm, setComponentTypeForm] = useState(INITIAL_COMPONENT_TYPES_FORM); 

  Moment.locale("en");
  momentLocalizer();
  const [asOfDate, setAsOfDate] = useState(Moment().format());

  useEffect(() => {
    loadData();
    loadRegistryData();
    setComponentTypeForm(INITIAL_COMPONENT_TYPES_FORM);    
  }, []);


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
    postBody.stepId = "xxx";  //TODO: Need to identify the step ID (first step in array if type is XXX)
    postBody.lastCommitTimeStamp = asOfDate;
    
    console.log("componentTypeForm: ", postBody);

  };

  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>
          <div className="mx-3 mt-3">        
            <div className="mb-3" style={{ display: "flex" }}>
              <div className="px-2" style={{ flex: "50%" }}>{dateAsOf}</div>
              <div className="px-2" style={{ flex: "50%" }}>
                <AccountDropDown data={registryData} setAccount={handleSetAccount} />
              </div>
            </div>
          </div>
          <div className="mx-5 mt-3">  
            <div className="d-flex flex-wrap">
              {componentTypes.map((item, idx) => (
                <div key={idx} className="p-2 w-25">
                  <input type="checkbox" className="form-check-input" id={idx} />
                  <label className="form-check-label" htmlFor={idx}>{item}</label>
                </div>
              ))} 
            </div>

          
          </div>
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


const AccountDropDown = ({ data, setAccount }) => {

  return (
    <DropdownList
      data={data}
      valueField='id'
      textField='name'
      onChange={setAccount}             
    /> 
  );
};

SfdcPipelineStart.propTypes = {
  pipelineId: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func
};

export default SfdcPipelineStart;