import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ScriptsEditorPanel from "components/inventory/scripts/details/ScriptsEditorPanel";
import ScriptModel from "components/inventory/scripts/script.model";

function NewScriptOverlay({ loadData, isMounted, scriptMetadata, getAccessToken, cancelTokenSource }) {
  const toastContext = useContext(DialogToastContext);
  const [scriptModel, setScriptModel] = useState(
    new ScriptModel({...scriptMetadata.newObjectFields}, scriptMetadata, true, getAccessToken, cancelTokenSource, loadData, true, false, true)
  );

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={scriptMetadata?.type} loadData={loadData}>
      <div className={"mx-2"}>
        <ScriptsEditorPanel handleClose={closePanel} setScriptModel={setScriptModel} scriptModel={scriptModel}/>
      </div>
    </CreateCenterPanel>
  );
}

NewScriptOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scriptMetadata: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object,
};

export default NewScriptOverlay;


