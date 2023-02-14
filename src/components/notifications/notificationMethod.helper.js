import {ORCHESTRATION_NOTIFICATION_TYPES} from "components/common/fields/notifications/notificationTypes.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import slackStepNotificationMetadata
  from "components/workflow/plan/step/notifications/slack/slackStepNotificationMetadata";
import teamsStepNotificationMetadata
  from "components/workflow/plan/step/notifications/teams/teamsStepNotificationMetadata";
import {
  jiraStepNotificationMetadata
} from "components/workflow/plan/step/notifications/jira/jiraStepNotification.metadata";
import serviceNowStepNotificationMetadata
  from "components/workflow/plan/step/notifications/servicenow/serviceNowStepNotificationMetadata";
import gChatStepNotificationMetadata
  from "components/workflow/plan/step/notifications/gchat/gChatStepNotificationMetadata";

// TODO: Move to Node so we can validate there.
const notificationMethodHelper = {};

notificationMethodHelper.getValidatedNotificationsArray = async (notificationsArray) => {
  const validatedNotificationsArray = [];
  const parsedNotificationsArray = DataParsingHelper.parseArray(notificationsArray);

  if (!notificationsArray) {
    return [];
  }

  const emailNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);

  if (emailNotification && notificationMethodHelper.isEmailNotificationMethodValid(emailNotification) === true) {
    validatedNotificationsArray.push(emailNotification);
  }

  const slackNotification = parsedNotificationsArray.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);

  if (slackNotification && notificationMethodHelper.isSlackNotificationMethodValid(slackNotification) === true) {
    validatedNotificationsArray.push(slackNotification);
  }

  const teamsNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);

  if (teamsNotification && notificationMethodHelper.isMicrosoftTeamsNotificationMethodValid(teamsNotification) === true) {
    validatedNotificationsArray.push(teamsNotification);
  }

  const jiraNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);

  if (jiraNotification && notificationMethodHelper.isJiraNotificationMethodValid(jiraNotification) === true) {
    validatedNotificationsArray.push(jiraNotification);
  }

  const serviceNowNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);

  if (serviceNowNotification && notificationMethodHelper.isServiceNowNotificationMethodValid(serviceNowNotification) === true) {
    validatedNotificationsArray.push(serviceNowNotification);
  }

  const gChatNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);

  if (gChatNotification && notificationMethodHelper.isGChatNotificationMethodValid(gChatNotification) === true) {
    validatedNotificationsArray.push(gChatNotification);
  }

  return validatedNotificationsArray;
};

notificationMethodHelper.isNotificationsArrayValid = async (notificationsArray, requireNotificationMethod) => {
  const parsedNotificationsArray = DataParsingHelper.parseArray(notificationsArray);

  if (!notificationsArray) {
    return requireNotificationMethod !== true;
  }

  const emailNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);

  if (emailNotification && notificationMethodHelper.isEmailNotificationMethodValid(emailNotification) !== true) {
    return false;
  }

  const slackNotification = parsedNotificationsArray.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);

  if (slackNotification && notificationMethodHelper.isSlackNotificationMethodValid(slackNotification) !== true) {
    return false;
  }

  const teamsNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);

  if (teamsNotification && notificationMethodHelper.isMicrosoftTeamsNotificationMethodValid(teamsNotification) !== true) {
    return false;
  }

  const jiraNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);

  if (jiraNotification && notificationMethodHelper.isJiraNotificationMethodValid(jiraNotification) !== true) {
    return false;
  }

  const serviceNowNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);

  if (serviceNowNotification && notificationMethodHelper.isServiceNowNotificationMethodValid(serviceNowNotification) !== true) {
    return false;
  }

  const gChatNotification = parsedNotificationsArray?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);

  if (gChatNotification && notificationMethodHelper.isGChatNotificationMethodValid(gChatNotification) !== true) {
    return false;
  }

  return true;
};

notificationMethodHelper.isNotificationMethodValid = (notificationMethod, metadata) => {
  const parsedNotificationMethod = DataParsingHelper.parseObject(notificationMethod);
  const parsedMetadata = DataParsingHelper.parseObject(metadata);

  if (!parsedNotificationMethod) {
    return false;
  }

  const notificationMethodModel = modelHelpers.parseObjectIntoModel(parsedNotificationMethod, parsedMetadata);
  return notificationMethodModel.getData("enabled") !== true || notificationMethodModel.isModelValid() === true;
};

notificationMethodHelper.isEmailNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, emailStepNotificationMetadata);
};

notificationMethodHelper.isGChatNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, gChatStepNotificationMetadata);
};

notificationMethodHelper.isJiraNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, jiraStepNotificationMetadata);
};

notificationMethodHelper.isMicrosoftTeamsNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, teamsStepNotificationMetadata);
};

notificationMethodHelper.isServiceNowNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, serviceNowStepNotificationMetadata);
};

notificationMethodHelper.isSlackNotificationMethodValid = (notificationMethod) => {
  return notificationMethodHelper.isNotificationMethodValid(notificationMethod, slackStepNotificationMetadata);
};
