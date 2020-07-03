import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TagInput from "utils/tagInput";


function EditToolModal(props) {
  const [ tags, setTags] = useState([...props.data]);

  return (
    <>
      <Modal show={props.visible} onHide={() => props.onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <TagInput defaultValue={tags} onChange={data => setTags(data)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide()}>
            Close
          </Button>
          <Button variant="success" onClick={() => props.onClick(tags)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

  
EditToolModal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  onClick: PropTypes.func,
  data: PropTypes.array
};

export default EditToolModal;


