import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import DeleteButtonBase from "temp-library-components/button/delete/DeleteButtonBase";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function DeleteOverlayBase(
  {
    children,
    titleIcon,
    objectType,
    closePanelFunction,
    deleteState,
    handleDeleteFunction,
    buttonContainer,
    deleteButtonDisabled,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const getButtonContainer = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    return (
      <ButtonContainerBase className={"p-3"}>
        <CancelButtonBase
          cancelFunction={handleClosePanelFunction}
          size={"md"}
        />
        <DeleteButtonBase
          buttonState={deleteState}
          onClickFunction={handleDeleteFunction}
          normalText={`Delete ${objectType}`}
          errorText={`Error Deleting ${objectType}`}
          busyText={`Deleting ${objectType}`}
          successText={`Successfully Deleted ${objectType}`}
          disabled={deleteButtonDisabled}
          className={"ml-3"}
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

  if (handleDeleteFunction == null && buttonContainer == null) {
    return null;
  }

  return (
    <ConfirmationOverlay
      closePanel={handleClosePanelFunction}
      buttonContainer={getButtonContainer()}
      titleText={`Confirm ${objectType} Deletion`}
      titleIcon={titleIcon}
      height={"100px"}
    >
      <div className={"m-4"}>
        <div className={"d-flex"}>
          <div className={"d-flex"}>
            <div className={"my-auto"}>
              <IconBase icon={faTrash} iconSize={"2x"} className={"danger-red"} />
            </div>
          </div>
          <div className={"flex-fill ml-4"}>
            <div>
              <div>Data cannot be recovered once this {objectType} is deleted.</div>
              <div>Do you still want to proceed?</div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </ConfirmationOverlay>
  );
}

DeleteOverlayBase.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanelFunction: PropTypes.func,
  buttonContainer: PropTypes.func,
  handleDeleteFunction: PropTypes.func,
  deleteState: PropTypes.string,
  deleteButtonDisabled: PropTypes.bool,
};

DeleteOverlayBase.defaultProps = {
  titleIcon: faTrash,
};


