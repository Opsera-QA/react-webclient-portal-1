import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../../../../common/modal/CreateModal";
import ScmAccountsEditorPanel from "./ScmAccountsEditorPanel";

function NewScmAccountModal({ 
  toolData, 
  setShowModal, 
  showModal, 
  loadData, 
  scmAccountDataDto, 
  setScmAccountDataDto,
  editMode,
  setEditMode
}) {

  const handleClose = async () => {
    setShowModal(false);
    setEditMode(false);
    loadData();
  };

  return (
    <CreateModal
      handleCancelModal={handleClose}
      objectType={"Account"}
      showModal={showModal}
      loadData={loadData}
    >
      <ScmAccountsEditorPanel 
        toolData={toolData}        
        scmAccountDataDto={scmAccountDataDto}
        setScmAccountDataDto={setScmAccountDataDto}
        handleClose={handleClose}
        editMode={editMode}
      />      
    </CreateModal>
  );
}

NewScmAccountModal.propTypes = {
  toolData: PropTypes.object,  
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
  scmAccountDataDto: PropTypes.object,
  setScmAccountDataDto: PropTypes.func,
  credentialId: PropTypes.string,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
};

export default NewScmAccountModal;
