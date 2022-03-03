import React, {useState} from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {cannotBeUndone} from "../tooltip/popover-text";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "components/common/icons/LoadingIcon";

// TODO: Remove after updating all references to use DestructiveDeleteConfirmationOverlay
function DestructiveDeleteModal({ deleteTopic, deleteDetails, showModal, setShowModal, handleDelete, modalSize }) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteObject = async () => {
    try {
      setIsDeleting(true);
      await handleDelete();
    }
    finally {
      setIsDeleting(false);
    }
  };

  const getDeleteButtonText = () => {
    if (isDeleting) {
      return <span><LoadingIcon className={"mr-2"} />Deleting...</span>;
    }

    return ("CONFIRM DELETE");
  };

  return (
    <Modal size={modalSize} show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Destructive Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col>
                <div>This is a destructive deletion process. None of the relevant data can be recovered after deletion.</div>
                {deleteDetails}
                <div className="mt-2">If you are absolutely sure you want to delete {deleteTopic}, type &quot;CONFIRM&quot; and click CONFIRM DELETE. </div>
                <div className="mt-2">THIS ACTION CANNOT BE UNDONE.</div>
                <input value={confirmText} className="form-control mt-2" onChange={newText => setConfirmText(newText.target.value)}/>
                <TooltipWrapper innerText={cannotBeUndone}>
                  <Button className="mt-2" disabled={confirmText !== "CONFIRM" || isDeleting} size="sm" variant="danger" onClick={deleteObject}>{getDeleteButtonText()}</Button>
                </TooltipWrapper>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

DestructiveDeleteModal.propTypes = {
  deleteTopic: PropTypes.string,
  deleteDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDelete: PropTypes.func,
  modalSize: PropTypes.string
};

DestructiveDeleteModal.defaultProps = {
  modalSize: "md"
};

export default DestructiveDeleteModal;


