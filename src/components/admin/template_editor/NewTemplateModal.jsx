import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "../../../core/data_model/model";
import CreateModal from "../../common/modal/CreateModal";
import TemplateEditorPanel from "./template_detail_view/TemplateEditorPanel";
import templateEditorMetadata from "./template-form-fields";

const INITIAL_TEMPLATE_DATA = {
  "type": [],
  "tags": [],
  "name": "",
  "description": "",
  "active": true,
  "roles": ["opsera", "everyone"],
  "account": "",
  "plan": [{}]
};

function NewTemplateModal({ setShowModal, showModal, loadData } ) {
  const [templateData, setTemplateData] = useState(undefined);

  useEffect(() => {
    setTemplateData(new Model({...INITIAL_TEMPLATE_DATA}, templateEditorMetadata, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Template"} showModal={showModal} loadData={loadData}>
        {templateData && <TemplateEditorPanel setTemplateData={setTemplateData} handleClose={handleClose} templateData={templateData} />}
      </CreateModal>
    </>
  );
}

NewTemplateModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewTemplateModal;


