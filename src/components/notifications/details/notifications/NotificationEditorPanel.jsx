import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import emailStepNotificationMetadata
  from "components/workflow/plan/step/notifications/email/emailStepNotification.metadata";
import { ORCHESTRATION_NOTIFICATION_TYPES } from "components/common/fields/notifications/notificationTypes.constants";
import NotificationTabView from "components/notifications/details/notifications/NotificationTabView";
import InfoText from "components/common/inputs/info_text/InfoText";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function NotificationEditorPanel(
  {
    notificationModel,
    setNotificationModel,
  }) {
  const toastContext = useContext(DialogToastContext);
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

      const notifications = notificationModel?.getArrayData("notifications");

      const emailNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);
      setEmailNotificationModel(modelHelpers.parseObjectIntoModel(emailNotification, emailStepNotificationMetadata));

      // const slackNotification = notifications.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SLACK);
      // setSlackNotificationModel(modelHelpers.parseObjectIntoModel(slackNotification, slackStepNotificationMetadata));

      // const teamsNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS);
      // setTeamsNotificationModel(modelHelpers.parseObjectIntoModel(teamsNotification, teamsStepNotificationMetadata));

      // const jiraNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.JIRA);
      // setJiraNotificationModel(modelHelpers.parseObjectIntoModel(jiraNotification, jiraStepNotificationMetadata));

      // const serviceNowNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW);
      // setServiceNowNotificationModel(modelHelpers.parseObjectIntoModel(serviceNowNotification, serviceNowStepNotificationMetadata));

      // const gChatNotification = notifications?.find((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT);
      // setGChatNotificationModel(modelHelpers.parseObjectIntoModel(gChatNotification, gChatStepNotificationMetadata));

      setIsLoading(false);
    }
  }, []);

  const validateRequiredFields = () => {
    if (emailNotificationModel.getData("enabled") === true && !emailNotificationModel.isModelValid()) {
      toastContext.showInlineErrorMessage("Error: Cannot enable Email notification without all required fields filled out.");
      return false;
    }

    // if (teamsNotificationModel.getData("enabled") === true && !teamsNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable Teams notification without tool selected.");
    //   return false;
    // }

    // if (slackNotificationModel.getData("enabled") === true && !slackNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable Slack notifications without all required fields filled out.");
    //   return false;
    // }

    // if (jiraNotificationModel.getData("enabled") === true && !jiraNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable Jira notification without all required fields filled out.");
    //   return false;
    // }

    // if (serviceNowNotificationModel.getData("enabled") === true && !serviceNowNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable ServiceNow notifications without all required fields filled out.");
    //   return false;
    // }

    // if (gChatNotificationModel.getData("enabled") === true && !gChatNotificationModel.isModelValid()) {
    //   toastContext.showInlineErrorMessage("Error: Cannot enable GChat notification without tool selected.");
    //   return false;
    // }

    return true;
  };

  // const getHelpComponentFunction = (setHelpIsShown) => {
  //   return (
  //     <TaskNotificationConfigurationHelpDocumentation
  //       closeHelpPanel={() => setHelpIsShown(false)}
  //       />
  //   );
  // };

  const setEmailNotificationModelFunction = (newEmailNotificationModel) => {
    setEmailNotificationModel({...newEmailNotificationModel});

    if (emailNotificationModel.getData("enabled") === true && !newEmailNotificationModel.isModelValid()) {
      setError("Error: Cannot enable Email notification without all required fields filled out.");
      return;
    }

    const notifications = notificationModel?.getArrayData("notification");
    const index = notifications?.findIndex((notification) => notification.type === ORCHESTRATION_NOTIFICATION_TYPES.EMAIL);

    if (index === -1) {
      notifications.push(newEmailNotificationModel?.getPersistData(false));
    } else {
      notifications[index] = newEmailNotificationModel?.getPersistData(false);
    }

    notificationModel.setData("notification", notifications);
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
    <OverlayPanelBodyContainer
      // getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      <div>
        <h6 className="upper-case-first">{notificationModel?.getData("name")}</h6>
        <div className="text-muted mt-2 mb-3">Each Notification can be configured to trigger based upon the selected criteria.
        </div>
      </div>
      <NotificationTabView
        slackNotificationModel={slackNotificationModel}
        setSlackNotificationModel={setSlackNotificationModel}
        teamsNotificationModel={teamsNotificationModel}
        setTeamsNotificationModel={setTeamsNotificationModel}
        jiraNotificationModel={jiraNotificationModel}
        setJiraNotificationModel={setJiraNotificationModel}
        serviceNowNotificationModel={serviceNowNotificationModel}
        setServiceNowNotificationModel={setServiceNowNotificationModel}
        emailNotificationModel={emailNotificationModel}
        setEmailNotificationModel={setEmailNotificationModelFunction}
        gChatNotificationModel={gChatNotificationModel}
        setGChatNotificationModel={setGChatNotificationModel}
      />
      <InfoText errorMessage={error} />
    </OverlayPanelBodyContainer>
  );
}

NotificationEditorPanel.propTypes = {
  notificationModel: PropTypes.object,
  setNotificationModel: PropTypes.func,
  notificationMethodModel: PropTypes.object,
  setNotificationMethodModel: PropTypes.func,
};
