import React from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {ORCHESTRATION_NOTIFICATION_TYPES} from "components/common/fields/notifications/notificationTypes.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EmailNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/email/EmailNotificationMethodSummaryCard";
import emailNotificationMetadata from "components/common/fields/notifications/methods/email/emailNotificationMetadata";
import SlackNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/slack/SlackNotificationMethodSummaryCard";
import slackNotificationMetadata from "components/common/fields/notifications/methods/slack/slackNotificationMetadata";
import TeamsNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/teams/TeamsNotificationMethodSummaryCard";
import teamsNotificationMetadata from "components/common/fields/notifications/methods/teams/teamsNotificationMetadata";
import JiraNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/jira/JiraNotificationMethodSummaryCard";
import jiraNotificationMetadata from "components/common/fields/notifications/methods/jira/jiraNotificationMetadata";
import GChatNotificationMethodSummaryCard
  from "components/common/fields/notifications/methods/gchat/GChatNotificationMethodSummaryCard";
import gChatNotificationMetadata from "components/common/fields/notifications/methods/gchat/gChatNotificationMetadata";

// TODO: Move the checks into the fields
export default function NotificationsField(
  {
    model,
    fieldName,
  }) {
  const notifications = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  const serviceNowNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);
  const gChatNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);

  const getEmailNotificationMethodSummaryCard = () => {
    const emailNotification = DataParsingHelper.parseObject(notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL));

    if (emailNotification && emailNotification.enabled === true) {
      return (
        <EmailNotificationMethodSummaryCard
          emailNotificationModel={modelHelpers.parseObjectIntoModel(emailNotification, emailNotificationMetadata)}
        />
      );
    }
  };

  const getSlackNotificationMethodSummaryCard = () => {
    const slackNotification = DataParsingHelper.parseObject(notifications.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK));

    if (slackNotification && slackNotification.enabled === true) {
      return (
        <SlackNotificationMethodSummaryCard
          slackNotificationModel={modelHelpers.parseObjectIntoModel(slackNotification, slackNotificationMetadata)}
        />
      );
    }
  };

  const getMicrosoftTeamsNotificationMethodSummaryCard = () => {
    const teamsNotification = DataParsingHelper.parseObject(notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS));

    if (teamsNotification && teamsNotification.enabled === true) {
      return (
        <TeamsNotificationMethodSummaryCard
          teamsNotificationModel={modelHelpers.parseObjectIntoModel(teamsNotification, teamsNotificationMetadata)}
        />
      );
    }
  };

  const getJiraNotificationMethodSummaryCard = () => {
    const jiraNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);

    if (jiraNotification && jiraNotification.enabled === true) {
      return (
        <JiraNotificationMethodSummaryCard
          notificationMethodData={modelHelpers.parseObjectIntoModel(jiraNotification, jiraNotificationMetadata)}
          notificationData={notificationData}
        />
      );
    }
  };


  return (
    <div>
      {getEmailNotificationMethodSummaryCard()}
      {getSlackNotificationMethodSummaryCard()}
      {getMicrosoftTeamsNotificationMethodSummaryCard()}
      {getJiraNotificationMethodSummaryCard()}
      <GChatNotificationMethodSummaryCard
        notificationMethodData={modelHelpers.parseObjectIntoModel(gChatNotification, gChatNotificationMetadata)}
        notificationData={notificationData}
      />
    </div>
  );
}

NotificationsField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
};
