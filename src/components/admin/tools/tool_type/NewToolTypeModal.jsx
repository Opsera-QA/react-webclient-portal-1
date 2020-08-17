import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import toolTypeMetadata from "./tool-type-metadata";
import Model from "../../../../core/data_model/model";
import CreateModal from "../../../common/modal/CreateModal";
import ToolTypeEditorPanel from "./tool_type_detail_view/ToolTypeEditorPanel";

const INITIAL_TOOL_TYPE_DATA = {
  "name": "",
  "description": "",
  "identifier": "",
  "tags": [],
  "active": true,
};

function NewToolTypeModal({ onModalClose, showModal } ) {
  const [toolTypeData, setToolTypeData] = useState(undefined);

  useEffect(() => {
    setToolTypeData(new Model(INITIAL_TOOL_TYPE_DATA, toolTypeMetadata, true));
  }, []);

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Template"} showModal={showModal} >
        {toolTypeData && <ToolTypeEditorPanel setToolTypeData={setToolTypeData} handleClose={handleClose} toolTypeData={toolTypeData} />}
      </CreateModal>
    </>
  );
}

NewToolTypeModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewToolTypeModal;


