import React, {useState} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Turn into overlay
function ExpireTokenModal({ token, expireToken, showModal, setShowModal }) {
  const [isExpiring, setIsExpiring] = useState(false);

  const handleConfirm = async () => {
    setIsExpiring(true);
    const success = await expireToken(token);

    if (success === false) {
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} size={"sm"} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Expire Token Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-3 pt-2">
          {`Are you sure you want to expire this access token [${token?.name}]? This action cannot be undone.`}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleConfirm()}>
          <IconBase isLoading={isExpiring} icon={faExclamationCircle} className={"mr-2"}/>Expire Token
        </Button>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ExpireTokenModal.propTypes = {
  expireToken: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  token: PropTypes.object
};

export default ExpireTokenModal;


