import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

// TODO: Remove this one and wire up the one in create_overlay when complete
function NewToolOverlay({ loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(new Model({...toolMetadata.newObjectFields}, toolMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={toolMetadata.type} loadData={loadData}>
      <ToolEditorPanel setToolData={setToolData} handleClose={closePanel} toolData={toolData}/>
    </CreateCenterPanel>
  );
}

NewToolOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewToolOverlay;


