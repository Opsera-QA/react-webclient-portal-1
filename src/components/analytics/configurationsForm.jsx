import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Accordion, Card, Form, Button, Row, Col } from "react-bootstrap";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { axiosApiService } from "../../api/apiService";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
//import Multiselect from "react-widgets/lib/Multiselect";
import createHistory from 'history/createBrowserHistory'

const INITIAL_SETTINGS = {
  dataUsage: "500",
  active: false,
  workflowType: { Infrastructure: false, Pipeline: true },
  enabledTools: ["Jenkins", "JUnit", "JMeter", "Selenium", "Sonar", "Twistlock"],
  enabledToolsOn: "",
  updatedToolsOn: "",
  disabledToolsOn: "",
  hitsIndex: 0,
  analyticsConfiguration: {},
  personaConfiguration: {},
  dashboardConfiguration: {},
  analyticsServerUrl: "",
  customerDB: {},
  allowData: false,
  defaultPersona: "",
};
const ANALYTICS_TYPES = ["Infrastructure", "Pipeline"];
const PERSONAS = [{ value: "developer", label: "Developer" }, {
  value: "manager",
  label: "Manager",
}, { value: "executive", label: "Executive" }];
const DATA_LIMITS = [{ Value: "0", Label: "Inactive" }, { Value: "500", Label: "500MB" }, {
  Value: "1",
  Label: "1GB",
}, { Value: "2", Label: "2GB" }, { Value: "3", Label: "3GB" }];
const TOOL_OPTIONS = [
  { value: "Jenkins", label: "Jenkins" },
  { value: "Codeship", label: "Codeship" },
  { value: "JUnit", label: "JUnit" },
  { value: "Xunit", label: "Xunit" },
  { value: "JMeter", label: "JMeter" },
  { value: "Selenium", label: "Selenium" },
  { value: "Sonar", label: "Sonar" },
  { value: "Twistlock", label: "Twistlock" },
];

function ConfigurationsForm({ settings, token }) {

  console.log(settings);

  const history = createHistory();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      loaded: true,
      showModal: false,
      error: null,
      info: null,
      messages: null,
      data: INITIAL_SETTINGS,
      editSettings: false,
    },
  );

  useEffect(() => {
    if (settings) {
      if ("active" in settings) {
        setState({ data: settings });
      }
    }
  }, [settings]);

  async function updateProfile() {
    setState({ error: null });
    let { data } = state;
    let { profile } = settings;

    if (!Array.isArray(profile) || !profile.length) {
      await createProfile();
    } else {
      data.active = true;
      data.enabledToolsOn = new Date().toISOString();
      setState({ ...state, data });
      await postData(data);
    }

    //this needs to trigger a full reload of app for now because so many queries checik on the status of this record.
    history.go(0);
  }

  function confirmDeactivation() {
    let { messages } = state;
    messages = "You are about to disable all reporting and analytics.  Are you sure you want to proceed?";
    setState({ ...state, messages, showModal: true });
  }

  async function disableProfile() {
    let { data } = state;
    data.active = false;
    data.enabledToolsOn = null;
    data.disabledToolsOn = new Date().toISOString();
    setState({ data, showModal: false });
    await postData(data);
    history.go(0);
  }

  async function postData(postBody) {
    setState({ loaded: false, error: null, info: null });
    console.log("postBody", postBody);
    const apiUrl = `/analytics/profile/${settings._id}/update`;
    const res = await axiosApiService(token).post(apiUrl, postBody);
    console.log(res);
    setState({ info: "Your analytics profile has been updated successfully." });
    setState({ loaded: true });
  }

  async function createProfile() {
    setState({ loaded: false, error: null, info: null });
    const apiUrl = "/analytics/profile/create";
    const res = await axiosApiService(token).post(apiUrl, {});
    console.log(res);
    setState({ info: "Your analytics profile has been created successfully." });
    setState({ loaded: true });
  }

  function handleCancel() {
    setState({ showModal: false });
  }

  function handleOptionChange(changeEvent) {
    setState({ data: { ...state.data, dataUsage: changeEvent.target.value } });
  }

  function handleCheckBoxChange(key, event) {
    let itemId = event.target.id;
    if (itemId.includes("WORKFLOW-TYPE-")) {
      let s = state.data.workflowType;
      s[key] = event.target.checked;
      setState({ data: { ...state.data, workflowType: s } });
    }
  }

  /* function handleDropDownChange (event) {
    console.log(event.target);
    console.log(event.target.id);
    
    if (event.target.id.includes("PERSONA-SELECT")) {
      setState({ data: { ...state.data, defaultPersona: event.target.value } });
    } else if (event.target.id.includes("TOOL-SELECT")) {
      let selected = [...event.target]
        .filter(option => option.selected)
        .map(option => option.value);
      setState({ data: { ...state.data, enabledTools: selected } });
    }
  } */

  function handleMultiSelectToolChange(selectedOption) {
    setState({
      data: {
        ...state.data,
        enabledTools: selectedOption ? selectedOption.map(option => option.value) : {},
      },
    });
  }

  function handleSelectPersonaChange(selectedOption) {
    setState({ data: { ...state.data, defaultPersona: selectedOption.value } });
  }

  function handleClickSettings() {
    setState({ editSettings: !state.editSettings });
  }


  const { data, messages, showModal, error, info, editSettings } = state;
  const { enabledTools, disabledToolsOn, active, enabledToolsOn, defaultPersona } = data;
  return (
    <div>
      {error && <ErrorDialog error={error}/>}
      {info && <InfoDialog message={info}/>}

      {showModal ? <Modal header="Confirm Deactivation"
                          message={messages}
                          button="Confirm"
                          handleCancelModal={handleCancel}
                          handleConfirmModal={disableProfile}/> : null}

      {!settings.enabledToolsOn ?
        <Card>
          <Card.Body>
            <Card.Title>Getting Started</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Welcome to the OpsERA Analytics Portal! Here you can enable analytics for our supported tools and
              dashboards and metrics around your system`s activities. Simply click the \
              Activate Analytics button below and then begin configuring your dashboards!</Card.Subtitle>

            <div className="mt-4">
              <Button variant="outline-primary" onClick={() => {
                updateProfile();
              }}>Activate Analytics</Button>
            </div>
          </Card.Body>
        </Card>
        :
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Row className="card-header-clickable" onClick={() => {
                handleClickSettings();
              }}>
                <Col><span className="h6">Analytics Settings</span></Col>
                <Col className="text-right">
                  {(enabledToolsOn && !disabledToolsOn) &&
                  <>
                      <span className="italic pr-3" style={{ fontSize: "smaller" }}>Enabled on&nbsp;
                        {format(new Date(enabledToolsOn), "yyyy-MM-dd', 'hh:mm a")}
                      </span>
                  </>
                  }
                  <FontAwesomeIcon icon={faAngleDown} fixedWidth size="lg" rotation={editSettings ? 180 : null}/></Col>
              </Row>

            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <fieldset>
                    {/*<div className="mt-1 text-muted">Tools:</div>
                    <div key="checkbox-tools" className="mb-1 mt-2 p-2">
                      <Multiselect
                        data={TOOL_OPTIONS} 
                        className="basic-multi-select"
                        valueField='value'
                        textField='label'
                        disabled
                        defaultValue={enabledTools.length > 0 ? TOOL_OPTIONS.filter(e => enabledTools ? enabledTools.indexOf(e.value) !== -1 : TOOL_OPTIONS[0]) : []}
                        onChange={handleMultiSelectToolChange}             
                      />
                    </div>*/}

                    <div className="mt-3 text-muted">Workflow:</div>
                    <div key="inline-checkbox-workflow" className="mb-1 mt-2 p-2">
                      {
                        ANALYTICS_TYPES.map(item => (
                          <Form.Check inline
                                      type="checkbox"
                                      label={item}
                                      id={`WORKFLOW-TYPE-${item}`}
                                      checked={data.workflowType ? data.workflowType[item] : false}
                                      onChange={handleCheckBoxChange.bind(this, item)}
                                      key={item}/>
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
                                      key={item.Value}/>
                        ))
                      }
                    </div>

                    <div className="mt-3 text-muted">Default Persona:</div>
                    <div key="checkbox-persona" className="mb-3 mt-2 p-2">
                      <DropdownList
                        data={PERSONAS}
                        className="basic-single"
                        valueField='value'
                        textField='label'
                        defaultValue={defaultPersona ? defaultPersona : PERSONAS[0]}
                        onChange={handleSelectPersonaChange}
                      />
                    </div>

                    <div className="text-right">
                      <Button variant="outline-primary" className="mr-3" onClick={() => {
                        updateProfile();
                      }}><FontAwesomeIcon icon={faSave} fixedWidth/> Save Settings</Button>
                      <Button variant="outline-danger" onClick={() => {
                        confirmDeactivation();
                      }}>Deactivate Analytics</Button>
                    </div>

                  </fieldset>

                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>}
    </div>
  );
}

ConfigurationsForm.propTypes = {
  settings: PropTypes.array,
  token: PropTypes.string,
};

export default ConfigurationsForm;