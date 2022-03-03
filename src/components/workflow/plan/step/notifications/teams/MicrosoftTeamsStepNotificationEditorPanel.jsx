import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import TeamsStepNotificationToolInput
  from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationToolInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function MicrosoftTeamsStepNotificationEditorPanel(
  {
    teamsNotificationModel,
    setTeamsNotificationModel,
  }) {
  
  if (teamsNotificationModel == null) {
    return null;
  }

  // TODO: Remove after updating the panel to use side tabs
  if (teamsNotificationModel?.getData("enabled") === false) {
    return (
      <div className="my-4">
        <NotificationsToggle
          dataObject={teamsNotificationModel}
          setDataObject={setTeamsNotificationModel}
          fieldName={"enabled"}
          type={"teams"}
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <NotificationsToggle dataObject={teamsNotificationModel} setDataObject={setTeamsNotificationModel} fieldName={"enabled"} type={"teams"}/>
      <ConnectToToolMessage toolFriendlyName={"Microsoft Teams"} />
      <NotificationLevelInput dataObject={teamsNotificationModel} setDataObject={setTeamsNotificationModel} fieldName={"event"} />
      <TeamsStepNotificationToolInput setDataObject={setTeamsNotificationModel} dataObject={teamsNotificationModel} />
    </div>
  );
}

MicrosoftTeamsStepNotificationEditorPanel.propTypes = {
  teamsNotificationModel: PropTypes.object,
  setTeamsNotificationModel: PropTypes.func,
};

export default MicrosoftTeamsStepNotificationEditorPanel;