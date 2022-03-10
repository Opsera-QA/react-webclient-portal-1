import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import ToolIdentifierEditorPanel
  from "components/admin/tools/identifiers/details/ToolIdentifierEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";


function NewToolIdentifierOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [toolIdentifierData, setToolIdentifierData] = useState(new Model({...toolIdentifierMetadata.newObjectFields}, toolIdentifierMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={toolIdentifierMetadata.type} loadData={loadData}>
      <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} handleClose={closePanel} />
    </CreateCenterPanel>
  );
}

NewToolIdentifierOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewToolIdentifierOverlay;


