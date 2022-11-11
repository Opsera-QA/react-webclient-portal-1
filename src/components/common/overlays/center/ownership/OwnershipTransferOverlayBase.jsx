import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import { faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TransferOwnershipButton from "components/common/buttons/transfer/TransferOwnershipButton";
import CancelButton from "components/common/buttons/CancelButton";

export default function OwnershipTransferOverlayBase(
  {
    type,
    model,
    setModel,
    ownershipTransferFunction,
  }) {
  const toastContext = useContext(DialogToastContext);

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"p-3 bg-white"}>
        <CancelButton
          className={"mr-2"}
          cancelFunction={handleClosePanelFunction}
          size={"md"}
        />
        <TransferOwnershipButton
          disabled={model?.isChanged("owner") !== true}
          transferOwnershipFunction={ownershipTransferFunction}
          buttonSize={"md"}
        />
      </ButtonContainerBase>
    );
  };

  const handleClosePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <ConfirmationOverlay
      closePanel={handleClosePanelFunction}
      buttonContainer={getButtonContainer()}
      titleText={`${type} Ownership Transfer`}
      titleIcon={faTriangleExclamation}
      height={"200px"}
    >
      <div className={"m-3 w-100"}>
        <Row>
          <Col xs={12}>
            <LdapUserSelectInput
              fieldName={"owner"}
              model={model}
              setModel={setModel}
              showClearValueButton={false}
            />
          </Col>
        </Row>
      </div>
    </ConfirmationOverlay>
  );
}

OwnershipTransferOverlayBase.propTypes = {
  ownershipTransferFunction: PropTypes.func,
  type: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
};

