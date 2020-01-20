import React, {useReducer, useEffect} from "react";
import PropTypes from "prop-types";
import { Card, Form, Button } from "react-bootstrap";


const settingObject = {
  dataUsage: "500",
  active: false,
  type: [],
  enabledTools: [],
  enabledToolsOn: "",
  kibanaDashboardUrl: ""
};

const toolsCheckboxes = [ "Jenkins", "JUnit", "JMeter", "Selenium", "Sonar", "Twistlock" ];

function ConfigurationsForm( { settings }) {
  //const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { loaded: false, error: null, messages: null, data: settingObject}
  );
  
  useEffect( () => {
    //setState({fetching: true});
    if (settings){
      setState({data: {dataUsage: settings.dataUsage}});
      setState({data: {active: settings.active}});
      setState({data: {type: settings.type}});
      setState({data: {enabledTools: settings.enabledTools}});
      //setState({data: {enabledToolsOn: settings.enabledToolsOn}});
      //setState({data: {kibanaDashboardUrl: settings.kibanaDashboardUrl}});
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
    let s = state.data.enabledTools;
    s[key]=event.target.checked;
    setState({data: { ...state.data, enabledTools: s }});
    console.log("enabledTools: ", state.data.enabledTools);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Analytics Configuration</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Complete the configuration details below in order to 
          enable analytics tools.  We offer analytics for Infrastructure and Pipeline workflows as well as 
          many popular tools.</Card.Subtitle>
          
          <Form>
            <div className="mt-3 text-muted">Workflow:</div>
            <div key="inline-checkbox-workflow" className="mb-1 mt-2 p-2">
              <Form.Check inline label="Infrastructure" type="checkbox" id="inline-checkbox-workflow-1" />
              <Form.Check inline label="Pipeline" type="checkbox" id="inline-checkbox-workflow-2" />
            </div>

            <div className="mt-3 text-muted">Daily Data Limit:</div>
            <div key="radio-data-limit" className="mt-1 p-2">
              {/* TODO: Refactor this like checkbox */}
              <Form.Check inline label="500 MB" 
                checked={state.data.dataUsage === "500"} 
                onChange={handleOptionChange}
                value="500" 
                type="radio" 
                id="radio-limit-500" />
              <Form.Check inline label="1 GB" 
                checked={state.data.dataUsage === "1000"} 
                onChange={handleOptionChange} 
                value="1000" 
                type="radio" 
                id="radio-limit-1000" />
              <Form.Check inline label="2 GB" 
                checked={state.data.dataUsage === "2000"} 
                onChange={handleOptionChange} 
                type="radio" 
                value="2000" 
                id="radio-limit-2000" />
              <Form.Check inline label="3 GB" 
                checked={state.data.dataUsage === "3000"} 
                onChange={handleOptionChange} 
                type="radio" 
                value="3000" 
                id="radio-limit-3000" />
            </div>

            <div className="mt-3 text-muted">Tools:</div>
            <div key="checkbox-tools" className="mb-1 mt-2 p-2">
              {/* TODO: Checked funciton isnt' working yet */}
              {
                toolsCheckboxes.map(item => (
                  <>
                    <Form.Check inline 
                      type="checkbox" 
                      label={item}
                      defaultChecked={state.data.enabledTools[item]}
                      onChange={handleCheckBoxChange.bind(this, item)}
                      key={item} />
                    {/* {JSON.stringify(state.data.enabledTools.Jenkins.value)} */}
                  </>
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
    </div>
  );
}

ConfigurationsForm.propTypes = {
  settings: PropTypes.object
};

export default ConfigurationsForm;