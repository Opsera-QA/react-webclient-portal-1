import React, { useState } from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import { Col, Row } from "react-bootstrap";
import { cannotBeUndone } from "components/common/tooltip/popover-text";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import InputContainer from "components/common/inputs/InputContainer";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function SignificantOperationConfirmationOverlayBase(
  {
    titleIcon,
    closePanel,
    children,
    size,
    handleOperationFunction,
    apiState,
  }) {
  const [confirmText, setConfirmText] = useState("");

  if (handleOperationFunction == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={`Confirm Operation`}
      titleIcon={titleIcon}
      showCloseButton={false}
      size={size}
    >
      <div className="p-3">
        <Row>
          <Col>
            <H5FieldSubHeader
              subheaderText={"This is a significant operation that cannot be reversed."}
            />
            {children}
            <div className={"mt-2"}>
              If you are absolutely sure you want to perform this operation, type &quot;CONFIRM&quot; and click CONFIRM
              OPERATION.
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
                buttonState={apiState}
                normalText={"CONFIRM OPERATION"}
                busyText={`Performing Operation`}
                errorText={`Failed To Perform Operation!`}
                successText={`Successfully Performed Operation`}
                tooltip={cannotBeUndone}
                icon={faCheckCircle}
                disabled={confirmText !== "CONFIRM" || apiState === buttonLabelHelper.BUTTON_STATES.BUSY}
                variant={"secondary"}
                onClickFunction={handleOperationFunction}
              >
              </VanityButtonBase>
            </ButtonContainerBase>
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

SignificantOperationConfirmationOverlayBase.propTypes = {
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.any,
  handleOperationFunction: PropTypes.func,
  apiState: PropTypes.string,
};

SignificantOperationConfirmationOverlayBase.defaultProps = {
  titleIcon: faQuestionCircle,
};
