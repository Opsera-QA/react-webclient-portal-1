import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import SlackStepNotificationToolInput
  from "components/workflow/plan/step/notifications/slack/SlackStepNotificationToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SlackStepNotificationEditorPanel(
  {
    slackNotificationModel,
    setSlackNotificationModel,
  }) {
  
  if (slackNotificationModel == null) {
    return null;
  }

  // TODO: Remove after updating the panel to use side tabs
  if (slackNotificationModel?.getData("enabled") === false) {
    return (
      <div className="my-4">
        <NotificationsToggle
          dataObject={slackNotificationModel}
          setDataObject={setSlackNotificationModel}
          fieldName={"enabled"}
          type={"slack"}
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <NotificationsToggle dataObject={slackNotificationModel} setDataObject={setSlackNotificationModel} fieldName={"enabled"} type={"slack"} />
      <small className="form-text text-muted px-2">
        Please Note: You must use the Add to Slack button on the
        <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
      </small>
      <NotificationLevelInput dataObject={slackNotificationModel} setDataObject={setSlackNotificationModel} fieldName={"event"} />
      <SlackStepNotificationToolInput setDataObject={setSlackNotificationModel} dataObject={slackNotificationModel} />
      <TextInputBase dataObject={slackNotificationModel} setDataObject={setSlackNotificationModel} fieldName={"channel"} />
    </div>
  );
}

SlackStepNotificationEditorPanel.propTypes = {
  slackNotificationModel: PropTypes.object,
  setSlackNotificationModel: PropTypes.func,
};

export default SlackStepNotificationEditorPanel;