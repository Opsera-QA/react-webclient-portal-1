import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {Form, Button, OverlayTrigger} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faSave, faSpinner } from "@fortawesome/pro-light-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { DialogToastContext } from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "./pipeline-step-notification-actions";
import {faEllipsisH, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import pipelineActions from "../../../../pipeline-actions";

const NOTIFICATION_OPTIONS = [
  {
    value: "finished",
    label: "Step Completed",
    message: "You will receive notifications on this step's completion no matter what the status.",
  },
  { value: "error", label: "On Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", label: "All Activity", message: "You will receive notifications for any activity on this step." },
];

const INITIAL_EMAIL = {
  type: "email",
  address: "",
  event: "error",
  enabled: false,
};

const INITIAL_JIRA = {
  type: "jira",
  account: "",
  project: "",
  // sprint: undefined,
  // user: undefined,
  enabled: false,
};

const INITIAL_SLACK = {
  type: "slack",
  // channel: "",
  event: "finished",
  enabled: false,
};

const INITIAL_TEAMS = {
  type: "teams",
  toolId: "",
  enabled: false,
};

function StepNotificationConfiguration({ data, stepId, parentCallback }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formDataEmail, setFormDataEmail] = useState(INITIAL_EMAIL);
  const [formDataSlack, setFormDataSlack] = useState(INITIAL_SLACK);
  const [formDataJira, setFormDataJira] = useState(INITIAL_JIRA);
  const [formDataTeams, setFormDataTeams] = useState(INITIAL_TEAMS);
  const [renderForm, setRenderForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [jiraToolId, setJiraToolId] = useState(undefined);
  const [jiraTools, setJiraTools] = useState([]);
  const [teamsTools, setTeamsTools] = useState([]);
  const [jiraProjects, setJiraProjects] = useState([]);
  const [jiraProjectUsers, setJiraProjectUsers] = useState([]);
  const [jiraSprints, setJiraSprints] = useState([]);


  useEffect(() => {
    loadData();
  }, [stepId]);

  const loadData = async () => {
    try {
      const stepIndex = getStepIndex(stepId);
      await loadFormData(plan[stepIndex]);
      // await loadJiraTools();
      await loadTeamsTools();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setRenderForm(true);
    }
  };

  const loadJiraTools = async () => {
    const response = await pipelineActions.getToolsList("jira", getAccessToken);
    setJiraTools(response);
  };

  const loadTeamsTools = async () => {
    const response = await pipelineActions.getToolsList("teams", getAccessToken);
    setTeamsTools(response);
  };

  const loadJiraProjects = async (toolId = jiraToolId) => {
    const response = await pipelineStepNotificationActions.getJiraProjects(toolId, getAccessToken);
    console.log("Jira loadJiraProjects: " + JSON.stringify(response.data));
    setJiraProjects(response.data);
  };

  const loadJiraProjectUsers = async (toolId = jiraToolId) => {
    const response = await pipelineStepNotificationActions.getJiraProjectUsers(toolId, getAccessToken);
    console.log("Jira loadJiraProjectUsers: " + JSON.stringify(response.data));
    setJiraProjectUsers(response.data);
  };

  const loadJiraSprints = async (toolId = jiraToolId) => {
    const response = await pipelineStepNotificationActions.getJiraSprints(toolId, getAccessToken);
    console.log("Jira loadJiraSprints: " + JSON.stringify(response.data));
    setJiraSprints(response.data);
  };


  const loadFormData = async (step) => {
    setFormDataEmail(INITIAL_EMAIL);
    setFormDataSlack(INITIAL_SLACK);
    setFormDataJira(INITIAL_JIRA);
    setFormDataTeams(INITIAL_TEAMS);

    if (step.notification !== undefined) {
      let emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      let slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      let jiraArrayIndex = step.notification.findIndex(x => x.type === "jira");
      let teamsArrayIndex = step.notification.findIndex(x => x.type === "teams");
      if (emailArrayIndex >= 0) {
        setFormDataEmail(step.notification[emailArrayIndex]);
      }
      if (slackArrayIndex >= 0) {
        setFormDataSlack(step.notification[slackArrayIndex]);
      }
      if (jiraArrayIndex >= 0) {
        // console.log("Jira Form Data: " + step.notification[jiraArrayIndex]);
        setFormDataJira(step.notification[jiraArrayIndex]);
      }
      if (teamsArrayIndex >= 0) {
        // console.log("Teams Form Data: " + step.notification[teamsArrayIndex]);
        setFormDataTeams(step.notification[teamsArrayIndex]);
      }
    }
    setStepTool(step.tool);
    setStepName(step.name);
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let stepArrayIndex = getStepIndex(stepId);
      plan[stepArrayIndex].notification = [formDataEmail, formDataSlack, formDataJira, formDataTeams];
      await parentCallback(plan);
      setIsSaving(false);
    }
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id);
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {
    if (formDataEmail.enabled) {
      if (formDataEmail.address.length === 0 || !emailIsValid(formDataEmail.address)) {
        toastContext.showErrorDialog("Warning:  Email address missing or invalid!");
        return false;
      }
    }

    if (formDataSlack.enabled) {
      // if (formDataSlack.channel.charAt(0) === "#") {
      //   toastContext.showErrorDialog("Error: Please remove the pound symbol '#' from the Slack channel name.");
      //   return false;
      // }
      // if (formDataSlack.channel.length === 0) {
      //   toastContext.showErrorDialog("Warning: Slack channel value missing!");
      //   return false;
      // }
    }

    if (formDataJira.enabled) {
      // if (!formDataJira.account || !formDataJira.project) {
      //   toastContext.showErrorDialog("Error: Cannot enable Jira notification without Account and Project settings.");
      //   return false;
      // }
    }

    if (formDataTeams.enabled) {
      if (!formDataTeams.toolId) {
        toastContext.showErrorDialog("Error: Cannot enable Teams notification without tool selected.");
        return false;
      }
    }

    return true;
  };

  const handleEmailServiceChange = (selectedOption) => {
    setFormDataEmail({ ...formDataEmail, event: selectedOption.value });
  };

  const handleSlackServiceChange = (selectedOption) => {
    setFormDataSlack({ ...formDataSlack, event: selectedOption.value });
  };

  const handleJiraServiceChange = (selectedOption) => {
    setFormDataJira({ ...formDataJira, event: selectedOption.value });
  };


  const handleJiraToolChange = async (selectedOption) => {
    let toolId = selectedOption.id;
    await setJiraToolId(toolId);
    await loadJiraProjects(toolId);
    // await loadJiraProjectUsers(toolId);
    // await loadJiraSprints(toolId);

    console.log("Selected option: " + JSON.stringify(selectedOption));
    setFormDataJira({
      ...formDataJira,
      account: "",
      project: "",
      // sprint: "undefined",
      // user: undefined,
    });
  };

  const handleTeamsToolChange = async (selectedOption) => {
    let toolId = selectedOption.id;
    console.log("Selected option: " + JSON.stringify(selectedOption));
    setFormDataTeams({
      ...formDataTeams,
      toolId: toolId,
    });
  };

  const getJiraCredentialsField = () => {
    if (jiraTools == null || jiraTools.length === 0) {
      // TODO: Create generic component for pipeline tool not found message
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No JIRA tools have been registered for <span className="upper-case-first">Jira</span>.
          Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
          proceed.
        </div>
      )
    }

    return (
      <DropdownList
        data={jiraTools}
        value={jiraTools[jiraTools.findIndex((x) => x.id === formDataJira.account)]}
        valueField="id"
        textField="name"
        placeholder="Please select an account"
        filter="contains"
        onChange={handleJiraToolChange}
      />
    );
  };

  const getTeamsCredentialsField = () => {

    if (teamsTools == null || teamsTools.length === 0) {
      // TODO: Create generic component for tool not found message
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Teams tools have been registered for <span className="upper-case-first">Teams</span>.
          Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
          proceed.
        </div>
      )
    }

    return (
      <DropdownList
        data={teamsTools}
        value={teamsTools[teamsTools.findIndex((x) => x.id === formDataTeams.toolId)]}
        valueField="id"
        textField="name"
        placeholder="Please select a tool with Teams connection"
        filter="contains"
        onChange={handleTeamsToolChange}
      />
    );
  };

  const getSlackFormFields = () => {
    return (
      <div className="mt-4 mb-4">
        <Form.Check
          type="switch"
          className="mb-2"
          id="slack-switch"
          label="Slack Notifications"
          checked={formDataSlack.enabled ? true : false}
          onChange={() => setFormDataSlack({ ...formDataSlack, enabled: !formDataSlack.enabled })}
        />
        {/*<Form.Group controlId="repoField">*/}
        {/*  <Form.Label>Slack Channel</Form.Label>*/}
        {/*  <Form.Control maxLength="50" type="text" disabled={!formDataSlack.enabled} placeholder=""*/}
        {/*                value={formDataSlack.channel || ""}*/}
        {/*                onChange={e => setFormDataSlack({ ...formDataSlack, channel: e.target.value })}/>*/}
        {/*</Form.Group>*/}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {renderForm ?
            <DropdownList
              data={NOTIFICATION_OPTIONS}
              disabled={!formDataSlack.enabled}
              valueField='id'
              textField='label'
              defaultValue={NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataSlack.event)]}
              onChange={handleSlackServiceChange}
            /> : null}

          <small className="form-text text-muted">
            Please Note: You must enter a valid Slack token in
            <Link to="/tools"><FontAwesomeIcon icon={faLink} className="ml-1"/>API
              Tools</Link> in order to use this feature.
          </small>

        </Form.Group>
      </div>
    );
  };

  const getTeamsFormFields = () => {
    if (!renderForm) {
      return null;
    }

    return (
      <div className="mt-4 mb-4">
        <Form.Check
          type="switch"
          className="mb-2"
          id="teams-switch"
          label="Teams Notifications"
          checked={formDataTeams.enabled}
          onChange={() => setFormDataTeams({ ...formDataTeams, enabled: !formDataTeams.enabled })}
        />
        {formDataTeams.enabled && getTeamsCredentialsField()}
      </div>
    );
  };

  const getJiraFormFields = () => {
    return (
      <div className="my-4 pt-3">
        <Form.Check
          type="switch"
          id="jira-switch"
          className="mb-2"
          label="Jira Notifications"
          checked={formDataJira.enabled}
          onChange={() => setFormDataJira({ ...formDataJira, enabled: !formDataJira.enabled })}
        />
        {renderForm && formDataJira.enabled &&
          <>
            <Form.Label className="w-100">
              JIRA Credentials*
              {/*<FontAwesomeIcon*/}
              {/*  icon={faEllipsisH}*/}
              {/*  className="fa-pull-right pointer pr-1"*/}
              {/*  onClick={() => document.body.click()}*/}
              {/*/>*/}
            </Form.Label>
            {getJiraCredentialsField()}
            {formDataJira.account != null && formDataJira.account !== "" &&
              <>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Jira Project</Form.Label>
                  <DropdownList
                    data={NOTIFICATION_OPTIONS}
                    valueField='id'
                    disabled={!formDataJira.enabled}
                    textField='label'
                    value={formDataJira.project}
                    onChange={(option) => setFormDataJira({...formDataJira, project: option.value})}
                  />
                </Form.Group>
                {formDataJira.project != null && formDataJira.project !== "" &&
                  <>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Project Users</Form.Label>
                      <DropdownList
                        data={NOTIFICATION_OPTIONS}
                        valueField='id'
                        disabled={!formDataJira.enabled}
                        textField='label'
                        value={formDataJira.user}
                        onChange={(option) => setFormDataJira({...formDataJira, user: option.value})}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Sprint or Parent Story</Form.Label>
                      <DropdownList
                        data={NOTIFICATION_OPTIONS}
                        valueField='id'
                        disabled={!formDataJira.enabled}
                        textField='label'
                        value={formDataJira.sprint}
                        onChange={(option) => setFormDataJira({...formDataJira, sprint: option.value})}
                      />
                    </Form.Group>
                  </>}
              </>}
          </>}
      </div>
    );
  };

  const getEmailFormFields = () => {
    return (
      <div className="my-4 pt-3">
        <Form.Check
          type="switch" disabled
          id="email-switch"
          className="mb-2"
          label="Email Notifications"
          checked={formDataEmail.enabled ? true : false}
          onChange={() => setFormDataEmail({ ...formDataEmail, enabled: !formDataEmail.enabled })}
        />
        <Form.Group controlId="branchField">
          <Form.Label>Email Address</Form.Label>
          <Form.Control maxLength="100" type="text" disabled={!formDataEmail.enabled} placeholder=""
                        value={formDataEmail.address || ""}
                        onChange={e => setFormDataEmail({ ...formDataEmail, address: e.target.value })}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {renderForm ?
            <DropdownList
              data={NOTIFICATION_OPTIONS}
              valueField='id'
              disabled={!formDataEmail.enabled}
              textField='label'
              defaultValue={NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataEmail.event)]}
              onChange={handleEmailServiceChange}
            /> : null}
        </Form.Group>
      </div>
    )
  }


  return (
    <Form>
      <h6 className="upper-case-first">{typeof (stepName) !== "undefined" ? stepName + ": " : null}
        {typeof (stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6>

      <div className="text-muted mt-2 mb-3">Each step in the workflow can be configured with notification triggers upon
        completion. More help on notification configurations is available <Link to="/tools">here</Link>.
      </div>

      {getSlackFormFields()}
      {getTeamsFormFields()}
      {/*{getJiraFormFields()}*/}
      {getEmailFormFields()}

      <Button variant="primary"
              type="button"
              disabled={isSaving}
              onClick={() => {
                callbackFunction();
              }}>
        {isSaving ?
          <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</> :
          <><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</>}
      </Button>

      {/* <small className="form-text text-muted mt-2 text-right">* Required Fields</small> */}
    </Form>
  );
}


const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


StepNotificationConfiguration.propTypes = {
  data: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
};

export default StepNotificationConfiguration;