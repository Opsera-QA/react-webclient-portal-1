import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import jiraNotificationMetadata from "components/notifications/notification_details/notification_method_forms/jira/jiraNotificationMetadata";
import JiraNotificationJiraToolSelectInput from "components/notifications/notification_details/notification_method_forms/jira/JiraNotificationJiraToolSelectInput";

function JiraNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), jiraNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  const getJiraMessage = () => {
    return (
      <small className="form-text text-muted px-2">
        Please Note: You must connect to Jira on the
        <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
      </small>
    );
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      {getJiraMessage()}
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


