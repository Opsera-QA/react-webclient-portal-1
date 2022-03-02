import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import jiraStepNotificationMetadata from "./jira/jiraStepNotificationMetadata";
import Model from "core/data_model/model";
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
import JiraStepNotificationParentTicketInput from "./jira/JiraStepNotificationParentTicketInput";
import slackStepNotificationMetadata from "./slack/slackStepNotificationMetadata";
import emailStepNotificationMetadata from "./email/emailStepNotificationMetadata";
import jiraStepApprovalMetadata from "./jira/jiraStepApprovalMetadata";
import SlackStepNotificationToolInput from "./slack/SlackStepNotificationToolInput";
import ServiceNowStepNotificationToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/servicenow/ServiceNowStepNotificationToolSelectInput";
import JiraStepNotificationProjectUserInput from "./jira/JiraStepNotificationProjectUserInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ServiceNowGroupSelectInput from "./servicenow/ServiceNowGroupSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import Form from "react-bootstrap/Form";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import CloseButton from "components/common/buttons/CloseButton";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import EmailNotificationToggle
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/email/EmailNotificationToggle";
import IconBase from "components/common/icons/IconBase";

// TODO: Break out into sub panels when refactoring
function StepNotificationConfiguration(
  {
    pipelineId,
    pipelineStep,
    handleCloseClick,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [stepName, setStepName] = useState(undefined);
  const [stepTool, setStepTool] = useState({});
  const [jiraDto, setJiraDto] = useState(undefined);
  const [teamsDto, setTeamsDto] = useState(undefined);
  const [slackDto, setSlackDto] = useState(undefined);
  const [emailNotificationModel, setEmailNotificationModel] = useState(undefined);
  const [serviceNowDto, setServiceNowDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineStep, pipelineId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if (pipelineStep?.tool?.tool_identifier === "approval") {
        await loadConfiguration(pipelineStep, jiraStepApprovalMetadata);
      }
      else {
        await loadConfiguration(pipelineStep, jiraStepNotificationMetadata);
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
    setEmailNotificationModel(new Model({...emailStepNotificationMetadata.newObjectFields}, emailStepNotificationMetadata, true));
    setSlackDto(new Model({...slackStepNotificationMetadata.newObjectFields}, slackStepNotificationMetadata, true));
    setJiraDto(new Model({...jiraStepMetadata.newObjectFields}, jiraStepMetadata, true));
    setTeamsDto(new Model({...teamsStepNotificationMetadata.newObjectFields}, teamsStepNotificationMetadata, true));
    setServiceNowDto(new Model({...serviceNowStepNotificationMetadata.newObjectFields}, serviceNowStepNotificationMetadata, true));

    if (step.notification !== undefined) {
      const emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      const slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      const jiraArrayIndex = step.notification.findIndex(x => x.type === "jira");
      const teamsArrayIndex = step.notification.findIndex(x => x.type === "teams");
      const serviceNowArrayIndex = step.notification.findIndex(x => x.type === "servicenow");

      if (emailArrayIndex >= 0) {
        let emailFormData = step.notification[emailArrayIndex];
        setEmailNotificationModel(new Model(emailFormData, emailStepNotificationMetadata, false));
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

  const updateStepNotificationConfiguration = async () => {
    if (validateRequiredFields()) {
      const newNotificationConfiguration = [emailNotificationModel.getPersistData(), slackDto.getPersistData(), jiraDto.getPersistData(), teamsDto.getPersistData(), serviceNowDto.getPersistData()];
      await pipelineActions.updatePipelineStepNotificationConfiguration(
        getAccessToken,
        cancelTokenSource,
        pipelineId,
        pipelineStep?._id,
        newNotificationConfiguration,
        );
      toastContext.showSaveSuccessToast("Pipeline Notification Configuration");
    }
  };

  const validateRequiredFields = () => {
    if (emailNotificationModel.getData("enabled") === true && !emailNotificationModel.isModelValid()) {
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
          <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
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
          <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
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
    if (pipelineStep?.tool?.tool_identifier === "approval") {
      return (
        <div className="my-4">
          <NotificationsToggle dataObject={jiraDto} setDataObject={setJiraDto} />
          <small className="form-text text-muted px-2">
            Please Note: You must connect to Jira on the
            <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
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
          <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
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
          <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
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

  // TODO: Separate into own form
  const getEmailFormFields = () => {
    if (isLoading || emailNotificationModel == null) {
      return null;
    }

    if (emailNotificationModel.getData("enabled") === false) {
      return (
        <div className="my-4">
          <EmailNotificationToggle
            model={emailNotificationModel}
            setModel={setEmailNotificationModel}
          />
        </div>
      );
    }

    return (
      <div className="my-4">
        <EmailNotificationToggle
          model={emailNotificationModel}
          setModel={setEmailNotificationModel}
        />
        <MultiTextInputBase
          dataObject={emailNotificationModel}
          setDataObject={setEmailNotificationModel}
          fieldName={"addresses"}
        />
        <NotificationLevelInput
          dataObject={emailNotificationModel}
          setDataObject={setEmailNotificationModel}
          fieldName={"event"}
        />
      </div>
    );
  };

  const getTitleBar = () => {
    const toolIdentifier = stepTool?.tool_identifier;
    const titleText = hasStringValue(stepName) === true ? `${stepName}: ${toolIdentifier}` : toolIdentifier;
    return (
      <div>
        <h6 className="upper-case-first">{titleText}</h6>
        <div className="text-muted mt-2 mb-3">Each step in the workflow can be configured with notifications that trigger upon
          completion, failure, or all scenarios.
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Notification Configuration"} size={"sm"} />;
  }

  // TODO: Use general save button mechanisms
  return (
    <Form>
      {getTitleBar()}
      {getSlackFormFields()}
      {getTeamsFormFields()}
      {getJiraFormFields()}
      {getServiceNowFormFields()}
      {getEmailFormFields()}

      <div className={"d-flex"}>
        <StandaloneSaveButton
          className={"mr-2"}
          type={"Pipeline Notification Step Configurations"}
          saveFunction={updateStepNotificationConfiguration}
          size={"md"}
          showToasts={false}
        />
        <CloseButton
          closeEditorCallback={handleCloseClick}
        />
      </div>
      <RequiredFieldsMessage/>
    </Form>
  );
}

StepNotificationConfiguration.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  handleCloseClick: PropTypes.func,
};

export default StepNotificationConfiguration;