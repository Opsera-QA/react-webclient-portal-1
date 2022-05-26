import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import GitCustodianNewJiraTicketEditorPanel from "./GitCustodianNewJiraTicketEditorPanel";

function GitCustodianNewJiraTicketModal ({ loadData, isMounted, gitCustodianData }) {  
  
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={'Jira Ticket'}
      loadData={loadData}
    >
      <GitCustodianNewJiraTicketEditorPanel
        gitCustodianData={gitCustodianData}        
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

GitCustodianNewJiraTicketModal.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  gitCustodianData: PropTypes.object,
};

export default GitCustodianNewJiraTicketModal;