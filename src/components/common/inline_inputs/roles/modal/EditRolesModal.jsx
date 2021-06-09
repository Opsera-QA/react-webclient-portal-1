import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import ModalSaveButtonBase from "components/common/buttons/saving/ModalSaveButtonBase";

function EditRolesModal({showModal, dataObject, fieldName, handleClose, saveData}) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setTemporaryDataObject(new Model({...dataObject?.getPersistData()}, dataObject?.getMetaData(), false));
  }, [showModal]);

  const handleSave = async () => {
    return await saveData(temporaryDataObject.getData(fieldName));
  };

  return (
    <Modal size={"lg"} show={showModal} onHide={() => handleClose()} className="tag-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Access Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-block-shaded m-3">
          {toastContext.getInlineBanner()}
          <div className="p-3">
            <div className="text-color mx-2 mb-2">Access Rules define who has privileges to interact with a resource.
              Individual users or groups can be used to grant the access.  Owners and Administrators have full access, Managers and SecOps roles have
              limited editing access while users can only run or use resources.</div>
            <RoleAccessInput dataObject={temporaryDataObject} setDataObject={setTemporaryDataObject} fieldName={fieldName} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ModalSaveButtonBase updateRecord={handleSave} recordDto={temporaryDataObject} handleClose={handleClose} />
        <TooltipWrapper innerText={unsavedChanges}>
          <Button size={"sm"} variant="secondary" onClick={() => handleClose()}>Cancel</Button>
        </TooltipWrapper>
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


