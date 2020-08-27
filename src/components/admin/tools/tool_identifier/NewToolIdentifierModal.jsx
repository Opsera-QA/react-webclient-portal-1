import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "../../../common/modal/CreateModal";
import ToolIdentifierEditorPanel from "./tool_identifier_detail_view/ToolIdentifierEditorPanel";
import toolIdentifierMetadata from "./tool-identifier-metadata";
import Model from "../../../../core/data_model/model";

const INITIAL_TOOL_IDENTIFIER_DATA = {
  name: "",
  description: "",
  identifier: "",
  tags: [],
  rules: {},
  properties: {
    isLiveStream: false
  },
  active: true,
};

function NewToolIdentifierModal({ setShowModal, loadData, showModal } ) {
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);

  useEffect(() => {
    setToolIdentifierData(new Model({...INITIAL_TOOL_IDENTIFIER_DATA}, toolIdentifierMetadata, true));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Tool Identifier"} showModal={showModal} loadData={loadData} >
        {toolIdentifierData && <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} />}
      </CreateModal>
    </>
  );
}

NewToolIdentifierModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewToolIdentifierModal;


