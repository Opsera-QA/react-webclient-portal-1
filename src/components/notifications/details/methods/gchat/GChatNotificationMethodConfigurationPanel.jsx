import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import gChatNotificationMetadata from "components/notifications/details/methods/gchat/gChatNotificationMetadata";
import GChatStepNotificationToolSelectInput from "components/workflow/plan/step/notifications/gchat/GChatStepNotificationToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function GChatNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), gChatNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      <ConnectToToolMessage toolFriendlyName={"Google Chat"} />
      <GChatStepNotificationToolSelectInput
        setModel={setNotificationMethodDataDto}
        model={notificationMethodDataDto}
      />
    </div>
  );
}

GChatNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default GChatNotificationMethodConfigurationPanel;
