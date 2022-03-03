import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import jiraNotificationMetadata from "components/notifications/notification_details/notification_method_forms/jira/jiraNotificationMetadata";
import JiraNotificationJiraToolSelectInput from "components/notifications/notification_details/notification_method_forms/jira/JiraNotificationJiraToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function JiraNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), jiraNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      <ConnectToToolMessage toolFriendlyName={"Jira"} />
      <JiraNotificationJiraToolSelectInput
        model={notificationMethodDataDto}
        setModel={setNotificationMethodDataDto}
      />
    </div>
  );
}

JiraNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default JiraNotificationMethodConfigurationPanel;


