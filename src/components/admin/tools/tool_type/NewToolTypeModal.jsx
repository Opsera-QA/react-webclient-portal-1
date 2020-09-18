import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import toolTypeMetadata from "./tool-type-metadata";
import Model from "../../../../core/data_model/model";
import CreateModal from "../../../common/modal/CreateModal";
import ToolTypeEditorPanel from "./tool_type_detail_view/ToolTypeEditorPanel";

function NewToolTypeModal({ setShowModal, showModal, loadData } ) {
  const [toolTypeData, setToolTypeData] = useState(undefined);

  useEffect(() => {
    setToolTypeData(new Model({...toolTypeMetadata.newObjectFields}, toolTypeMetadata, true));
  }, []);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Tool Type"} showModal={showModal} loadData={loadData} >
        {toolTypeData && <ToolTypeEditorPanel setToolTypeData={setToolTypeData} handleClose={handleClose} toolTypeData={toolTypeData} />}
      </CreateModal>
    </>
  );
}

NewToolTypeModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewToolTypeModal;


