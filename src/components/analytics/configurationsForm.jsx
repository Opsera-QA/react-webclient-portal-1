import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Form, Button } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { ApiService } from "../../api/apiService";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTools } from "@fortawesome/free-solid-svg-icons";

const INITIAL_SETTINGS = {
  dataUsage: "500",
  active: false,
  workflowType: { Infrastructure: false, Pipeline: true },
  enabledTools: { Jenkins: true, JUnit: true, JMeter: true, Selenium: true, Sonar: true, Twistlock: true },
  enabledToolsOn: "",
  updatedToolsOn: "",
  disabledToolsOn: "",
  kibanaDashboardUrl: ""
};
const ANALYTICS_TYPES = ["Infrastructure", "Pipeline"];
const TOOLS = [ "Jenkins", "JUnit", "JMeter", "Selenium", "Sonar", "Twistlock" ];
const DATA_LIMITS = [{ Value: "0", Label: "Inactive" }, { Value: "500", Label: "500MB" }, { Value: "1", Label: "1GB" }, { Value: "2", Label: "2GB" }, { Value: "3", Label: "3GB" }];


function ConfigurationsForm( { settings, token }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loaded: true, showModal: false, editEnabled: false, error: null, messages: null, data: INITIAL_SETTINGS }
  );
  
  useEffect( () => {
    if (settings) {
      if ("active" in settings) {
        setState({ data: settings });  
      }
    } else {
      setState({ editEnabled: true });  
    }
  }, [settings]);

  function updateProfile() {
    let { data } = state;
    data.active = true;
    setState({ ...state, data });
    postData();
  }

  function confirmDeactivation() {
    let { messages } = state;
    messages = "You are about to disable all reporting and analytics.  Are you sure you want to proceed?";
    setState({ ...state, messages, showModal:true });    
  }

  function disableProfile() {
    let { data } = state;
    data.active = false;
    setState({ data, showModal:false });    
    postData();
  }

  function postData() {
    setState({ loaded: false });
    const body = state.data;
    const apiCall = new ApiService("/analytics/update", {}, token, body);  
    apiCall.post()
      .then(function (response) {
        console.debug(response);
        //MAY WANT TO DO SOMETHING HERE
        toggleEditing();
      })
      .catch(function (error) {
        setState({ error: error }); 
      }).finally(function () {
        setState({ loaded: true }); 
      });
  }

  function handleOptionChange(changeEvent) {
    setState({ data: { ...state.data, dataUsage: changeEvent.target.value } });
  }

  function handleCheckBoxChange(key, event) {
    let itemId = event.target.id;
    if (itemId.includes("TOOL-")) {
      let s = state.data.enabledTools;
      s[key]=event.target.checked;
      setState({ data: { ...state.data, enabledTools: s } });
    } else { //"TYPE-"
      let s = state.data.workflowType;
      s[key]=event.target.checked;
      setState({ data: { ...state.data, workflowType: s } });
    }
  }

  function toggleEditing() {
    setState({ editEnabled: !state.editEnabled });  
  }


  const { data, loaded, messages, showModal, editEnabled, error } = state;
  const { enabledTools, disabledToolsOn, active, enabledToolsOn } = data;
  return (
    <div>
      {!loaded && <LoadingDialog />}
      { error && <ErrorDialog error={error} /> }
      {/* {!active && <InfoDialog message="Analytics are currently NOT enabled for this account." />} */}

      {showModal ? <Modal header="Confirm Deactivation" 
        message={messages} 
        button="Confirm"  
        handleHideModal={disableProfile}/> : null}

      <Card>
        <Card.Body>
          <Card.Title>Configuration Profile</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Analytics configuration details are shown below for available tools.  We offer analytics for Infrastructure and Pipeline workflows as well as many popular tools.</Card.Subtitle>
          
          <Form>
            <fieldset>
              <div className="mt-3 text-muted">Workflow:</div>
              <div key="inline-checkbox-workflow" className="mb-1 mt-2 p-2">
                {
                  ANALYTICS_TYPES.map(item => (
                    <Form.Check inline 
                      type="checkbox" 
                      label={item}
                      id={`TYPE-${item}`}
                      checked={data.workflowType ? data.workflowType[item] : false}
                      onChange={handleCheckBoxChange.bind(this, item)}
                      key={item} />
                  ))
                }
              </div>

              <div className="mt-3 text-muted">Daily Data Limit:</div>
              <div key="radio-data-limit" className="mt-1 p-2">
                {
                  DATA_LIMITS.map(item => (
                    <Form.Check inline label={item.Label} 
                      checked={state.data.dataUsage.toString() === item.Value.toString()} 
                      onChange={handleOptionChange}
                      value={item.Value.toString()} 
                      type="radio" 
                      id={`STORAGE-${item.Value}`}
                      key={item.Value} />
                  ))
                }
              </div>

              <div className="mt-3 text-muted">Tools:
                { (enabledToolsOn && !disabledToolsOn) && 
                <>
                  <span className="italic" style={{ fontSize: "smaller", paddingLeft:"10px" }}>(Enabled on&nbsp; 
                    <Moment format="MM/DD/YYYY" date={enabledToolsOn} />)
                  </span> 
                </>
                }
              </div>
              <div key="checkbox-tools" className="mb-1 mt-2 p-2 d-none">
                {
                  TOOLS.map(item => (
                    <Form.Check inline 
                      type="checkbox" 
                      label={item}
                      id={`TOOL-${item}`}
                      checked={enabledTools ? enabledTools[item] : false}
                      onChange={handleCheckBoxChange.bind(this, item)}
                      key={item} />
                  ))
                }
              </div>

              <div className="mb-3 mt-1 text-muted">
                <div>The following tools are currently supported with analytics:</div>
                
                {
                  TOOLS.map(item => (
                    <span key={item} style={{ marginRight:"5px" }}>&nbsp;{item}&nbsp;</span>
                  ))}
              </div>

              <div className="text-right">
                { !active ? 
                  <Button variant="primary" onClick={() => { updateProfile(); }}>Activate Analytics</Button> : 
                  <>
                    <Button variant="primary" className="mr-3" onClick={() => { updateProfile(); }}><FontAwesomeIcon icon={faSave} fixedWidth /> Save Settings</Button>
                    <Button variant="outline-danger" onClick={() => { confirmDeactivation(); }}>Deactivate Analytics</Button>
                  </> }
              </div> 
                
            </fieldset>

          </Form>          
        </Card.Body>
      </Card>
    </div>
  );
}

ConfigurationsForm.propTypes = {
  settings: PropTypes.object,
  token: PropTypes.string
};

export default ConfigurationsForm;