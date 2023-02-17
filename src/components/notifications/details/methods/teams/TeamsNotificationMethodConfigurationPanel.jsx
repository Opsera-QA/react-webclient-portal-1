import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import teamsNotificationMetadata from "components/notifications/details/methods/teams/teamsNotificationMetadata";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import TeamsStepNotificationTeamsToolSelectInput
  from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationTeamsToolSelectInput";

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
      <TeamsStepNotificationTeamsToolSelectInput
        setModel={setNotificationMethodDataDto}
        model={notificationMethodDataDto}
      />
    </div>
  );
}

TeamsNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default TeamsNotificationMethodConfigurationPanel;


