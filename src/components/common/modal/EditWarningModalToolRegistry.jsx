import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import { faExclamationTriangle, faSpinner } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "../../../contexts/DialogToastContext";
import LoadingIcon from "components/common/icons/LoadingIcon";

// TODO: Delete
function EditWarningModalToolRegistry({ dataObject, showModal, setShowModal, handleEdit,handleClose }) {
  const [editing, setEditing] = useState(false);
  const toastContext = useContext(DialogToastContext);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const editItem = async () => {
    try {
      setEditing(true);
      if (dataObject != null) {
        await handleEdit();
      }
      toastContext.showUpdateSuccessResultDialog(dataObject.getType());
      handleModalClose();
      handleClose();
      }
    catch (error) {
      toastContext.showUpdateFailureResultDialog(dataObject.getType(), error);
    }
    finally {
      setEditing(false);
    }
  };
  const getLabel = () => {
    if (editing) {
      return (<span><LoadingIcon className={"mr-2"}/>Editing {dataObject.getType()}</span>);
    }

    return (<span>Edit {dataObject.getType()}</span>);
  };

  return (
    <Modal size="md" show={showModal} onHide={handleModalClose}centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {dataObject.getType()} Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col sm={1}>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} size={"lg"}/>
                </div>
              </Col>
              <Col sm={11}>
                <div>Editing {dataObject.getType()} does not change the configuration in the pipeline.</div>
                <div>Visit the <strong>Usage</strong> tab to view a list of pipelines that require attention.</div>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button size="sm" variant="warning" onClick={editItem}>{getLabel()}</Button>
      </Modal.Footer>
    </Modal>
  );
}

EditWarningModalToolRegistry.propTypes = {
  dataObject: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleClose: PropTypes.func
};

export default EditWarningModalToolRegistry;


