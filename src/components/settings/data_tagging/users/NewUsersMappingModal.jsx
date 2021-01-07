import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import usersTagsMetadata from "./tagging-users-metadata";
import Model from "../../../../core/data_model/model";
import CreateModal from "../../../common/modal/CreateModal";
import ToolTypeEditorPanel from "./users_detail_view/UsersMappingEditorPanel";

function NewUsersMappingModal({ setShowModal, showModal, loadData }) {
  const [usersTagsData, setUsersTagsData] = useState(undefined);

  useEffect(() => {
    setUsersTagsData(new Model({ ...usersTagsMetadata.newObjectFields }, usersTagsMetadata, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      <CreateModal
        handleCancelModal={handleClose}
        objectType={"User Mapping"}
        showModal={showModal}
        loadData={loadData}
      >
        {usersTagsData && (
          <ToolTypeEditorPanel
            setToolTypeData={setUsersTagsData}
            handleClose={handleClose}
            usersTagsData={usersTagsData}
          />
        )}
      </CreateModal>
    </>
  );
}

NewUsersMappingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewUsersMappingModal;
