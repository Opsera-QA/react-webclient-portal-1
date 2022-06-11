import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { ORCHESTRATION_NOTIFICATION_TYPES } from "components/common/fields/notifications/notificationTypes.constants";

// TODO: Make actual displayer
function OrchestrationNotificationSettingsDisplayer({notifications, className, noDataMessage}) {
  const [emailSettings, setEmailSettings] = useState(undefined);
  const [jiraSettings, setJiraSettings] = useState(undefined);
  const [serviceNowSettings, setServiceNowSettings] = useState(undefined);
  const [slackSettings, setSlackSettings] = useState(undefined);
  const [microsoftTeamsSettings, setMicrosoftTeamsSettings] = useState(undefined);

  useEffect(() => {
      unpackRoles();
  }, [JSON.stringify(notifications)]);

  const unpackRoles = () => {
    if (Array.isArray(notifications) && notifications.length > 0) {
      notifications.forEach((notificationConfiguration) => {
        const type = notificationConfiguration?.type;

        switch (type) {
          case ORCHESTRATION_NOTIFICATION_TYPES.EMAIL:
            setEmailSettings({...notificationConfiguration});
            break;
          case ORCHESTRATION_NOTIFICATION_TYPES.JIRA:
            setJiraSettings({...notificationConfiguration});
            break;
          case ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW:
            setServiceNowSettings({...notificationConfiguration});
            break;
          case ORCHESTRATION_NOTIFICATION_TYPES.SLACK:
            setSlackSettings({...notificationConfiguration});
            break;
          case ORCHESTRATION_NOTIFICATION_TYPES.TEAMS:
            setMicrosoftTeamsSettings({...notificationConfiguration});
            break;
        }
      });
    }
  };

  const getEnabledNotificationTypeString = () => {
    let enabledNotificationString = "";

    if (emailSettings?.enabled === true) {
      enabledNotificationString += enabledNotificationString?.length > 0 ? ", Email" : "Email";
    }

    if (jiraSettings?.enabled === true) {
      enabledNotificationString += enabledNotificationString?.length > 0 ? ", Jira" : "Jira";
    }

    if (serviceNowSettings?.enabled === true) {
      enabledNotificationString += enabledNotificationString?.length > 0 ? ", Service Now" : "Service Now";
    }

    if (slackSettings?.enabled === true) {
      enabledNotificationString += enabledNotificationString?.length > 0 ? ", Slack" : "Slack";
    }

    if (microsoftTeamsSettings?.enabled === true) {
      enabledNotificationString += enabledNotificationString?.length > 0 ? ", Microsoft Teams" : "Microsoft Teams";
    }

    if (enabledNotificationString?.length === 0) {
      enabledNotificationString = "No";
    }

    return `${enabledNotificationString} notification settings enabled`;
  };


  if (!Array.isArray(notifications) || notifications?.length === 0) {
    return (
      <span className={className}>
        {noDataMessage}
      </span>
    );
  }

  return (
    <span className={className}>
      {getEnabledNotificationTypeString()}
    </span>
  );
}

OrchestrationNotificationSettingsDisplayer.propTypes = {
  notifications: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};

OrchestrationNotificationSettingsDisplayer.defaultProps = {
  noDataMessage: "No notification settings enabled"
};

export default OrchestrationNotificationSettingsDisplayer;