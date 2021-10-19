import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TempTagManagerInput from "../common/input/temp-tag-manager-input";

// TODO: Update to new overlay
function EditTagModal({visible, onHide, onClick, data}) {
    const [tags, setTags] = useState(data);

  return (
    <>
      <Modal show={visible} onHide={() => onHide()} className="tag-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pipeline-tag-modal-body">
            <TempTagManagerInput
              data={tags}
              setDataFunction={setTags}
              label={"Pipeline Tags"}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>Close</Button>
          <Button variant="success" onClick={() => onClick(tags)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

  
EditTagModal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  onClick: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default EditTagModal;


