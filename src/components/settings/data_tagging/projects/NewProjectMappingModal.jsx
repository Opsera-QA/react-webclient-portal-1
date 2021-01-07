import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import projectTagsMetadata from "./tagging-project-metadata";
import Model from "../../../../core/data_model/model";
import CreateModal from "../../../common/modal/CreateModal";
import ToolTypeEditorPanel from "./projects_detail_view/ProjectMappingEditorPanel";

function NewProjectMappingModal({ setShowModal, showModal, loadData }) {
  const [projectTagsData, setPojectTagsData] = useState(undefined);

  useEffect(() => {
    setPojectTagsData(new Model({ ...projectTagsMetadata.newObjectFields }, projectTagsMetadata, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      <CreateModal
        handleCancelModal={handleClose}
        objectType={"Project Mapping"}
        showModal={showModal}
        loadData={loadData}
      >
        {projectTagsData && (
          <ToolTypeEditorPanel
            setToolTypeData={setPojectTagsData}
            handleClose={handleClose}
            projectTagsData={projectTagsData}
          />
        )}
      </CreateModal>
    </>
  );
}

NewProjectMappingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewProjectMappingModal;
