import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import toolCategoryMetadata from "components/admin/tools/tool_category/tool-category-metadata";
import Model from "core/data_model/model";
import ToolCategoryEditorPanel from "components/admin/tools/tool_category/tool_category_detail_view/ToolCategoryEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function NewToolCategoryOverlay({ loadData } ) {
  const toastContext = useContext(DialogToastContext);
  const [toolCategoryData, setToolCategoryData] = useState(new Model({...toolCategoryMetadata.newObjectFields}, toolCategoryMetadata, true));

  const closePanel = () => {
    loadData();
    toastContext.clearOverlayPanel();
  };

  return (
      <CreateCenterPanel objectType={toolCategoryMetadata.type} showPanel={true} loadData={loadData}  closePanel={closePanel}>
        <ToolCategoryEditorPanel setToolCategoryData={setToolCategoryData} handleClose={closePanel} toolCategoryData={toolCategoryData} />
      </CreateCenterPanel>
  );
}

NewToolCategoryOverlay.propTypes = {
  loadData: PropTypes.func
};

export default NewToolCategoryOverlay;


