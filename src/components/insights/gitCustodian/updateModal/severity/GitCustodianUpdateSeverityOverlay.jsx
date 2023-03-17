import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import GitCustodianUpdateSeverityEditorPanel from "./GitCustodianUpdateSeverityEditorPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import UpdateCenterPanelOverlayBase from "components/common/overlays/center/UpdateCenterPanelOverlayBase";

function GitCustodianUpdateSeverityOverlay ({
  selectedIssues,
  setSelectedIssues,
  loadData,
}) {
  
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();    
  };

  return (
    <UpdateCenterPanelOverlayBase
      objectType={'Vulnerability Severity'}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.STANDARD}
    >
      <GitCustodianUpdateSeverityEditorPanel
        handleClose={closePanel}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
        loadData={loadData}
      />
    </UpdateCenterPanelOverlayBase>
  );
}

GitCustodianUpdateSeverityOverlay.propTypes = {
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func,
  loadData: PropTypes.func,
};

export default GitCustodianUpdateSeverityOverlay;
