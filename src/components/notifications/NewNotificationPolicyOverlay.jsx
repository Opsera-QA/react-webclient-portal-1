import React from "react";
import PropTypes from "prop-types";
import NotificationPolicyEditorPanel from "components/notifications/details/NotificationPolicyEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useGetNewNotificationPolicyModel from "hooks/notification_policies/model/useGetNewNotificationPolicyModel";
import useComponentStateReference from "hooks/useComponentStateReference";
import notificationPolicyMetadata
  from "@opsera/definitions/constants/notification_policies/notificationPolicy.metadata";

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
    <CreateCenterPanel closePanel={closePanel} objectType={notificationPolicyMetadata.type} loadData={loadData}>
      <div className={"m-3"}>
        <NotificationPolicyEditorPanel
          notificationData={notificationPolicyModel}
          setNotificationData={setNotificationPolicyModel}
          handleClose={closePanel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewNotificationPolicyOverlay.propTypes = {
  loadData: PropTypes.func,
};
