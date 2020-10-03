import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faSave, faSpinner } from "@fortawesome/pro-light-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { DialogToastContext } from "contexts/DialogToastContext";

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
  enabled: false,
};

const INITIAL_SLACK = {
  type: "slack",
  channel: "",
  event: "finished",
  enabled: false,
};

function StepNotificationConfiguration({ data, stepId, parentCallback }) {
  const toastContext = useContext(DialogToastContext);
  const { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formDataEmail, setFormDataEmail] = useState(INITIAL_EMAIL);
  const [formDataSlack, setFormDataSlack] = useState(INITIAL_SLACK);
  const [formDataJira, setFormDataJira] = useState(INITIAL_JIRA);
  const [renderForm, setRenderForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        const stepIndex = getStepIndex(stepId);
        await loadFormData(plan[stepIndex]);
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);
      controller.abort();
    };
  }, [stepId]);


  const loadFormData = async (step) => {
    setFormDataEmail(INITIAL_EMAIL);
    setFormDataSlack(INITIAL_SLACK);
    setFormDataJira(INITIAL_JIRA);

    if (step.notification !== undefined) {
      let emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      let slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      let jiraArrayIndex = step.notification.findIndex(x => x.type === "jira");
      if (emailArrayIndex >= 0) {
        setFormDataEmail(step.notification[emailArrayIndex]);
      }
      if (slackArrayIndex >= 0) {
        setFormDataSlack(step.notification[slackArrayIndex]);
      }
      if (jiraArrayIndex >= 0) {
        setFormDataJira(step.notification[jiraArrayIndex]);
      }
    }
    setStepTool(step.tool);
    setStepName(step.name);
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let stepArrayIndex = getStepIndex(stepId);
      plan[stepArrayIndex].notification = [formDataEmail, formDataSlack, formDataJira];
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
      if (formDataSlack.channel.charAt(0) === "#") {
        toastContext.showErrorDialog("Error: Please remove the pound symbol '#' from the Slack channel name.");
        return false;
      }
      if (formDataSlack.channel.length === 0) {
        toastContext.showErrorDialog("Warning: Slack channel value missing!");
        return false;
      }
    }

    if (formDataJira.enabled) {
      if (!formDataJira.account || !formDataJira.project) {
        toastContext.showErrorDialog("Error: Cannot enable Jira notification without Account and Project settings.");
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


  return (
    <Form>
      <h6 className="upper-case-first">{typeof (stepName) !== "undefined" ? stepName + ": " : null}
        {typeof (stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6>

      <div className="text-muted mt-2 mb-3">Each step in the workflow can be configured with notification triggers upon
        completion. More help on notification configurations is available <Link to="/tools">here</Link>.
      </div>

      <div className="mt-4 mb-4">
        <Form.Check
          type="switch"
          className="mb-2"
          id="slack-switch"
          label="Slack Notifications"
          checked={formDataSlack.enabled ? true : false}
          onChange={() => setFormDataSlack({ ...formDataSlack, enabled: !formDataSlack.enabled })}
        />
        <Form.Group controlId="repoField">
          <Form.Label>Slack Channel</Form.Label>
          <Form.Control maxLength="50" type="text" disabled={!formDataSlack.enabled} placeholder=""
                        value={formDataSlack.channel || ""}
                        onChange={e => setFormDataSlack({ ...formDataSlack, channel: e.target.value })}/>
        </Form.Group>
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



      <div className="my-4 pt-3">
        <Form.Check
          type="switch" disabled
          id="jira-switch"
          className="mb-2"
          label="Jira Notifications"
          checked={formDataJira.enabled ? true : false}
          onChange={() => setFormDataJira({ ...formDataJira, enabled: !formDataJira.enabled })}
        />
        <Form.Group controlId="branchField">
          <Form.Label>Jira Account</Form.Label>
          <Form.Control maxLength="100" type="text" disabled={!formDataJira.enabled} placeholder="" value={formDataJira.account || ""} onChange={e => setFormDataJira({ ...formDataJira, account: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Jira Project</Form.Label>
          <Form.Control maxLength="100" type="text" disabled={!formDataJira.enabled} placeholder="" value={formDataJira.project || ""} onChange={e => setFormDataJira({ ...formDataJira, project: e.target.value })} />
        </Form.Group>
      </div>


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