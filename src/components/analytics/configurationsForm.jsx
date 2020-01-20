import React, {useReducer, useEffect} from "react";
import PropTypes from "prop-types";
import { Card, Form, Button } from "react-bootstrap";
import LoadingDialog from "../common/loading";

const INITIAL_SETTINGS = {
  dataUsage: "500",
  active: false,
  workflowType: {Infrastructure: false, Pipeline: false},
  enabledTools: {Jenkins: true, JUnit: false, JMeter: true, Selenium: false, Sonar: false, Twistlock: false},
  enabledToolsOn: "",
  kibanaDashboardUrl: ""
};
const ANALYTICS_TYPES = ["Infrastructure", "Pipeline"];
const TOOLS = [ "Jenkins", "JUnit", "JMeter", "Selenium", "Sonar", "Twistlock" ];
const DATA_LIMITS = [{ Value: "500", Label: "500MB"}, {Value: "1000", Label: "1GB"}, {Value: "2000", Label: "2GB"}, {Value: "3000", Label: "3GB"}];


function ConfigurationsForm( { settings }) {
  //const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { loading: false, error: null, messages: null, data: INITIAL_SETTINGS}
  );
  
  useEffect( () => {
    if (!settings) {
      setState({...state, loading: true});  
    } else {
      setState({...state, loading: false});  
      if ("active" in settings) {
        setState({...state, data: settings});  
      }
    }
  }, [settings]);

  function updateProfile() {
    state.data.active = true;
    console.log("You are submitting:", state.data);
  }

  function disableProfile() {
    state.data.active = false;
    //TODO: Call confirmation modal before processing request
    console.log("You are submitting:", state.data);
  }

  function handleOptionChange(changeEvent) {
    setState({data: { ...state.data, dataUsage: changeEvent.target.value }});
  }

  function handleCheckBoxChange(key, event) {
    let itemId = event.target.id;
    if (itemId.includes("TOOL-")) {
      let s = state.data.enabledTools;
      s[key]=event.target.checked;
      setState({data: { ...state.data, enabledTools: s }});
    } else { //"TYPE-"
      let s = state.data.workflowType;
      s[key]=event.target.checked;
      setState({data: { ...state.data, workflowType: s }});
    }
  }

  const { data, loading } = state;
  const { enabledTools } = data;
  return (
    <div>
      {loading && <LoadingDialog />}

      <Card>
        <Card.Body>
          <Card.Title>Analytics Configuration</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Complete the configuration details below in order to 
          enable analytics tools.  We offer analytics for Infrastructure and Pipeline workflows as well as 
          many popular tools.</Card.Subtitle>
          
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
                    checked={state.data.dataUsage === item.Value} 
                    onChange={handleOptionChange}
                    value={item.Value} 
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
                  <Button variant="outline-danger" onClick={() => { disableProfile(); }}>Deactivate</Button>
                </>)}
            </div>
          </Form>          
        </Card.Body>
      </Card>
      <div style={{"color": "gray"}}>DATA: {state ? JSON.stringify(state) : null}</div>
    </div>
  );
}

ConfigurationsForm.propTypes = {
  settings: PropTypes.object
};

export default ConfigurationsForm;