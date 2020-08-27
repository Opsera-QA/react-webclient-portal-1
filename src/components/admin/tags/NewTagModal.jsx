import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import TagEditorPanel from "./tags_detail_view/TagEditorPanel";
import CreateModal from "../../common/modal/CreateModal";
import Model from "../../../core/data_model/model";
import tagEditorMetadata from "./tags-form-fields";

const INITIAL_DATA = {
  key: "",
  value: "",
  configuration: {},
  active: false,
};

function NewTagModal({ setShowModal, showModal, loadData }) {
  const [tagData, setTagData] = useState(undefined);

  useEffect(() => {
    setTagData(new Model({...INITIAL_DATA}, tagEditorMetadata, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Tag"} showModal={showModal} loadData={loadData} >
        {tagData && <TagEditorPanel setTagData={setTagData} newTag={true} handleClose={handleClose} tagData={tagData} />}
      </CreateModal>
    </>
  );
}

NewTagModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewTagModal;


