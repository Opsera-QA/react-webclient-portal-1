import React, { useState } from "react";
import PropTypes from "prop-types";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { Col, Row } from "react-bootstrap";
import { cannotBeUndone } from "components/common/tooltip/popover-text";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import InputContainer from "components/common/inputs/InputContainer";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

function DestructiveDeleteConfirmationOverlay(
  {
    titleIcon,
    deleteTopic,
    closePanel,
    deleteDetails,
    size,
    handleDeleteFunction,
  }) {
  const [confirmText, setConfirmText] = useState("");
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const handleDelete = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await handleDeleteFunction();
    } finally {
      setButtonState(buttonLabelHelper.BUTTON_STATES.READY);
    }
  };


  if (handleDeleteFunction == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Confirm Destructive Delete`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      <div className="p-3">
        <Row>
          <Col>
            <H5FieldSubHeader
              subheaderText={"This is a destructive deletion process. None of the relevant data can be recovered after deletion."}
            />
            {deleteDetails}
            <div className={"mt-2"}>
              If you are absolutely sure you want to delete {deleteTopic}, type &quot;CONFIRM&quot; and click CONFIRM
              DELETE.
            </div>
            <div className={"mt-2"}>
              THIS ACTION CANNOT BE UNDONE.
            </div>
            <InputContainer>
              <input
                value={confirmText}
                className={"form-control mt-2"}
                onChange={newText => setConfirmText(newText.target.value)}
              />
            </InputContainer>
            <ButtonContainerBase>
              <CancelButton
                cancelFunction={closePanel}
                className={"mr-2"}
                size={"md"}
              />
              <VanityButtonBase
                buttonState={buttonState}
                normalText={"CONFIRM DELETE"}
                busyText={`Deleting ${deleteTopic}`}
                tooltip={cannotBeUndone}
                icon={faTrash}
                disabled={confirmText !== "CONFIRM" || buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
                variant={"danger"}
                errorText={`Failed To Delete ${deleteTopic}!`}
                onClick={handleDelete}
                onClickFunction={handleDelete}
              >
              </VanityButtonBase>
            </ButtonContainerBase>
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

DestructiveDeleteConfirmationOverlay.propTypes = {
  deleteTopic: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
  deleteDetails: PropTypes.any,
  handleDeleteFunction: PropTypes.func,
};

DestructiveDeleteConfirmationOverlay.defaultProps = {
  titleIcon: faTrash,
};

export default DestructiveDeleteConfirmationOverlay;


