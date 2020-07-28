import React, { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import TagEditorPanel from "./tags_detail_view/TagEditorPanel";

const INITIAL_DATA = {
  key: "",
  value: "",
  configuration: {},
  active: false,
};

function NewTagModal( { onModalClose, showModal } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagData, setTagData] = useState(INITIAL_DATA);

  const handleClose = () => {
    onModalClose(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <TagEditorPanel setTagData={setTagData} newTag={true} handleClose={handleClose} tagData={tagData} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewTagModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewTagModal;


