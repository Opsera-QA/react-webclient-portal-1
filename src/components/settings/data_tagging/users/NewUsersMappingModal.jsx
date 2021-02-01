import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import usersTagsMetadata from "./tagging-users-metadata";
import Model from "core/data_model/model";
import UsersMappingEditorPanel from "./users_detail_view/UsersMappingEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function NewUsersMappingModal({ setShowModal, showModal, loadData }) {
  const [usersTagsData, setUsersTagsData] = useState(undefined);

  useEffect(() => {
    setUsersTagsData(new Model({ ...usersTagsMetadata.newObjectFields }, usersTagsMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"User Mapping"} showModal={showModal} loadData={loadData}>
      <UsersMappingEditorPanel setToolTypeData={setUsersTagsData} handleClose={handleClose} usersTagsData={usersTagsData}/>
    </CreateModal>
  );
}

NewUsersMappingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewUsersMappingModal;
