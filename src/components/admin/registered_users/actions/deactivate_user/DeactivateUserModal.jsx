import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Button, Col, Modal, Row} from "react-bootstrap";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/tooltipWrapper";
import {cannotBeUndone} from "components/common/tooltip/popover-text";

function DeactivateUserModal({ closeModal, currentUserId, showModal }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [deactivatingUser, setIsDeactivatingUser] = useState(false);

  const handleDeactivateUser = async () => {
    try {
      setIsDeactivatingUser(true);
      await RegisteredUserActions.deactivateUser(currentUserId, getAccessToken);
      toastContext.showSuccessDialog("Successfully deactivated user");
      setIsDeactivatingUser(false);
      closeModal();
    }
    catch (error) {
      console.error(error);
      toastContext.showErrorDialog(error);
    }
  }

  const getDeactivationMessage = () => {
    if (deactivatingUser) {
      return (
        <Row className={"mt-3 ml-3"}>
          <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Deactivating User [{currentUserId}]</span>
        </Row>
      );
    }
  }

  return (
    <Modal size="md" show={showModal} onHide={closeModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm User Deactivation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col sm={1}>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faTrash} size={"lg"} className="danger-red"/>
                </div>
              </Col>
              <Col sm={11}>
                <div>Data cannot be recovered once this user is deactivated.</div>
                <div>Do you still want to proceed?</div>
              </Col>
            </Row>
            {getDeactivationMessage()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={closeModal}>Cancel</Button>
        <TooltipWrapper innerText={cannotBeUndone}>
          <Button size="sm" variant="danger" onClick={handleDeactivateUser}>Deactivate User</Button>
        </TooltipWrapper>
      </Modal.Footer>
    </Modal>
  );
}

DeactivateUserModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  currentUserId: PropTypes.string,
};

export default DeactivateUserModal;


