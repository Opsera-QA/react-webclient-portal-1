import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import IconBase from "components/common/icons/IconBase";
import {faShareAlt, faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function OwnershipTransferConfirmationOverlay(
  {
    closePanelFunction,
    type,
    willLoseAccess,
    ownershipTransferFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const transferOwnership = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await ownershipTransferFunction(willLoseAccess);
      toastContext.showUpdateSuccessResultDialog(type);
      document.body.click();
      handleClosePanelFunction();
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
    }
    catch (error) {
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      toastContext.showUpdateFailureResultDialog(type, error);
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
          icon={faShareAlt}
          onClickFunction={transferOwnership}
          normalText={`Transfer Ownership`}
          errorText={`Error Transferring Ownership`}
          busyText={`Transferring Ownership`}
          successText={`Successfully Transferred Ownership`}
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

  const getText = () => {
    if (willLoseAccess === true) {
      return (
        <div>
          <H5FieldSubHeader
            subheaderText={"You will lose access if you transfer owners."}
          />
          <div>Are you sure you would like to transfer ownership for this {type}?</div>
        </div>
      );
    }

    return (
      <div>Are you sure you would like to transfer ownership for this {type}?</div>
    );
  };

  if (ownershipTransferFunction == null) {
    return null;
  }

  return (
    <ConfirmationOverlay
      closePanel={handleClosePanelFunction}
      buttonContainer={getButtonContainer()}
      titleText={`Confirm Ownership Transfer`}
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
              {getText()}
            </div>
          </div>
        </div>
      </div>
    </ConfirmationOverlay>
  );
}

OwnershipTransferConfirmationOverlay.propTypes = {
  closePanelFunction: PropTypes.func,
  ownershipTransferFunction: PropTypes.func,
  willLoseAccess: PropTypes.bool,
  type: PropTypes.string,
};

