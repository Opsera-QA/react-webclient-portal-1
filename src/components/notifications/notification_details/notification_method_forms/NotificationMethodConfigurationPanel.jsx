import React from "react";
import PropTypes from "prop-types";
import EmailNotificationMethodConfigurationPanel from "components/notifications/notification_details/notification_method_forms/email/EmailNotificationMethodConfigurationPanel";
import SlackNotificationMethodConfigurationPanel from "components/notifications/notification_details/notification_method_forms/slack/SlackNotificationMethodConfigurationPanel";
import JiraNotificationMethodConfigurationPanel from "components/notifications/notification_details/notification_method_forms/jira/JiraNotificationMethodConfigurationPanel";
import TeamsNotificationMethodConfigurationPanel from "components/notifications/notification_details/notification_method_forms/teams/TeamsNotificationMethodConfigurationPanel";
import NotificationMethodSelectInput
  from "components/common/list_of_values_input/notifications/method/NotificationMethodSelectInput";

function NotificationMethodConfigurationPanel({ notificationDataDto, setNotificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  const getMethodConfigurationPanel = () => {
    switch (notificationDataDto.getData("method")) {
      case "email":
        return (
          <EmailNotificationMethodConfigurationPanel
            notificationDataDto={notificationDataDto}
            setNotificationMethodDataDto={setNotificationMethodDataDto}
            notificationMethodDataDto={notificationMethodDataDto}
          />
        );
      case "slack":
        return (
          <SlackNotificationMethodConfigurationPanel
            notificationDataDto={notificationDataDto}
            setNotificationMethodDataDto={setNotificationMethodDataDto}
            notificationMethodDataDto={notificationMethodDataDto}
          />
        );
      case "jira":
        return (
          <JiraNotificationMethodConfigurationPanel
            notificationDataDto={notificationDataDto}
            setNotificationMethodDataDto={setNotificationMethodDataDto}
            notificationMethodDataDto={notificationMethodDataDto}
          />
        );
      case "teams":
        return (
          <TeamsNotificationMethodConfigurationPanel
            notificationDataDto={notificationDataDto}
            setNotificationMethodDataDto={setNotificationMethodDataDto}
            notificationMethodDataDto={notificationMethodDataDto}
          />
        );
      case "":
      default:
        return <div className="text-center text-muted p-5">You must select a notification method before configuring notification method details.</div>;
    }
  };

  // TODO: This should be in a new select component made with NotificationTypeSelectInput
  const handleMethodChange = (fieldName, value) => {
    let newDataObject = notificationDataDto;
    newDataObject.setData("method", value.value);
    newDataObject.setData("notification", {});
    setNotificationMethodDataDto(undefined);
    setNotificationDataDto({...newDataObject});
  };

  return (
    <div>
      <div>
        <NotificationMethodSelectInput
          setDataFunction={handleMethodChange}
          model={notificationDataDto}
          setModel={setNotificationDataDto}
        />
      </div>
      {getMethodConfigurationPanel()}
    </div>
  );
}

NotificationMethodConfigurationPanel.propTypes = {
  notificationType: PropTypes.string,
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func,
  setNotificationDataDto: PropTypes.func
};

export default NotificationMethodConfigurationPanel;
