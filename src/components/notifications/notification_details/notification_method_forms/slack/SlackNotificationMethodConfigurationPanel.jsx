import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {Link} from "react-router-dom";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import slackNotificationMetadata from "components/notifications/notification_details/notification_method_forms/slack/slackNotificationMetadata";
import SlackStepNotificationToolInput from "components/workflow/plan/step/notifications/slack/SlackStepNotificationToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import IconBase from "components/common/icons/IconBase";

function SlackNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), slackNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  const getSlackMessage = () => {
    return (
      <small className="form-text text-muted px-2">
        Please Note: You must use the Add to Slack button on the
        <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
      </small>
    );
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      {getSlackMessage()}
      <SlackStepNotificationToolInput setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <TextInputBase dataObject={notificationMethodDataDto} setDataObject={setNotificationMethodDataDto} fieldName={"channel"} />
    </div>
  );
}

SlackNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default SlackNotificationMethodConfigurationPanel;


