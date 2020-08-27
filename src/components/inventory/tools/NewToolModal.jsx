import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "../../../core/data_model/model";
import toolMetadata from "./tool-metadata";
import ToolEditorPanel from "./tool_details/ToolEditorPanel";
import CreateModal from "../../common/modal/CreateModal";

const INITIAL_TOOL_DATA = {
  name: "",
  description: "",
  tool_identifier: "",
  compliance: [],
  licensing: [],
  location: [],
  projects: [],
  contacts: [],
  applications: [],
  organization: [],
  external_reference: [],
  active: true,
  roles: [],
  configuration: {},
  status: "",
  tags: []
};

function NewToolModal({ setShowModal, loadData, showModal } ) {
  const [toolData, setToolData] = useState(undefined);

  useEffect(() => {
    setToolData(new Model({...INITIAL_TOOL_DATA}, toolMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Tool"} showModal={showModal} loadData={loadData} >
        {toolData && <ToolEditorPanel setToolData={setToolData} handleClose={handleClose} toolData={toolData} />}
      </CreateModal>
    </>
  );
}

NewToolModal.propTypes = {
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default NewToolModal;


