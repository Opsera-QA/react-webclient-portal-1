import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import GitCustodianNewJiraTicketEditorPanel from "./GitCustodianNewJiraTicketEditorPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";

function GitCustodianCreateJiraTicketOverlay ({
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
      objectType={'Jira Ticket'}
      size={CENTER_OVERLAY_SIZES.FULL_WIDTH}
    >
      <GitCustodianNewJiraTicketEditorPanel
        handleClose={closePanel}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
      />
    </CreateCenterPanel>
  );
}

GitCustodianCreateJiraTicketOverlay.propTypes = {
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func
};

export default GitCustodianCreateJiraTicketOverlay;
