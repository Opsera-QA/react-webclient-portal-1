import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "../../../core/data_model/model";
import CreateModal from "../../common/modal/CreateModal";
import TemplateEditorPanel from "./template_detail_view/TemplateEditorPanel";
import templateEditorMetadata from "./template-form-fields";

const INITIAL_TEMPLATE_DATA = {
  "type": [],
  "tags": [],
  "name": "Blank Pipeline Template",
  "description": "Create a new template from scratch.",
  "active": true,
  "roles": ["opsera", "everyone"],
  "account": "org-opsera-dnd-acc0",
  "plan": [
    {
      "tool": {},
      "trigger": [],
      "type": [],
      "notification": [],
      "name": "",
      "description": "",
      "active": true
    }
  ]
};

function NewTemplateModal({ onModalClose, showModal } ) {
  const [templateData, setTemplateData] = useState(undefined);

  useEffect(() => {
    setTemplateData(new Model(INITIAL_TEMPLATE_DATA, templateEditorMetadata, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Template"} showModal={showModal} >
        {templateData && <TemplateEditorPanel setTemplateData={setTemplateData} handleClose={handleClose} templateData={templateData} />}
      </CreateModal>
    </>
  );
}

NewTemplateModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewTemplateModal;


