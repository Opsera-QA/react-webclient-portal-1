import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faSave, faSpinner} from "@fortawesome/pro-light-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import jiraStepNotificationMetadata from "./jira/jiraStepNotificationMetadata";
import Model from "../../../../../../../core/data_model/model";
import JiraStepNotificationToolInput from "./jira/JiraStepNotificationToolInput";
import JiraStepNotificationProjectInput from "./jira/JiraStepNotificationProjectInput";
import JiraStepNotificationProjectUserInput from "./jira/JiraStepNotificationProjectUserInput";
import JiraStepNotificationBoardInput from "./jira/JiraStepNotificationBoardInput";
import JiraStepNotificationSprintInput from "./jira/JiraStepNotificationSprintInput";
import JiraStepNotificationPriorityInput from "./jira/JiraStepNotificationPriorityInput";
import TeamsStepNotificationToolInput from "./teams/TeamsStepNotificationToolInput";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import teamsStepNotificationMetadata from "./teams/teamsStepNotificationMetadata";
import NotificationsToggle from "./NotificationsToggle";
import NotificationLevelInput from "./NotificationLevelInput";
import JiraStepNotificationWorkflowStepInput from "./jira/JiraStepNotificationWorkflowStepInput";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import JiraStepNotificationParentTicketInput from "./jira/JiraStepNotificationParentTicketInput";

const NOTIFICATION_OPTIONS = [
  {
    value: "finished",
    label: "Step Completed",
    message: "You will receive notifications on this step's completion no matter what the status.",
  },
  { value: "error", label: "On Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", label: "All Activity", message: "You will receive notifications for any activity on this step." },
];

// TODO: Convert email section to use DTO components
const INITIAL_EMAIL = {
  type: "email",
  address: "",
  event: "error",
  enabled: false,
};

// TODO: Convert slack section to use DTO components
const INITIAL_SLACK = {
  type: "slack",
  // channel: "",
  event: "finished",
  enabled: false,
};

function StepNotificationConfiguration({ data, stepId, parentCallback, handleCloseClick }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formDataEmail, setFormDataEmail] = useState(INITIAL_EMAIL);
  const [formDataSlack, setFormDataSlack] = useState(INITIAL_SLACK);
  const [jiraDto, setJiraDto] = useState(undefined);
  const [teamsDto, setTeamsDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    loadData();
  }, [stepId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const stepIndex = getStepIndex(stepId);
      await loadFormData(plan[stepIndex]);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadFormData = async (step) => {
    setFormDataEmail(INITIAL_EMAIL);
    setFormDataSlack(INITIAL_SLACK);
    setJiraDto(new Model({...jiraStepNotificationMetadata.newObjectFields}, jiraStepNotificationMetadata, true));
    setTeamsDto(new Model({...teamsStepNotificationMetadata.newObjectFields}, teamsStepNotificationMetadata, true));

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
        let jiraFormData = step.notification[jiraArrayIndex];
        setJiraDto(new Model(jiraFormData, jiraStepNotificationMetadata, false));
      }
      if (teamsArrayIndex >= 0) {
        let teamsFormData = step.notification[teamsArrayIndex];
        setTeamsDto(new Model(teamsFormData, teamsStepNotificationMetadata, false));
      }
    }
    setStepTool(step.tool);
    setStepName(step.name);
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let stepArrayIndex = getStepIndex(stepId);
      plan[stepArrayIndex].notification = [formDataEmail, formDataSlack, jiraDto.getPersistData(), teamsDto.getPersistData()];
      await parentCallback(plan);
      setIsSaving(false);
    }
  };

  const getStepIndex = (step_id) => {
    return plan.findIndex(x => x._id === step_id);
  };

  const validateRequiredFields = () => {
    if (formDataEmail.enabled) {
      if (formDataEmail.address.length === 0 || !emailIsValid(formDataEmail.address)) {
        toastContext.showErrorDialog("Warning:  Email address missing or invalid!");
        return false;
      }
    }

    if (jiraDto.getData("enabled") === true && !jiraDto.isModelValid2()) {
      toastContext.showErrorDialog("Error: Cannot enable Jira notification without all fields filled out.");
      return false;
    }

    if (teamsDto.getData("enabled") === true && !teamsDto.isModelValid2()) {
      toastContext.showErrorDialog("Error: Cannot enable Teams notification without tool selected.");
      return false;
    }

    return true;
  };

  const handleEmailServiceChange = (selectedOption) => {
    setFormDataEmail({ ...formDataEmail, event: selectedOption.value });
  };

  const handleSlackServiceChange = (selectedOption) => {
    setFormDataSlack({ ...formDataSlack, event: selectedOption.value });
  };

  const getSlackFormFields = () => {
    return (
      <div className="my-4 px-2">
        <Form.Check
          type="switch"
          className="mb-2"
          id="slack-switch"
          label="Slack Notifications"
          checked={formDataSlack.enabled}
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
          {!isLoading ?
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
    if (isLoading || teamsDto == null) {
      return null;
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={teamsDto} setDataObject={setTeamsDto} fieldName={"enabled"} />
        <TeamsStepNotificationToolInput setDataObject={setTeamsDto} dataObject={teamsDto} />
      </div>
    );
  };

  const getJiraFormFields = () => {
    if (isLoading || jiraDto == null) {
      return null;
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={jiraDto} setDataObject={setJiraDto} />
        <NotificationLevelInput dataObject={jiraDto} setDataObject={setJiraDto} fieldName={"jiraNotificationLevel"} />
        <JiraStepNotificationToolInput setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationPriorityInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationProjectInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationProjectUserInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationBoardInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationSprintInput jiraToolId={jiraDto.getData("jiraToolId")} jiraBoard={jiraDto.getData("jiraBoard")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationParentTicketInput jiraToolId={jiraDto.getData("jiraToolId")} jiraSprintId={jiraDto.getData("jiraSprint")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraOpenStep"} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraClosureStep"} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraApprovalStep"} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraRejectionStep"} />
      </div>
    );
  };

  const getEmailFormFields = () => {
    return (
      <div className="my-4 px-2">
        <Form.Check
          type="switch" disabled
          id="email-switch"
          className="mb-2"
          label="Email Notifications"
          checked={formDataEmail.enabled}
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
          {!isLoading ?
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

  if (isLoading) {
    return <LoadingDialog message={"Loading Notification Configuration"} size={"sm"} />;
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
      {getJiraFormFields()}
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

      <Button variant="secondary" type="button" className="ml-2" disabled={isSaving}
              onClick={() => {
                handleCloseClick();
              }}>
        <FontAwesomeIcon icon={faTimes} className="mr-1"/> Close
      </Button>

      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
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
  handleCloseClick: PropTypes.func,
};

export default StepNotificationConfiguration;