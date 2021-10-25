import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList, faSave, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import jiraStepNotificationMetadata from "./jira/jiraStepNotificationMetadata";
import Model from "../../../../../../../core/data_model/model";
import JiraStepNotificationToolInput from "./jira/JiraStepNotificationToolInput";
import JiraStepNotificationProjectInput from "./jira/JiraStepNotificationProjectInput";
import JiraStepNotificationProjectUsersMultiSelectInput from "./jira/JiraStepNotificationProjectUsersMultiSelectInput";
import JiraStepNotificationBoardInput from "./jira/JiraStepNotificationBoardInput";
import JiraStepNotificationSprintInput from "./jira/JiraStepNotificationSprintInput";
import JiraStepNotificationPriorityInput from "./jira/JiraStepNotificationPriorityInput";
import TeamsStepNotificationToolInput from "./teams/TeamsStepNotificationToolInput";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import teamsStepNotificationMetadata from "./teams/teamsStepNotificationMetadata";
import serviceNowStepNotificationMetadata from "./servicenow/serviceNowStepNotificationMetadata";
import NotificationsToggle from "./NotificationsToggle";
import NotificationLevelInput from "./NotificationLevelInput";
import JiraStepNotificationWorkflowStepInput from "./jira/JiraStepNotificationWorkflowStepInput";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import JiraStepNotificationParentTicketInput from "./jira/JiraStepNotificationParentTicketInput";
import slackStepNotificationMetadata from "./slack/slackStepNotificationMetadata";
import emailStepNotificationMetadata from "./email/emailStepNotificationMetadata";
import jiraStepApprovalMetadata from "./jira/jiraStepApprovalMetadata";
import SlackStepNotificationToolInput from "./slack/SlackStepNotificationToolInput";
import ServiceNowStepNotificationToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/servicenow/ServiceNowStepNotificationToolSelectInput";
import JiraStepNotificationProjectUserInput from "./jira/JiraStepNotificationProjectUserInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ServiceNowUserSelectInput from "./servicenow/ServiceNowUserSelectInput";
import ServiceNowGroupSelectInput from "./servicenow/ServiceNowGroupSelectInput";

function StepNotificationConfiguration({ data, stepId, parentCallback, handleCloseClick }) {
  const toastContext = useContext(DialogToastContext);
  const { plan } = data.workflow;
  const [step, setStep] = useState(undefined);
  const [stepName, setStepName] = useState(undefined);
  const [stepTool, setStepTool] = useState({});
  const [jiraDto, setJiraDto] = useState(undefined);
  const [teamsDto, setTeamsDto] = useState(undefined);
  const [slackDto, setSlackDto] = useState(undefined);
  const [emailDto, setEmailDto] = useState(undefined);
  const [serviceNowDto, setServiceNowDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    loadData();
  }, [stepId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const stepIndex = getStepIndex(stepId);
      let step = plan[stepIndex];
      setStep(step);

      if (step.tool.tool_identifier === "approval") {
        await loadConfiguration(step, jiraStepApprovalMetadata);
      }
      else {
        await loadConfiguration(step, jiraStepNotificationMetadata);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // TODO: Tighten up
  const loadConfiguration = async (step, jiraStepMetadata) => {
    setEmailDto(new Model({...emailStepNotificationMetadata.newObjectFields}, emailStepNotificationMetadata, true));
    setSlackDto(new Model({...slackStepNotificationMetadata.newObjectFields}, slackStepNotificationMetadata, true));
    setJiraDto(new Model({...jiraStepMetadata.newObjectFields}, jiraStepMetadata, true));
    setTeamsDto(new Model({...teamsStepNotificationMetadata.newObjectFields}, teamsStepNotificationMetadata, true));
    setServiceNowDto(new Model({...serviceNowStepNotificationMetadata.newObjectFields}, serviceNowStepNotificationMetadata, true));

    if (step.notification !== undefined) {
      let emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      let slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      let jiraArrayIndex = step.notification.findIndex(x => x.type === "jira");
      let teamsArrayIndex = step.notification.findIndex(x => x.type === "teams");
      let serviceNowArrayIndex = step.notification.findIndex(x => x.type === "servicenow");
      if (emailArrayIndex >= 0) {
        let emailFormData = step.notification[emailArrayIndex];
        setEmailDto(new Model(emailFormData, emailStepNotificationMetadata, false));
      }
      if (slackArrayIndex >= 0) {
        let slackFormData = step.notification[slackArrayIndex];
        setSlackDto(new Model(slackFormData, slackStepNotificationMetadata, false));
      }
      if (jiraArrayIndex >= 0) {
        let jiraFormData = step.notification[jiraArrayIndex];
        setJiraDto(new Model(jiraFormData, jiraStepMetadata, false));
      }
      if (teamsArrayIndex >= 0) {
        let teamsFormData = step.notification[teamsArrayIndex];
        setTeamsDto(new Model(teamsFormData, teamsStepNotificationMetadata, false));
      }
      if (serviceNowArrayIndex >= 0) {
        let serviceNowFormData = step.notification[serviceNowArrayIndex];
        setServiceNowDto(new Model(serviceNowFormData, serviceNowStepNotificationMetadata, false));
      }
    }
    // TODO: We save step, so this is redundant
    setStepTool(step.tool);
    setStepName(step.name);
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let stepArrayIndex = getStepIndex(stepId);
      plan[stepArrayIndex].notification = [emailDto.getPersistData(), slackDto.getPersistData(), jiraDto.getPersistData(), teamsDto.getPersistData(), serviceNowDto.getPersistData()];
      await parentCallback(plan);
      setIsSaving(false);
    }
  };

  const getStepIndex = (step_id) => {
    return plan.findIndex(x => x._id === step_id);
  };

  const validateRequiredFields = () => {
    if (emailDto.getData("enabled") === true && !emailDto.isModelValid()) {
      toastContext.showErrorDialog("Error: Cannot enable Email notification without all required fields filled out.");
      return false;
    }

    if (jiraDto.getData("enabled") === true && !jiraDto.isModelValid()) {
      toastContext.showErrorDialog("Error: Cannot enable Jira notification without all required fields filled out.");
      return false;
    }

    if (teamsDto.getData("enabled") === true && !teamsDto.isModelValid()) {
      toastContext.showErrorDialog("Error: Cannot enable Teams notification without tool selected.");
      return false;
    }

    if (slackDto.getData("enabled") === true && !slackDto.isModelValid()) {
      toastContext.showErrorDialog("Error: Cannot enable Slack notifications without all required fields filled out.");
      return false;
    }
    
    if (serviceNowDto.getData("enabled") === true && !serviceNowDto.isModelValid()) {
      toastContext.showErrorDialog("Error: Cannot enable ServiceNow notifications without all required fields filled out.");
      return false;
    }

    return true;
  };

  const getSlackFormFields = () => {
    if (isLoading || slackDto == null) {
      return null;
    }

    if (slackDto.getData("enabled") === false) {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={slackDto} setDataObject={setSlackDto} fieldName={"enabled"} />
        </div>
      );
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={slackDto} setDataObject={setSlackDto} fieldName={"enabled"} />
        <small className="form-text text-muted px-2">
          Please Note: You must use the Add to Slack button on the
          <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
        </small>
        <NotificationLevelInput dataObject={slackDto} setDataObject={setSlackDto} fieldName={"event"} />
        <SlackStepNotificationToolInput setDataObject={setSlackDto} dataObject={slackDto} />
        <TextInputBase dataObject={slackDto} setDataObject={setSlackDto} fieldName={"channel"} />
      </div>
    );
  };

  const getTeamsFormFields = () => {
    if (isLoading || teamsDto == null) {
      return null;
    }

    if (teamsDto.getData("enabled") === false) {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={teamsDto} setDataObject={setTeamsDto} fieldName={"enabled"} />
        </div>
      );
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={teamsDto} setDataObject={setTeamsDto} fieldName={"enabled"} />
        <small className="form-text text-muted px-2">
          Please Note: You must connect to Microsoft Teams on the
          <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
        </small>
        <NotificationLevelInput dataObject={teamsDto} setDataObject={setTeamsDto} fieldName={"event"} />
        <TeamsStepNotificationToolInput setDataObject={setTeamsDto} dataObject={teamsDto} />
      </div>
    );
  };

  const getJiraFormFields = () => {
    if (isLoading || jiraDto == null) {
      return null;
    }

    if (jiraDto.getData("enabled") === false) {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={jiraDto} setDataObject={setJiraDto} fieldName={"enabled"} />
        </div>
      );
    }

    // TODO: If unneeded, remove
    if (step.tool.tool_identifier === "approval") {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={jiraDto} setDataObject={setJiraDto} />
          <small className="form-text text-muted px-2">
            Please Note: You must connect to Jira on the
            <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
          </small>
          <JiraStepNotificationToolInput setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationPriorityInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationProjectInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationProjectUserInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationProjectUsersMultiSelectInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationBoardInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProjectKey={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationSprintInput jiraToolId={jiraDto.getData("jiraToolId")} jiraBoard={jiraDto.getData("jiraBoard")} setDataObject={setJiraDto} dataObject={jiraDto} />
          <JiraStepNotificationParentTicketInput jiraToolId={jiraDto.getData("jiraToolId")} jiraSprintId={jiraDto.getData("jiraSprint")} setDataObject={setJiraDto} dataObject={jiraDto} />
          {/*<JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraApprovalStep"} />*/}
          {/*<JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraRejectionStep"} />*/}
        </div>
      );
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={jiraDto} setDataObject={setJiraDto} />
        <small className="form-text text-muted px-2">
          Please Note: You must connect to Jira on the
          <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
        </small>
        {/*<NotificationLevelInput disabled={true} dataObject={jiraDto} setDataObject={setJiraDto} fieldName={"jiraNotificationLevel"} />*/}
        <JiraStepNotificationToolInput setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationPriorityInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationProjectInput jiraToolId={jiraDto.getData("jiraToolId")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationProjectUserInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationProjectUsersMultiSelectInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationBoardInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProjectKey={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationSprintInput jiraToolId={jiraDto.getData("jiraToolId")} jiraBoard={jiraDto.getData("jiraBoard")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationParentTicketInput jiraToolId={jiraDto.getData("jiraToolId")} jiraSprintId={jiraDto.getData("jiraSprint")} setDataObject={setJiraDto} dataObject={jiraDto} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraOpenStep"} />
        <JiraStepNotificationWorkflowStepInput jiraToolId={jiraDto.getData("jiraToolId")} jiraProject={jiraDto.getData("jiraProject")} setDataObject={setJiraDto} dataObject={jiraDto} fieldName={"jiraClosureStep"} />
      </div>
    );
  };

  const getServiceNowFormFields = () => {
    if (isLoading || serviceNowDto == null) {
      return null;
    }

    if (serviceNowDto.getData("enabled") === false) {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={serviceNowDto} setDataObject={setServiceNowDto} fieldName={"enabled"} />
        </div>
      );
    }

    return (
      <div className="my-4">
        <NotificationsToggle dataObject={serviceNowDto} setDataObject={setServiceNowDto} fieldName={"enabled"} />
        <small className="form-text text-muted px-2">
          Please Note: You must connect to ServiceNow on the
          <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
        </small>
        <NotificationLevelInput dataObject={serviceNowDto} setDataObject={setServiceNowDto} fieldName={"event"} />
        <ServiceNowStepNotificationToolSelectInput
          setModel={setServiceNowDto}
          model={serviceNowDto}
        />
        {/* <ServiceNowUserSelectInput serviceNowId={serviceNowDto.getData("toolId")} setDataObject={setServiceNowDto} dataObject={serviceNowDto} /> */}
        <ServiceNowGroupSelectInput serviceNowId={serviceNowDto.getData("toolId")} setDataObject={setServiceNowDto} dataObject={serviceNowDto} />
      </div>
    );
  };

  const getEmailFormFields = () => {
    if (isLoading || emailDto == null) {
      return null;
    }

    if (emailDto.getData("enabled") === false) {
      return (
        <div className="my-4">
          <NotificationsToggle disabled={true} dataObject={emailDto} setDataObject={setEmailDto} fieldName={"enabled"} />
        </div>
      );
    }

    return (
      <div className="my-4">
        <NotificationsToggle disabled={true} dataObject={emailDto} setDataObject={setEmailDto} fieldName={"enabled"} />
        <TextInputBase disabled={true} dataObject={emailDto} setDataObject={setEmailDto} fieldName={"address"} />
        <NotificationLevelInput disabled={true} dataObject={emailDto} setDataObject={setEmailDto} fieldName={"event"} />
      </div>
    );
  };

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
      {getServiceNowFormFields()}
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

StepNotificationConfiguration.propTypes = {
  data: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  handleCloseClick: PropTypes.func,
};

export default StepNotificationConfiguration;