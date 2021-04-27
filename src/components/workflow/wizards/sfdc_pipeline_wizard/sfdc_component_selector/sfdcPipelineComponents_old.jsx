import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepForward,
  faSpinner,
  faStepBackward,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import "components/workflow/workflows.css";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {isEqual} from "components/common/helpers/array-helpers";

const INITIAL_COMPONENT_TYPES_FORM = {
  customerId: "", //ssoUsersID assgined at the Node layer
  // lastCommitTimeStamp: "", //asOfDate value as string
  lastCommitTimeFromStamp: "", //fromDate value as string
  lastCommitTimeToStamp: "", //toDate value as string
  pipelineId: "",
  stepId: "", //assume for now it's the first
  nameSpacePrefix: "", // prefix
  objectType: "", // type of objs managed custom or all
  componentTypes: [],
};

const SfdcPipelineComponents_old = ({
  pipelineId,
  stepId,
  setView,  
  stepToolConfig,
  sfdcToolId,
  nameSpacePrefix,
  setNameSpacePrefix,
  isProfiles,
  setSelectedComponentTypes,
  selectedComponentTypes,
  setModifiedFiles,
  handleClose,
  setSfdcComponentFilterObject,
  selectedDate,
  setSelectedDate,
  formData,
  setFormData,
  asOfDate,
  setAsOfDate,
  selectedComp,
  setSelectedComp,
  selectedFromDate, 
  setSelectedFromDate,
  selectedToDate, 
  setSelectedToDate,
  fromDate, 
  setFromDate,
  toDate, 
  setToDate,
  gitTaskData,
  gitTaskId,
  closePanel
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);
  const [save, setSave] = useState(false);
  const [warning, setWarning] = useState(false);
  
  const [componentTypes, setComponentTypes] = useState([]);
  // const [selectedComponentTypes, setSelectedComponentTypes] = useState([]);
  const [componentTypeForm, setComponentTypeForm] = useState(INITIAL_COMPONENT_TYPES_FORM);

  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    setConfigurationError(false);
    setLoading(false);
    setSave(false);
    setError(false);
    setWarning(false);
    setComponentTypeForm(INITIAL_COMPONENT_TYPES_FORM);
  }, []);

  useEffect(() => {
    let ignore = false;
  
    async function loadData () {
      setLoading(true);
  
      try {
        // const accessToken = await getAccessToken();
        if(sfdcToolId) {
          let postBody = {
            "sfdcToolId": sfdcToolId,
            "isProfiles": isProfiles
          };
          const response = await sfdcPipelineActions.getComponentTypes(postBody, getAccessToken);
          if (!ignore) setComponentTypes(response.data);
        }
      } catch (error) {
        console.error("Error getting API Data: ", error);
        setError(error);
      }
      setLoading(false);
    }
  
    loadData();
    return () => { ignore = true; };
  }, [isProfiles, sfdcToolId]);
  
  const dateFrom = (
    <DateTimePicker
      time={true}
      min={new Date().setFullYear(new Date().getFullYear() - 1)}
      max={selectedToDate}
      defaultValue={selectedFromDate}
      onChange={(value) => handleFromDateChange({ value })}
      initialValue={new Date(new Date().setHours(0,0,0,0))}
    />
  );

  const dateTo = (
    <DateTimePicker
      time={true}
      min={selectedFromDate}
      max={new Date()}
      defaultValue={selectedToDate}
      onChange={(value) => handleToDateChange({ value })}
      initialValue={new Date(new Date().setHours(0,0,0,0))}
    />
  );


  const handleFromDateChange = (value) => {
    checkFromToDateLimit(value.value, selectedToDate);
    const date = Moment(value.value).toISOString();
    setSelectedFromDate(value.value);
    setFromDate(date);
  };

  const handleToDateChange = (value) => {
    checkFromToDateLimit(selectedFromDate, value.value);
    const date = Moment(value.value).toISOString();
    setSelectedToDate(value.value);
    setToDate(date);
  };

  const checkFromToDateLimit = (from, to) => {
    const fd = new Date(from);
    const td = new Date(to);

    const diff = td.getMonth() < fd.getMonth() ? td.getMonth() - fd.getMonth() + 12 : td.getMonth() - fd.getMonth();

    if(diff >= 6){
      setWarning(true);
      return;
    }
    setWarning(false);
  };

  function checkDateLimit(date) {
    var selectedDate = new Date(date);
    var limitDate = new Date();
    var month = limitDate.getMonth();
    // Subtract 6 months
    limitDate.setMonth(limitDate.getMonth() - 6);
    // If the new month number isn't month - 6, set to last day of previous month
    // Allow for cases where month < 6
    var diff = (month + 12 - limitDate.getMonth()) % 12;
    if (diff < 6) limitDate.setDate(0);    

    if(selectedDate < limitDate) {
      setWarning(true);
      return;
    }
    setWarning(false);
  }

  const handleCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes(componentTypes.filter((obj)=>{return obj.enabled;}).map(({ name }) => name));
  };

  const handleUnCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes([]);
  };

  const handleCheckOrUncheckAllClickComponentTypes = () => {
    if (isEqual(selectedComponentTypes,componentTypes.filter((obj)=>{return obj.enabled;}).map(({ name }) => name))) {handleUnCheckAllClickComponentTypes();}
    else {handleCheckAllClickComponentTypes();}
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{"zIndex": 1500}} {...props}>
      {message.length > 0 ? message : "No file extension found."}
    </Tooltip>
  );

  const handleTypeSelect = (e) => {
    const newValue = e.target.name;
    if (e.target.checked) {
      setSelectedComp((selectedComp) => [...selectedComp, newValue]);
    } else {
      setSelectedComp(selectedComp.filter((item) => item !== newValue));
    }
  };

  const handleComponentCheck = (e) => {
    const newValue = e.target.name;
    // console.log("selected value: " ,newValue)
    if (e.target.checked) {
      setSelectedComponentTypes((selectedComponentTypes) => [...selectedComponentTypes, newValue]);
    } else {
      setSelectedComponentTypes(selectedComponentTypes.filter((item) => item !== newValue));
    }
  };

  const handleSubmitComponentTypes = async () => {
    setSave(true);
    let keys = Object.keys(formData);
    let filtered = keys.filter(function (key) {
      return formData[key];
    });
    const postBody = componentTypeForm;
    postBody.pipelineId = gitTaskData ? "N/A" : pipelineId;
    postBody.stepId = gitTaskData ? "N/A" : stepId;
    postBody.gitTaskId = gitTaskData ? gitTaskId : false;
    postBody.gitTaskSFDCToolId = gitTaskData ? stepToolConfig.sfdcToolId : false;
    postBody.lastCommitTimeFromStamp = isProfiles ? "1900-01-01T00:00:00.000Z" : fromDate;
    postBody.lastCommitTimeToStamp = toDate;
    postBody.componentTypes = isProfiles ? ["Profile"] : selectedComponentTypes;
    // postBody.componentTypes = isProfiles ? selectedComp : selectedComponentTypes;
    postBody.objectType = filtered[0];
    postBody.nameSpacePrefix = nameSpacePrefix;

    // console.log(postBody);
    await storeSelectedComponents(postBody);
  };

  const storeSelectedComponents = async (data) => {
    console.log(stepToolConfig);
    // TODO: Make a call to store the selected components to pipeline storage selectedComponents
    const postBody = {
      "dataType" : gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
      "pipelineId" : gitTaskData ? "N/A" : pipelineId,
      "stepId" : gitTaskData ? "N/A" : stepId,
      "gitTaskId": gitTaskData ? gitTaskId : false,
      "gitTaskSFDCToolId": gitTaskData ? stepToolConfig.sfdcToolId : false,
      "updateAttribute": "selectedComponents",
      "data" :  selectedComponentTypes,
    };
    try {
      const result = await sfdcPipelineActions.setSelectedComponents(postBody, getAccessToken);
      // setModifiedFiles(result.data); 
      // console.log(result.data)
      if (result.data.status === 500) {
        console.error("Error setting selected Data: ", result.data.message);
        setError(result.data.message);
        setSave(false);
      } else {
        await postComponentTypes(data);
      }
    } catch (err) {
      console.error("Error setting selected Data: ", err.message);
      setError("Error setting selected Data: ", error);
      setSave(false);
    }
  };

  const postComponentTypes = async (data) => {
    setSfdcComponentFilterObject(data);

    try {
      const result = await sfdcPipelineActions.getModifiedFiles(data, getAccessToken);
      // setModifiedFiles(result.data); 
      // console.log(result.data)
      if (result.data.status === 500) {
        console.error("Error getting API Data: ", result.data.message);
        setError(result.data.message);
        setSave(false);
      } else {
        setView(2); //move to next view
      }
    } catch (err) {
      console.error(err.message);
      setSave(false);
      setError(error);
    }
  };

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <ErrorDialog error={error} align={"top"} setError={setError} />}
          {warning &&  
            // <div className="info-text mt-3 pl-4">You have selected a large date range and as such this may take some time to complete.</div>
            <div className="warning-theme warning-text text-left">
            <FontAwesomeIcon icon={faInfoCircle} fixedWidth className="mr-1" style={{cursor: "help"}}/>
            You have selected a large date range and as such this may take some time to complete.
            </div>
          }

          {!configurationError && (
            <>
              <div className="mt-3 mr-3">
                <div className="d-flex justify-content-between">
                  {/* {isProfiles ? 

                  <div className="px-2">
                     <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip("select type of migration is it a profile migration or permission set migration or both")}
                      ><FontAwesomeIcon
                      icon={faInfoCircle}
                      className="fa-pull-right pointer pr-1"
                      onClick={() => document.body.click()}
                    /></OverlayTrigger>
                    <div className="text-muted pl-1 pb-1">Type of Migration: *</div>
                    <Form.Check
                        inline
                        type={"checkbox"}
                        label="Profile"
                        id="Profile"
                        name="Profile"
                        checked={selectedComp.includes("Profile")}
                        onChange={handleTypeSelect}
                      />
                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="Permission Set"
                        id="Permission"
                        name="PermissionSet"
                        checked={selectedComp.includes("PermissionSet")}
                        onChange={handleTypeSelect}
                      />
                      
                  </div>
                  : */}
                  {isProfiles ? '' : (
                    <div className="px-2">
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip("All files committed after this date will be included")}
                      ><FontAwesomeIcon
                      icon={faInfoCircle}
                      className="fa-pull-right pointer pr-1"
                      onClick={() => document.body.click()}
                    /></OverlayTrigger>
                        <div className="text-muted pl-1 pb-1">From Date:</div>
                        {dateFrom}
                        <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip("All files committed before this date will be included")}
                      ><FontAwesomeIcon
                      icon={faInfoCircle}
                      className="fa-pull-right pointer pr-1 mt-2"
                      onClick={() => document.body.click()}
                    /></OverlayTrigger>
                    <div className="text-muted pl-1 pb-1 mt-2">To Date:</div>
                    {dateTo}
                    {/* <div className="text-muted pl-1 pb-1">Filter Date:</div>
                    {dateAsOf} */}
                  </div>  
                  )}
                  
                  {/* } */}
                  
                  <div className="px-2">
                    <div className="text-muted pl-1 pb-1">  <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Managed components with given NamespacePrefix will be included. Custom components prefixed with the given Prefix will be included")}
                  ><FontAwesomeIcon
                  icon={faInfoCircle}
                  className="fa-pull-right pointer pr-1"
                  onClick={() => document.body.click()}
                /></OverlayTrigger>Prefix:</div>
                    <Form.Group controlId="nameSpacePrefix">
                      <Form.Control
                        maxLength="50"
                        type="text"
                        placeholder=""
                        value={nameSpacePrefix || ""}
                        className={"mb-1"}
                        onChange={(e) => setNameSpacePrefix(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="px-2">
                  <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Select whether managed, custom, or all components will be included")}
                  ><FontAwesomeIcon
                  icon={faInfoCircle}
                  className="fa-pull-right pointer pr-1"
                  onClick={() => document.body.click()}
                /></OverlayTrigger><div className="text-muted pl-1 pb-1">Types:</div>

                    <Form.Group controlId="formBasicCheckbox" className="ml-1 d-flex">
                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="Managed"
                        name="managed"
                        checked={formData.managed ? formData.managed : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: e.target.checked,
                            custom: false,
                            all: false,
                          })
                        }
                      />

                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="Custom"
                        name="custom"
                        checked={formData.custom ? formData.custom : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: false,
                            custom: e.target.checked,
                            all: false,
                          })
                        }
                      />

                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="All"
                        name="all"
                        checked={formData.all ? formData.all : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: false,
                            custom: false,
                            all: e.target.checked,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="px-2"></div>

                  <div className="align-self-end">
                  <Form.Check
                              inline
                              type={"switch"}
                              label={"Check All"}
                              name={"Check All"}
                              id={"Check All"}
                              checked={isEqual(selectedComponentTypes,componentTypes.filter((obj)=>{ return obj.enabled;}).map(({ name }) => name))}
                              onChange={handleCheckOrUncheckAllClickComponentTypes}
                            />
                    {/* <Button variant="secondary" size="sm" className="mr-2" onClick={handleCheckAllClickComponentTypes}>
                      <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                      Check All
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mr-2"
                      onClick={handleUnCheckAllClickComponentTypes}
                    >
                      <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1" />
                      Uncheck All
                    </Button> */}
                  </div>
                </div>
              </div>

              <div className="mx-2">
                <div className="text-muted">Select Components:</div>
                <div>
                <div className="d-flex flex-wrap">
                  {loading ? (
                    <LoadingDialog size="sm" />
                  ) : (
                    <>
                      {typeof componentTypes === "object" &&
                        componentTypes.map((item, idx) => (
                          <div key={idx} className="p-2 w-25">
                            <OverlayTrigger
                              placement="right"
                              // delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip(item.value)}
                              >
                              <span>
                                <Form.Check
                                  inline
                                  disabled={!item.enabled}
                                  type={"checkbox"}
                                  label={item.name}
                                  name={item.name}
                                  id={item.name}
                                  checked={selectedComponentTypes.includes(item.name)}
                                  onChange={handleComponentCheck}
                                />
                              </span>
                            </OverlayTrigger>
                          </div>
                          
                        ))}
                    </>
                  )}
                </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          <Button variant="secondary" size="sm" className="mr-2" disabled={true}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              handleSubmitComponentTypes();
            }}
            disabled={save ||
              // isProfiles ? selectedComp.length < 1 : false
              selectedComponentTypes.length < 1
             }
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1" />
            )}
            Next
          </Button>

          {/*<Button variant="outline-secondary" size="sm" className="ml-2"
                  onClick={() => {
                    handleClose();
                  }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>*/}
        </div>
      </div>
    </div>
  );
};

const AccountDropDown = ({ data, setAccount, isLoading }) => {
  return <DropdownList data={data} busy={isLoading} valueField="id" textField="name" onChange={setAccount} />;
};

SfdcPipelineComponents_old.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  nameSpacePrefix: PropTypes.string,
  setNameSpacePrefix: PropTypes.func,
  isProfiles: PropTypes.bool,
  setSelectedComponentTypes: PropTypes.func,
  selectedComponentTypes: PropTypes.array,
  stepToolConfig: PropTypes.object,
  sfdcToolId: PropTypes.string,
  setModifiedFiles: PropTypes.func,
  handleClose: PropTypes.func,
  setSfdcComponentFilterObject: PropTypes.func,
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  asOfDate: PropTypes.string,
  setAsOfDate: PropTypes.func,
  selectedComp: PropTypes.object,
  setSelectedComp: PropTypes.func,
  selectedFromDate: PropTypes.string, 
  setSelectedFromDate: PropTypes.func,
  selectedToDate: PropTypes.string,
  setSelectedToDate: PropTypes.func,
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func,
  toDate: PropTypes.string,
  setToDate: PropTypes.func,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
  closePanel: PropTypes.func
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SfdcPipelineComponents_old;
