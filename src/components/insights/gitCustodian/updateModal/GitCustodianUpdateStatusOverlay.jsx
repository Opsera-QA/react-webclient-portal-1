import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import GitCustodianUpdateStatusEditorPanel from "./GitCustodianUpdateStatusEditorPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";

function GitCustodianUpdateStatusOverlay ({
  selectedIssues,
  setSelectedIssues
}) {
  
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={'Vulnerability Status'}
      size={CENTER_OVERLAY_SIZES.FULL_WIDTH}
    >
      <GitCustodianUpdateStatusEditorPanel
        handleClose={closePanel}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
      />
    </CreateCenterPanel>
  );
}

GitCustodianUpdateStatusOverlay.propTypes = {
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func
};

export default GitCustodianUpdateStatusOverlay;
