import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import TooltipWrapper from "components/common/tooltip/tooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";
import Model from "core/data_model/model";

function EditRolesModal({showModal, dataObject, fieldName, handleClose, saveData}) {
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    setTemporaryDataObject(new Model({...dataObject?.getPersistData()}, dataObject?.getMetaData(), false));
  }, [showModal]);

  return (
    <Modal size={"lg"} show={showModal} onHide={() => handleClose()} className="tag-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Roles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-3">
          <RoleAccessInput dataObject={temporaryDataObject} setDataObject={setTemporaryDataObject} fieldName={fieldName} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <TooltipWrapper innerText={unsavedChanges}>
          <Button size={"sm"} variant="secondary" onClick={() => handleClose()}>Cancel</Button>
        </TooltipWrapper>
        <Button size={"sm"} variant="success" onClick={() => saveData(temporaryDataObject.getData(fieldName))}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

EditRolesModal.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  saveData: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
};

export default EditRolesModal;


