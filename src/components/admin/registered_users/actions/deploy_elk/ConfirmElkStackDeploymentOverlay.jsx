import React from "react";
import PropTypes from "prop-types";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import SignificantOperationConfirmationOverlayBase
  from "components/common/overlays/center/SignificantOperationConfirmationOverlayBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";
import useApiState, {API_STATES} from "hooks/general/api/useApiState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";

export default function ConfirmElkStackDeploymentOverlay({ user }) {
  const { getAccessToken, toastContext, } = useComponentStateReference();
  const { apiState, apiStateFunctions } = useApiState();
  const organizationAccountOwner = DataParsingHelper.parseNestedEmailAddress(user, "ldap.orgAccountOwnerEmail");

  const deployElkStack = async () => {
    try {
      apiStateFunctions.setBusyState();
      const response = await RegisteredUserActions.deployElkStack(user?._id, getAccessToken);
      const statusCode = response.status;

      if (statusCode === 200) {
        apiStateFunctions.setSuccessState();
        toastContext.showSuccessDialog("Successfully Deployed ELK Stack");
        toastContext.clearOverlayPanel();
      } else {
        apiStateFunctions.setErrorState();
        toastContext.showErrorDialog("Something went wrong deploying ELK stack. View browser logs for more details");
        console.error(response);
      }
    } catch (error) {
      apiStateFunctions.setErrorState();
      toastContext.showSystemErrorToast(error);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (user == null) {
    return null;
  }

  if (organizationAccountOwner) {
    return (
      <SignificantOperationConfirmationOverlayBase
        closePanel={closePanel}
        handleOperationFunction={deployElkStack}
        apiState={apiState}
        size={"sm"}
      >
        <WarningMessageFieldBase
          message={"The customer you're trying to deploy tools for has already had tools deployed. Completing this operation MAY BREAK the existing customer stack."}
        />
      </SignificantOperationConfirmationOverlayBase>
    );
  }

  return (
    <ConfirmationOverlay
      closePanel={closePanel}
      handleOperationFunction={deployElkStack}
      titleText={"Deploy ELK Stack?"}
      buttonContainer={
        <ButtonContainerBase className={"p-3"}>
          <CancelButtonBase
            className={"mr-2"}
            disabled={apiState === API_STATES.BUSY}
            cancelFunction={closePanel}
          />
          <VanityButtonBase
            buttonState={apiState}
            normalText={"Deploy ELK Stack"}
            busyText={`Triggering ELK Stack Deployment`}
            errorText={`Failed To Trigger ELK Stack Deployment!`}
            successText={`Successfully Triggered ELK Stack Deployment!`}
            tooltip={cannotBeUndone}
            icon={faCheckCircle}
            disabled={apiState === buttonLabelHelper.BUTTON_STATES.BUSY}
            variant={"success"}
            onClickFunction={deployElkStack}
          />
        </ButtonContainerBase>
      }
    >
      <div className={"m-3"}>
        {"You are about to deploy an entire customer tenant. Do you want to proceed?"}
      </div>
    </ConfirmationOverlay>
  );
}

ConfirmElkStackDeploymentOverlay.propTypes = {
  user: PropTypes.object,
};
