import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import teamsNotificationMetadata from "components/notifications/notification_details/notification_method_forms/teams/teamsNotificationMetadata";
import TeamsStepNotificationToolInput from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationToolInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function TeamsNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), teamsNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      <ConnectToToolMessage toolFriendlyName={"Microsoft Teams"} />
      <TeamsStepNotificationToolInput setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
    </div>
  );
}

TeamsNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default TeamsNotificationMethodConfigurationPanel;


