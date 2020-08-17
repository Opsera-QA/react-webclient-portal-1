import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward, faSpinner, faTimes, faStepBackward, faCheck } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import "../workflows.css";
import LoadingDialog from "components/common/loading";
import ErrorDialog from "components/common/error";


const INITIAL_COMPONENT_TYPES_FORM = {
  "customerId": "", //ssoUsersID assgined at the Node layer
  "lastCommitTimeStamp": "", //asOfDate value as string
  "pipelineId": "", 
  "stepId": "", //assume for now it's the first
  "nameSpacePrefix": "", // prefix
  "objectType": "", // type of objs managed custom or all
  "retrieveFilesFromSFDC": "",
  "componentTypes": []
};

const INITIAL_OBJECT_TYPES = {
 "managed" : false,
 "custom": false,
 "all": false
};

const SfdcPipelineComponents = ({ pipelineId, stepId, setView, setModifiedFiles, handleClose, setSfdcComponentFilterObject }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 
  //const [loadingRegistry, setLoadingRegistry] = useState(false); 
  const [error, setError] = useState(false); 
  const [configurationError, setConfigurationError] = useState(false); 
  const [save, setSave] = useState(false);
  const [fromSFDC, setFromSFDC] = useState(false);
  
  //const [registryData, setRegistryData] = useState([]);
  const [componentTypes, setComponentTypes] = useState([]);
  const [selectedComponentTypes, setSelectedComponentTypes] = useState([]);
  const [componentTypeForm, setComponentTypeForm] = useState(INITIAL_COMPONENT_TYPES_FORM); 
  const [formData, setFormData] = useState(INITIAL_OBJECT_TYPES); 
  const [nameSpacePrefix, setNameSpacePrefix] = useState("");

  Moment.locale("en");
  momentLocalizer();
  const [asOfDate, setAsOfDate] = useState(Moment().format());

  useEffect(() => {
    setConfigurationError(false);
    loadData();
    //loadRegistryData();
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

  /* const loadRegistryData = async () => {
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
    
  }; */

  const dateAsOf = (
    <DateTimePicker
      time={true} 
      max={new Date()}
      defaultValue={new Date(new Date().setHours(0,0,0,0))} 
      onChange={value => handleAsOfDateChange({ value })}
      initialValue={new Date()}
    />
    
  );

  const handleAsOfDateChange = (value) => {
    const date = Moment(value.value).toISOString();
    setAsOfDate(date);    
  };
   
  /* const handleSetAccount = (selectedOption) => {
    setComponentTypeForm({ ...componentTypeForm, accountId: selectedOption._id });
  };
 */

  const handleSubmitComponentTypes = () => {
    console.log("submitting component types form");      
    var keys = Object.keys(formData);
    var filtered = keys.filter(function(key) {
      return formData[key]
    });
    const postBody = componentTypeForm;
    postBody.pipelineId = pipelineId;
    postBody.stepId = stepId;
    postBody.lastCommitTimeStamp = asOfDate;
    postBody.componentTypes = selectedComponentTypes;
    postBody.objectType = filtered[0];
    postBody.nameSpacePrefix = nameSpacePrefix;
    postBody.retrieveFilesFromSFDC = fromSFDC;
    
    console.log("componentTypeForm: ", postBody);
    postComponentTypes(postBody);

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


  //POSTING this should return the data for the next step!  So work that out
  const postComponentTypes = async (data) => {
    setSfdcComponentFilterObject(data);
    const accessToken = await getAccessToken();
    const apiUrl = "/pipelines/sfdc/modified-files";   //TODO: BUILD THIS OUTIN NODE
    
    try {
      const result = await axiosApiService(accessToken).post(apiUrl, data);
      setModifiedFiles(result.data);
      console.log(result.data);

      if (result.data.status === 500) {
        console.log("Error getting API Data: ", result.data.message);
        setError(result.data.message);
      } else {
        setView(2); //move to next view
      }
      //code to toggle view ot next screen
    }
    catch (err) {
      console.log(err.message);
      setError(error);
    }
  };

  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <div className="mt-3"><ErrorDialog error={error} /></div>}
          
          { !configurationError && 
          <>
            <div className="mx-3 mt-3">        
              <div className="mb-3 align-items-end" style={{ display: "flex" }}>
                <div className="px-2" style={{ flex: "70%" }}>
                  <div className="text-muted pl-1 pb-1">Select Date Filter:</div>
                  {dateAsOf}</div>

                  <div className="px-2">
                  <Form.Group controlId="formBasicCheckbox" className="ml-1">
                    <Form.Check
                      type="checkbox"
                      label="Managed"
                      name="managed"
                      checked={formData.managed ? formData.managed : false}
                      onChange={(e) => 
                        setFormData({
                          ...formData,
                          managed: e.target.checked,
                          custom: false,
                          all: false
                        })
                      }
                    />
                  </Form.Group>
                  </div>
                  
                  <div className="px-2">
                  <Form.Group controlId="formBasicCheckbox1" className="ml-1">
                    <Form.Check
                      type="checkbox"
                      label="Custom"
                      name="custom"
                      checked={formData.custom ? formData.custom : false}
                      onChange={(e) => 
                        setFormData({
                          ...formData,  
                          managed: false,
                          custom: e.target.checked,
                          all: false
                        })
                      }
                    />
                  </Form.Group>
                  </div>
                  
                  <div className="px-2">
                  <Form.Group controlId="formBasicCheckbox2" className="ml-1">
                    <Form.Check
                      type="checkbox"
                      label="All"
                      name="all"
                      checked={formData.all ? formData.all : false}
                      onChange={(e) => 
                        setFormData({
                          ...formData,
                          managed: false,
                          custom: false,
                          all: e.target.checked
                        })
                      }
                    />  
                  </Form.Group>
                  </div>

                  <div className="px-2" style={{ flex: "50%", width: "30%"  }}>
                  <div className="text-muted pl-1 pb-1">Prefix:</div>
                  <Form.Group controlId="nameSpacePrefix">
                      <Form.Control maxLength="50" type="text" placeholder="" value={nameSpacePrefix || ""} onChange={e => setNameSpacePrefix(e.target.value)} />
                    </Form.Group>
                  </div>

                 {nameSpacePrefix && nameSpacePrefix.length > 0 &&
                  <div className="px-2">
                  <Form.Group controlId="formBasicCheckbox3" className="ml-1">
                    <Form.Check
                      type="checkbox"
                      label="Retrieve from SFDC"
                      name="fromSFDC"
                      checked={fromSFDC ? fromSFDC : false}
                      onChange={(e) => 
                        setFromSFDC(e.target.checked)
                      }
                    />  
                  </Form.Group>
                  </div>
                 }
                 
                 
                <div className="px-2 text-right" style={{ flex: "50%" }}>
                  {/* <div className="text-muted pl-1 pb-1">Select SalesForce Account (configured in Registry):</div>
                  <AccountDropDown data={registryData} setAccount={handleSetAccount} isLoading={loadingRegistry} /> */}
                  <Button variant="secondary" size="sm" className="mr-2" disabled={true}>
                    <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>Select All</Button>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-3">  
              <div className="text-muted ">Select Component Types:</div>
              <div className="d-flex flex-wrap">
                {loading ? <LoadingDialog size="sm" /> : 
                  <>
                    {typeof(componentTypes) === "object" && componentTypes.map((item, idx) => (
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
        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          <Button variant="secondary" size="sm" className="mr-2" disabled={true}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back</Button>

          <Button variant="success" size="sm"
            onClick={() => {  setSave(true); handleSubmitComponentTypes(); }}
            disabled={save}>
            {save ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>}Next</Button>

          <Button variant="outline-secondary" size="sm" className="ml-2"
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

SfdcPipelineComponents.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  setModifiedFiles: PropTypes.func,
  handleClose: PropTypes.func,
  setSfdcComponentFilterObject: PropTypes.func
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func,
  isLoading: PropTypes.bool
};

export default SfdcPipelineComponents;