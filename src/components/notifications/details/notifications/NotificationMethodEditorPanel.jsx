import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import { ORCHESTRATION_NOTIFICATION_TYPES } from "components/common/fields/notifications/notificationTypes.constants";
import NotificationTabView from "components/notifications/details/notifications/NotificationTabView";
import InfoText from "components/common/inputs/info_text/InfoText";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {notificationMethodHelper} from "components/notifications/notificationMethod.helper";
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

export default function NotificationMethodEditorPanel(
  {
    notificationModel,
    setNotificationModel,
  }) {
  const [jiraNotificationModel, setJiraNotificationModel] = useState(undefined);
  const [teamsNotificationModel, setTeamsNotificationModel] = useState(undefined);
  const [slackNotificationModel, setSlackNotificationModel] = useState(undefined);
  const [emailNotificationModel, setEmailNotificationModel] = useState(undefined);
  const [serviceNowNotificationModel, setServiceNowNotificationModel] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [gChatNotificationModel, setGChatNotificationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (notificationModel) {
      setIsLoading(true);

      const notifications = notificationModel?.getArrayData("notification");

      const emailNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);
      setEmailNotificationModel(modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata));

      const slackNotification = notifications.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);
      setSlackNotificationModel(modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata));

      const teamsNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);
      setTeamsNotificationModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata));

      // const jiraNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);
      // setJiraNotificationModel(modelHelpers.parseObjectIntoModel(jiraNotification, jiraStepNotificationMetadata));
      //
      // const serviceNowNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);
      // setServiceNowNotificationModel(modelHelpers.parseObjectIntoModel(serviceNowNotification, serviceNowStepNotificationMetadata));

      const gChatNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);
      setGChatNotificationModel(modelHelpers.parseObjectIntoModel(gChatNotification, gChatStepNotificationMetadata));

      setIsLoading(false);
    }
  }, []);

  // const getHelpComponentFunction = (setHelpIsShown) => {
  //   return (
  //     <TaskNotificationConfigurationHelpDocumentation
  //       closeHelpPanel={() => setHelpIsShown(false)}
  //       />
  //   );
  // };

  // TODO: Do this in a smarter way
  const setEmailNotificationModelFunction = (newEmailNotificationModel) => {
    setEmailNotificationModel({...newEmailNotificationModel});

    if (newEmailNotificationModel.getData("enabled") === true && !newEmailNotificationModel.isModelValid()) {
      setError("Error: Cannot enable Email notification without all required fields filled out.");
      return;
    }

    setError(undefined);
    const notifications = notificationModel?.getArrayData("notification");
    const index = notifications?.findIndex((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);
    const updatedData = newEmailNotificationModel?.getPersistData(false);

    if (index === -1) {
      notifications.push(updatedData);
    } else {
      notifications[index] = updatedData;
    }

    const validatedNotificationsArray = notificationMethodHelper.getValidatedNotificationsArray(notifications);
    notificationModel.setData("notification", validatedNotificationsArray);
    setNotificationModel({...notificationModel});
  };

  const setSlackNotificationModelFunction = (newNotificationModel) => {
    setSlackNotificationModel({...newNotificationModel});

    if (newNotificationModel.getData("enabled") === true && !newNotificationModel.isModelValid()) {
      setError("Error: Cannot enable Slack notification without all required fields filled out.");
      return;
    }

    setError(undefined);
    const notifications = notificationModel?.getArrayData("notification");
    const index = notifications?.findIndex((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);
    const updatedData = newNotificationModel?.getPersistData(false);

    if (index === -1) {
      notifications.push(updatedData);
    } else {
      notifications[index] = updatedData;
    }

    const validatedNotificationsArray = notificationMethodHelper.getValidatedNotificationsArray(notifications);
    notificationModel.setData("notification", validatedNotificationsArray);
    setNotificationModel({...notificationModel});
  };

  const setGoogleChatNotificationModelFunction = (newNotificationModel) => {
    setGChatNotificationModel({...newNotificationModel});

    if (newNotificationModel.getData("enabled") === true && !newNotificationModel.isModelValid()) {
      setError("Error: Cannot enable GChat notification without all required fields filled out.");
      return;
    }

    setError(undefined);
    const notifications = notificationModel?.getArrayData("notification");
    const index = notifications?.findIndex((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);
    const updatedData = newNotificationModel?.getPersistData(false);

    if (index === -1) {
      notifications.push(updatedData);
    } else {
      notifications[index] = updatedData;
    }

    const validatedNotificationsArray = notificationMethodHelper.getValidatedNotificationsArray(notifications);
    notificationModel.setData("notification", validatedNotificationsArray);
    setNotificationModel({...notificationModel});
  };

  const setMicrosoftTeamsNotificationModelFunction = (newNotificationModel) => {
    setTeamsNotificationModel({...newNotificationModel});

    if (newNotificationModel.getData("enabled") === true && !newNotificationModel.isModelValid()) {
      setError("Error: Cannot enable Microsoft Teams notification without all required fields filled out.");
      return;
    }

    setError(undefined);
    const notifications = notificationModel?.getArrayData("notification");
    const index = notifications?.findIndex((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);
    const updatedData = newNotificationModel?.getPersistData(false);

    if (index === -1) {
      notifications.push(updatedData);
    } else {
      notifications[index] = updatedData;
    }

    const validatedNotificationsArray = notificationMethodHelper.getValidatedNotificationsArray(notifications);
    notificationModel.setData("notification", validatedNotificationsArray);
    setNotificationModel({...notificationModel});
  };

  if (isLoading) {
    return (
      <CenterLoadingIndicator
        type={"Notification Methods"}
      />
    );
  }

  return (
    <div>
      <NotificationTabView
        slackNotificationModel={slackNotificationModel}
        setSlackNotificationModel={setSlackNotificationModelFunction}
        teamsNotificationModel={teamsNotificationModel}
        setTeamsNotificationModel={setMicrosoftTeamsNotificationModelFunction}
        jiraNotificationModel={jiraNotificationModel}
        setJiraNotificationModel={setJiraNotificationModel}
        serviceNowNotificationModel={serviceNowNotificationModel}
        setServiceNowNotificationModel={setServiceNowNotificationModel}
        emailNotificationModel={emailNotificationModel}
        setEmailNotificationModel={setEmailNotificationModelFunction}
        gChatNotificationModel={gChatNotificationModel}
        setGChatNotificationModel={setGoogleChatNotificationModelFunction}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

NotificationMethodEditorPanel.propTypes = {
  notificationModel: PropTypes.object,
  setNotificationModel: PropTypes.func,
  notificationMethodModel: PropTypes.object,
  setNotificationMethodModel: PropTypes.func,
};
