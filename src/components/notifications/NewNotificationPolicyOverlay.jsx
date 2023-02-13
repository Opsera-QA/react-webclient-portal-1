import React from "react";
import PropTypes from "prop-types";
import notificationsMetadata from "./notifications-metadata";
import NotificationPolicyEditorPanel from "components/notifications/details/NotificationPolicyEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useGetNewNotificationPolicyModel from "hooks/notification_policies/model/useGetNewNotificationPolicyModel";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function NewNotificationPolicyOverlay({ loadData } ) {
  const { toastContext } = useComponentStateReference();
  const {
    notificationPolicyModel,
    setNotificationPolicyModel,
  } = useGetNewNotificationPolicyModel();

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={notificationsMetadata.type} loadData={loadData}>
      <NotificationPolicyEditorPanel
        notificationData={notificationPolicyModel}
        setNotificationData={setNotificationPolicyModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewNotificationPolicyOverlay.propTypes = {
  loadData: PropTypes.func,
};
