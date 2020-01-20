import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Form, Button } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { ApiService } from "../../api/apiService";

const INITIAL_SETTINGS = {
  dataUsage: "500",
  active: false,
  workflowType: { Infrastructure: false, Pipeline: false },
  enabledTools: { Jenkins: true, JUnit: true, JMeter: true, Selenium: true, Sonar: true, Twistlock: true },
  enabledToolsOn: "",
  kibanaDashboardUrl: ""
};
const ANALYTICS_TYPES = ["Infrastructure", "Pipeline"];
const TOOLS = [ "Jenkins", "JUnit", "JMeter", "Selenium", "Sonar", "Twistlock" ];
const DATA_LIMITS = [{ Value: "500", Label: "500MB" }, { Value: "1000", Label: "1GB" }, { Value: "2000", Label: "2GB" }, { Value: "3000", Label: "3GB" }];


function ConfigurationsForm( { settings, token }) {
  //const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loaded: true, showModal: false, error: null, messages: null, data: INITIAL_SETTINGS }
  );
  
  useEffect( () => {
    if (settings) {
      if ("active" in settings) {
        setState({ ...state, data: settings });  
      }
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
    setState({ ...state, data, showModal:false });    
    postData();
  }

  function postData() {
    console.log("POSTING DATA TOP !");
    setState({ ...state, loaded: false });
    const body = state.data;
    const apiCall = new ApiService("/analytics/update", {}, token, body);  
    apiCall.post()
      .then(function (response) {
        console.debug(response);
        //MAY WANT TO DO SOMETHING HERE
      })
      .catch(function (error) {
        setState({ ...state, error: error }); 
      }).finally(function () {
        setState({ ...state, loaded: true }); 
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


  const { data, loaded, messages, showModal } = state;
  const { enabledTools, active } = data;
  return (
    <div>
      {!loaded && <LoadingDialog />}
      { state.error && <ErrorDialog error={state.error} /> }
      {!active && <InfoDialog message="Analytics are currently NOT enabled for this account." />}

      {showModal ? <Modal header="Confirm Deactivation" 
        message={messages} 
        button="Confirm"  
        handleHideModal={disableProfile}/> : null}

      <Card>
        <Card.Body>
          <Card.Title>Analytics Configuration</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Complete the configuration details below in order to enable analytics tools.  We offer analytics for Infrastructure and Pipeline workflows as well as many popular tools.</Card.Subtitle>
          
          <Form>
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

            <div className="mt-3 text-muted">Tools:</div>
            <div key="checkbox-tools" className="mb-1 mt-2 p-2">
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

            <div className="text-right">
              { !state.data.active ? 
                <Button variant="outline-primary" onClick={() => { updateProfile(); }}>Activate</Button> : 
                (<>
                  <Button variant="outline-primary" className="mr-3" onClick={() => { updateProfile(); }}>Update</Button>
                  <Button variant="outline-danger" onClick={() => { confirmDeactivation(); }}>Deactivate</Button>
                </>)}
            </div>
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