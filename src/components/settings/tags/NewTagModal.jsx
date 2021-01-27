import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import CreateModal from "components/common/modal/CreateModal";
import TagEditorPanel from "components/settings/tags/tags_detail_view/TagEditorPanel";

function NewTagModal({ setShowModal, showModal, loadData }) {
  const [tagData, setTagData] = useState(undefined);

  useEffect(() => {
    setTagData(new Model({...tagEditorMetadata.newObjectFields}, tagEditorMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Tag"} showModal={showModal} loadData={loadData}>
      <TagEditorPanel setTagData={setTagData} handleClose={handleClose} tagData={tagData}/>
    </CreateModal>
  );
}

NewTagModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewTagModal;


