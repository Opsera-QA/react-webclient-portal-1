import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import CreateModal from "components/common/modal/CreateModal";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";

function NewToolModal({ setShowModal, loadData, showModal } ) {
  const [toolData, setToolData] = useState(undefined);

  useEffect(() => {
    setToolData(new Model({...toolMetadata.newObjectFields}, toolMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Tool"} showModal={showModal} loadData={loadData} >
        <ToolEditorPanel setToolData={setToolData} handleClose={handleClose} toolData={toolData} />
    </CreateModal>
  );
}

NewToolModal.propTypes = {
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default NewToolModal;


