import React from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {ORCHESTRATION_NOTIFICATION_TYPES} from "components/common/fields/notifications/notificationTypes.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EmailNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/email/EmailNotificationMethodSummaryCard";
import SlackNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/slack/SlackNotificationMethodSummaryCard";
import TeamsNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/teams/TeamsNotificationMethodSummaryCard";
import JiraNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/jira/JiraNotificationMethodSummaryCard";
import GChatNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/gchat/GChatNotificationMethodSummaryCard";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import slackStepNotificationMetadata
  from "components/workflow/plan/step/notifications/slack/slackStepNotificationMetadata";
import teamsStepNotificationMetadata
  from "components/workflow/plan/step/notifications/teams/teamsStepNotificationMetadata";
import {
  jiraStepNotificationMetadata
} from "components/workflow/plan/step/notifications/jira/jiraStepNotification.metadata";
import gChatStepNotificationMetadata
  from "components/workflow/plan/step/notifications/gchat/gChatStepNotificationMetadata";

// TODO: Move the checks into the fields
export default function NotificationsField(
  {
    model,
    fieldName,
  }) {
  const notifications = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  const getEmailNotificationMethodSummaryCard = () => {
    const emailNotification = DataParsingHelper.parseObject(notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL));

    if (emailNotification && emailNotification.enabled === true) {
      return (
        <EmailNotificationMethodSummaryCard
          emailNotificationModel={modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata)}
        />
      );
    }
  };

  const getSlackNotificationMethodSummaryCard = () => {
    const slackNotification = DataParsingHelper.parseObject(notifications.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK));

    if (slackNotification && slackNotification.enabled === true) {
      return (
        <SlackNotificationMethodSummaryCard
          slackNotificationModel={modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata)}
        />
      );
    }
  };

  const getMicrosoftTeamsNotificationMethodSummaryCard = () => {
    const teamsNotification = DataParsingHelper.parseObject(notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS));

    if (teamsNotification && teamsNotification.enabled === true) {
      return (
        <TeamsNotificationMethodSummaryCard
          teamsNotificationModel={modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata)}
        />
      );
    }
  };

  const getJiraNotificationMethodSummaryCard = () => {
    const jiraNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);

    if (jiraNotification && jiraNotification.enabled === true) {
      return (
        <JiraNotificationMethodSummaryCard
          jiraNotificationModel={modelHelpers.parseObjectIntoModel(jiraNotification, jiraStepNotificationMetadata)}
        />
      );
    }
  };

  const getGChatNotificationMethodSummaryCard = () => {
    const gChatNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);

    if (gChatNotification && gChatNotification.enabled === true) {
      return (
        <GChatNotificationMethodSummaryCard
          jiraNotificationModel={modelHelpers.parseObjectIntoModel(gChatNotification, gChatStepNotificationMetadata)}
        />
      );
    }
  };

  // TODO: When adding support for ServiceNow, add summary panel
  const getServiceNowNotificationMethodSummaryCard = () => {
    const serviceNowNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);

    if (serviceNowNotification && serviceNowNotification.enabled === true) {
      return null;
    }
  };

  return (
    <div>
      {getEmailNotificationMethodSummaryCard()}
      {getSlackNotificationMethodSummaryCard()}
      {getMicrosoftTeamsNotificationMethodSummaryCard()}
      {getJiraNotificationMethodSummaryCard()}
      {getGChatNotificationMethodSummaryCard()}
      {/*{getServiceNowNotificationMethodSummaryCard()}*/}
    </div>
  );
}

NotificationsField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
};
