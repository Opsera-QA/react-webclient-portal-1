import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import toolCategoryMetadata from "components/admin/tools/tool_category/tool-category-metadata";
import Model from "core/data_model/model";
import CreateModal from "components/common/modal/CreateModal";
import ToolCategoryEditorPanel from "components/admin/tools/tool_category/tool_category_detail_view/ToolCategoryEditorPanel";

function NewToolCategoryModal({ setShowModal, showModal, loadData } ) {
  const [toolCategoryData, setToolCategoryData] = useState(undefined);

  useEffect(() => {
    setToolCategoryData(new Model({...toolCategoryMetadata.newObjectFields}, toolCategoryMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <>
      <CreateModal handleCancelModal={handleClose} objectType={toolCategoryMetadata.type} showModal={showModal} loadData={loadData} >
        <ToolCategoryEditorPanel setToolCategoryData={setToolCategoryData} handleClose={handleClose} toolCategoryData={toolCategoryData} />
      </CreateModal>
    </>
  );
}

NewToolCategoryModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func
};

export default NewToolCategoryModal;


