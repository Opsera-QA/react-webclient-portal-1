import React from "react";
import PropTypes from "prop-types";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import SignificantOperationConfirmationOverlayBase
  from "components/common/overlays/center/SignificantOperationConfirmationOverlayBase";

export default function ConfirmElkStackDeploymentOverlay({ userId }) {
  const { getAccessToken, toastContext, } = useComponentStateReference();

  const deployElkStack = async () => {
    try {
      const response = await RegisteredUserActions.deployElkStack(userId, getAccessToken);
      const statusCode = response.status;

      if (statusCode === 200) {
        toastContext.showSuccessDialog("Successfully Deployed ELK Stack");
        toastContext.clearOverlayPanel();
      } else {
        toastContext.showErrorDialog("Something went wrong deploying ELK stack. View browser logs for more details");
        console.error(response);
      }
    } catch (error) {
      toastContext.showSystemErrorToast(error);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <SignificantOperationConfirmationOverlayBase
      closePanel={closePanel}
      handleOperationFunction={deployElkStack}
    />
  );
}

ConfirmElkStackDeploymentOverlay.propTypes = {
  userId: PropTypes.string,
};
