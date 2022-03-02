import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import TeamsStepNotificationToolInput
  from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationToolInput";

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
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <NotificationsToggle dataObject={teamsNotificationModel} setDataObject={setTeamsNotificationModel} fieldName={"enabled"} />
      <small className="form-text text-muted px-2">
        Please Note: You must connect to Microsoft Teams on the
        <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
      </small>
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