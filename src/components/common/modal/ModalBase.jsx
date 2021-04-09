import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import CloseButton from "components/common/buttons/CloseButton";

function ModalBase({showModal, title, size, handleClose, buttonContainer, children, className}) {
  const getButtonContainer = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    return (<CloseButton showUnsavedChangesMessage={false} closeEditorCallback={handleClose} />);
  };

  return (
    <Modal show={showModal} size={size} onHide={() => handleClose()} className={className}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {getButtonContainer()}
      </Modal.Footer>
    </Modal>
  );
}


ModalBase.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttonContainer: PropTypes.object,
  showModal: PropTypes.bool,
  size: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string
};

export default ModalBase;


