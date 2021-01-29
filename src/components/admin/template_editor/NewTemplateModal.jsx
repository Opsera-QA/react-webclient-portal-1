import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import templateEditorMetadata from "components/admin/template_editor/template-metadata";
import TemplateEditorPanel from "components/admin/template_editor/template_detail_view/TemplateEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function NewTemplateModal({ setShowModal, showModal, loadData } ) {
  const [templateData, setTemplateData] = useState(undefined);

  useEffect(() => {
    setTemplateData(new Model({...templateEditorMetadata.newObjectFields}, templateEditorMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Template"} showModal={showModal} loadData={loadData}>
      <TemplateEditorPanel setTemplateData={setTemplateData} handleClose={handleClose} templateData={templateData}/>
    </CreateModal>
  );
}

NewTemplateModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewTemplateModal;


