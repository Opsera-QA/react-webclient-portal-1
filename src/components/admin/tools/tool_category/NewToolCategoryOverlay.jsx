import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ToolCategoryEditorPanel from "components/admin/tools/tool_category/tool_category_detail_view/ToolCategoryEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {toolCategoryMetadata} from "components/admin/tools/tool_category/toolCategory.metadata";

function NewToolCategoryOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [toolCategoryData, setToolCategoryData] = useState(new Model({...toolCategoryMetadata.newObjectFields}, toolCategoryMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
      <CreateCenterPanel
        objectType={toolCategoryMetadata.type}
        loadData={loadData}
        closePanel={closePanel}
      >
        <ToolCategoryEditorPanel
          toolCategoryData={toolCategoryData}
          setToolCategoryData={setToolCategoryData}
          handleClose={closePanel}
        />
      </CreateCenterPanel>
  );
}

NewToolCategoryOverlay.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object
};

export default NewToolCategoryOverlay;


