import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import slackStepNotificationMetadata
  from "components/workflow/plan/step/notifications/slack/slackStepNotificationMetadata";
import teamsStepNotificationMetadata
  from "components/workflow/plan/step/notifications/teams/teamsStepNotificationMetadata";
import serviceNowStepNotificationMetadata
  from "components/workflow/plan/step/notifications/servicenow/serviceNowStepNotificationMetadata";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepJiraNotificationSummaryPanel
  from "components/workflow/plan/step/notifications/jira/PipelineStepJiraNotificationSummaryPanel";
import PipelineStepEmailNotificationSummaryPanel
  from "components/workflow/plan/step/notifications/email/PipelineStepEmailNotificationSummaryPanel";
import InfoContainer from "components/common/containers/InfoContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import PipelineStepServiceNowNotificationSummaryPanel
  from "components/workflow/plan/step/notifications/servicenow/PipelineStepServiceNowNotificationSummaryPanel";
import PipelineStepSlackNotificationSummaryPanel
  from "components/workflow/plan/step/notifications/slack/PipelineStepSlackNotificationSummaryPanel";
import PipelineStepMicrosoftTeamsNotificationSummaryPanel
  from "components/workflow/plan/step/notifications/teams/PipelineStepMicrosoftTeamsNotificationSummaryPanel";
import NoDataMessageField from "components/common/fields/text/standalone/NoDataMessageField";
import modelHelpers from "components/common/model/modelHelpers";
import {jiraStepApprovalMetadata} from "components/workflow/plan/step/notifications/jira/jiraStepApproval.metadata";
import {
  jiraStepNotificationMetadata
} from "components/workflow/plan/step/notifications/jira/jiraStepNotification.metadata";

// TODO: Style and utilize the left tab construct
function PipelineStepNotificationConfigurationSummaryPanel({ pipelineStepData }) {
  const [jiraModel, setJiraModel] = useState(undefined);
  const [teamsModel, setTeamsModel] = useState(undefined);
  const [slackModel, setSlackModel] = useState(undefined);
  const [emailModel, setEmailModel] = useState(undefined);
  const [serviceNowModel, setServiceNowModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pipelineStepData) {
      loadData(pipelineStepData);
    }
  }, [pipelineStepData]);

  const loadData = (pipelineStepData) => {
    setIsLoading(true);
    loadConfiguration();
    setIsLoading(false);
  };

  const loadConfiguration = () => {
    const jiraNotificationMetadata = pipelineStepData?.tool?.tool_identifier === "approval" ? jiraStepApprovalMetadata : jiraStepNotificationMetadata;

    const emailNotification = pipelineStepData?.notification?.find((notification) => notification.type === "email");
    setEmailModel(modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata));

    const slackNotification = pipelineStepData?.notification?.find((notification) => notification.type === "slack");
    setSlackModel(modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata));

    const jiraNotification = pipelineStepData?.notification?.find((notification) => notification.type === "jira");
    setJiraModel(modelHelpers.parseObjectIntoModel(jiraNotification, jiraNotificationMetadata));

    const teamsNotification = pipelineStepData?.notification?.find((notification) => notification.type === "teams");
    setTeamsModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata));

    const serviceNowNotification = pipelineStepData?.notification?.find((notification) => notification.type === "servicenow");
    setServiceNowModel(modelHelpers.parseObjectIntoModel(serviceNowNotification, serviceNowStepNotificationMetadata));
  };

  const getEmailFields = () => {
    if (emailModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Email Notifications"} titleIcon={faEnvelope} className={"mt-1 mb-2"}>
        <PipelineStepEmailNotificationSummaryPanel emailNotificationModel={emailModel} />
      </InfoContainer>
    );
  };

  const getJiraFields = () => {
    if (jiraModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Jira Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepJiraNotificationSummaryPanel jiraNotificationModel={jiraModel} />
      </InfoContainer>
    );
  };

  const getSlackFields = () => {
    if (slackModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Slack Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepSlackNotificationSummaryPanel slackNotificationModel={slackModel} />
      </InfoContainer>
    );
  };

  const getTeamsFields = () => {
    if (teamsModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"Microsoft Teams Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepMicrosoftTeamsNotificationSummaryPanel teamsNotificationModel={teamsModel} />
      </InfoContainer>
    );
  };

  const getServiceNowFields = () => {
    if (serviceNowModel?.getData("enabled") !== true) {
      return null;
    }

    return (
      <InfoContainer titleText={"ServiceNow Notifications"} titleIcon={faEnvelope} className={"mb-2"}>
        <PipelineStepServiceNowNotificationSummaryPanel serviceNowNotificationModel={serviceNowModel} />
      </InfoContainer>
    );
  };

  const getNotificationBody = () => {
    const hasEmailNotifications = emailModel?.getData("enabled") === true;
    const hasJiraNotifications = jiraModel?.getData("enabled") === true;
    const hasTeamsNotifications = teamsModel?.getData("enabled") === true;
    const hasSlackNotifications = slackModel?.getData("enabled") === true;
    const hasServiceNowNotifications = serviceNowModel?.getData("enabled") === true;

    if (
         hasEmailNotifications === false
      && hasJiraNotifications === false
      && hasTeamsNotifications === false
      && hasSlackNotifications === false
      && hasServiceNowNotifications === false
    ) {
      return (
        <NoDataMessageField message={"No notifications are configured for this Pipeline step."} />
      );
    }

    return (
      <div>
        {getEmailFields()}
        {getJiraFields()}
        {getTeamsFields()}
        {getSlackFields()}
        {getServiceNowFields()}
      </div>
    );
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer className={"step-configuration-summary"}>
      {getNotificationBody()}
    </SummaryPanelContainer>
  );
}

PipelineStepNotificationConfigurationSummaryPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepNotificationConfigurationSummaryPanel;
