import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import IconBase from "components/common/icons/IconBase";
import { faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function AccessRoleLoseAccessConfirmationOverlay(
  {
    closePanelFunction,
    saveAccessRolesFunction,
    lostAccessRerouteRoute,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const saveAccessRoles = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await saveAccessRolesFunction();
      toastContext.showUpdateSuccessResultDialog("Access Rules");
      document.body.click();
      handleClosePanelFunction();
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
    }
    catch (error) {
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      toastContext.showUpdateFailureResultDialog("Access Rules", error);
    }
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"p-3"}>
        <CancelButtonBase
          cancelFunction={handleClosePanelFunction}
          size={"md"}
        />
        <VanityButtonBase
          buttonState={buttonState}
          onClickFunction={saveAccessRoles}
          normalText={`Save Access Roles`}
          errorText={`Error Saving Access Roles`}
          busyText={`Saving Access Roles`}
          successText={`Successfully Saved Access Roles`}
          className={"ml-2"}
        />
      </ButtonContainerBase>
    );
  };

  const handleClosePanelFunction = () => {
    if (closePanelFunction) {
      closePanelFunction();
    } else {
      toastContext.clearOverlayPanel();
    }
  };

  if (saveAccessRolesFunction == null || lostAccessRerouteRoute == null) {
    return null;
  }

  return (
    <ConfirmationOverlay
      closePanel={handleClosePanelFunction}
      buttonContainer={getButtonContainer()}
      titleText={`Confirm Access Role Updates`}
      titleIcon={faTriangleExclamation}
      height={"200px"}
    >
      <div className={"m-4"}>
        <div className={"d-flex"}>
          <div className={"d-flex"}>
            <div className={"my-auto"}>
              <IconBase icon={faTriangleExclamation} iconSize={"2x"} className={"danger-red"} />
            </div>
          </div>
          <div className={"flex-fill ml-4"}>
            <div>
              <H5FieldSubHeader
                subheaderText={"You will lose access if you apply these Access Rules."}
              />
              <div>Are you sure you would like to apply these Access Rules?</div>
            </div>
          </div>
        </div>
      </div>
    </ConfirmationOverlay>
  );
}

AccessRoleLoseAccessConfirmationOverlay.propTypes = {
  closePanelFunction: PropTypes.func,
  saveAccessRolesFunction: PropTypes.func,
  lostAccessRerouteRoute: PropTypes.string,
};

