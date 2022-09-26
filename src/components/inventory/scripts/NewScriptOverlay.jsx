import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ScriptsEditorPanel from "components/inventory/scripts/details/ScriptsEditorPanel";
import scriptsLibraryMetadata from "@opsera/definitions/constants/registry/script_library/scriptsLibrary.metadata";
import useGetNewScriptModel from "components/inventory/scripts/hooks/useGetNewScriptModel";

export default function NewScriptOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const {
    scriptModel,
    setScriptModel,
  } = useGetNewScriptModel();

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={scriptsLibraryMetadata?.type}
      loadData={loadData}
    >
      <div className={"mx-2"}>
        <ScriptsEditorPanel
          handleClose={closePanel}
          setScriptModel={setScriptModel}
          scriptModel={scriptModel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewScriptOverlay.propTypes = {
  loadData: PropTypes.func,
};


