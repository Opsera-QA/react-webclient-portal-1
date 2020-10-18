import React, {Fragment, useContext} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import {unsavedChanges} from "../tooltip/popover-text";

// TODO: This is unused but leaving it here for now in case we want to repurpose it
function ExternalLinkModal({children, externalUrl, title, showModal, setShowModal}) {

  return (
    <Fragment>
      <Modal size="lg" show={showModal} onHide={setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block-shaded m-3 full-height">
            <div className="p-3">
              {children}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TooltipWrapper innerText={unsavedChanges}>
            <Button size="sm" variant="secondary" onClick={setShowModal(false)}>Close</Button>
          </TooltipWrapper>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


ExternalLinkModal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  externalUrl: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default ExternalLinkModal;


