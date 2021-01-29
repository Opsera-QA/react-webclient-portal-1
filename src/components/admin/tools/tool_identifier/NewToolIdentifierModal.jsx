import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import toolIdentifierMetadata from "components/admin/tools/tool_identifier/tool-identifier-metadata";
import ToolIdentifierEditorPanel
  from "components/admin/tools/tool_identifier/tool_identifier_detail_view/ToolIdentifierEditorPanel";
import CreateModal from "components/common/modal/CreateModal";
import Model from "core/data_model/model";

function NewToolIdentifierModal({ setShowModal, loadData, showModal } ) {
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);

  useEffect(() => {
    setToolIdentifierData(new Model({...toolIdentifierMetadata.newObjectFields}, toolIdentifierMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={toolIdentifierMetadata.type} showModal={showModal} loadData={loadData}>
      <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} handleClose={handleClose} />
    </CreateModal>
  );
}

NewToolIdentifierModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewToolIdentifierModal;


