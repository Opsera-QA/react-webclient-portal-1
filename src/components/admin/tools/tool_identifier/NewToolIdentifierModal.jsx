import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../common/modal/CreateModal";
import ToolIdentifierEditorPanel from "./tool_identifier_detail_view/ToolIdentifierEditorPanel";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import Model from "../../../../core/data_model/model";

function NewToolIdentifierModal({ setShowModal, loadData, showModal } ) {
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);

  useEffect(() => {
    setToolIdentifierData(new Model({...toolIdentifierMetadata.newObjectFields}, toolIdentifierMetadata, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
      <CreateModal handleCancelModal={handleClose} objectType={"Tool Identifier"} showModal={showModal} loadData={loadData} >
        {toolIdentifierData && <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} handleClose={handleClose} />}
      </CreateModal>
  );
}

NewToolIdentifierModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewToolIdentifierModal;


