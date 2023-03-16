import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";
import {notificationPolicyHelper} from "hooks/notification_policies/notificationPolicy.helper";
import NotificationPolicyRoleHelper
  from "@opsera/know-your-role/roles/notification_policies/notificationPolicyRole.helper";

export default function DeleteNotificationPolicyActionBarButton(
  {
    notificationPolicyModel,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const notificationPolicyActions = useNotificationPolicyActions();

  const handleDeleteFunction = async () => {
    return await notificationPolicyActions.deleteNotificationPolicy(
      notificationPolicyModel?.getMongoDbId(),
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Notification Policy"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(notificationPolicyHelper.getManagementScreenLink())}
      />
    );
  };

  if (NotificationPolicyRoleHelper.canDeleteNotificationPolicy(userData, notificationPolicyModel?.getOriginalData()) !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Notification Policy`}
      className={className}
    />
  );
}

DeleteNotificationPolicyActionBarButton.propTypes = {
  notificationPolicyModel: PropTypes.object,
  className: PropTypes.string,
};
