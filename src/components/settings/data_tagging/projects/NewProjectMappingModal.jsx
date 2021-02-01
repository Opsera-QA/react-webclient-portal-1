import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import projectTagsMetadata from "./tagging-project-metadata";
import ProjectMappingEditorPanel from "./projects_detail_view/ProjectMappingEditorPanel";
import Model from "core/data_model/model";
import CreateModal from "components/common/modal/CreateModal";

function NewProjectMappingModal({ setShowModal, showModal, loadData }) {
  const [projectTagsData, setPojectTagsData] = useState(undefined);

  useEffect(() => {
    setPojectTagsData(new Model({ ...projectTagsMetadata.newObjectFields }, projectTagsMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Project Mapping"} showModal={showModal} loadData={loadData}>
      <ProjectMappingEditorPanel setToolTypeData={setPojectTagsData} handleClose={handleClose} projectTagsData={projectTagsData} />
    </CreateModal>
  );
}

NewProjectMappingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewProjectMappingModal;
