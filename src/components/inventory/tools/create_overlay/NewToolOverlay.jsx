import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ToolIdentifierSelectionScreen from "components/inventory/tools/create_overlay/ToolIdentifierSelectionScreen";

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

  const getView = () => {
    const toolIdentifier = toolData?.getData("tool_identifier");

    if (toolIdentifier == null || toolIdentifier === "") {
      return (
        <ToolIdentifierSelectionScreen
          toolModel={toolData}
          setToolModel={setToolData}
        />
      );
    }

    return (
      <ToolEditorPanel
        setToolData={setToolData}
        handleClose={closePanel}
        toolData={toolData}
      />
    );
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={toolMetadata.type} loadData={loadData}>
      {getView()}
    </CreateCenterPanel>
  );
}

NewToolOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewToolOverlay;


