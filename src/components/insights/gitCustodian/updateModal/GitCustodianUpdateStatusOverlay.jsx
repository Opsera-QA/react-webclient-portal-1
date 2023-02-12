import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import GitCustodianUpdateStatusEditorPanel from "./GitCustodianUpdateStatusEditorPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import UpdateCenterPanelOverlayBase from "components/common/overlays/center/UpdateCenterPanelOverlayBase";

function GitCustodianUpdateStatusOverlay ({
  selectedIssues,
  setSelectedIssues,
  loadData,
}) {
  
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    loadData();
  };

  return (
    <UpdateCenterPanelOverlayBase
      objectType={'Vulnerability Status'}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.STANDARD}
    >
      <GitCustodianUpdateStatusEditorPanel
        handleClose={closePanel}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
      />
    </UpdateCenterPanelOverlayBase>
  );
}

GitCustodianUpdateStatusOverlay.propTypes = {
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func,
  loadData: PropTypes.func,
};

export default GitCustodianUpdateStatusOverlay;
