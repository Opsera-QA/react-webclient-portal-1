import React from "react";
import PropTypes from "prop-types";
import notificationsMetadata from "./notifications-metadata";
import NotificationEditorPanel from "./notification_details/NotificationEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useGetNewNotificationPolicyModel from "hooks/notification_policies/model/useGetNewNotificationPolicyModel";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function NewNotificationOverlay({ loadData } ) {
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
      <NotificationEditorPanel
        notificationData={notificationPolicyModel}
        setNotificationData={setNotificationPolicyModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewNotificationOverlay.propTypes = {
  loadData: PropTypes.func,
};
