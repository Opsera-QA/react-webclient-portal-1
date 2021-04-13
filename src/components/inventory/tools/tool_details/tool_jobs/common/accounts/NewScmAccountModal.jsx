import React, {useContext} from "react";
import ScmAccountsEditorPanel from "./ScmAccountsEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import scmCreateAccountMetadata
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/scm-create-account-metadata";
import PropTypes from "prop-types";

function NewScmAccountModal({ 
  toolData,
  loadData,
  scmAccountData,
}) {
  const toastContext = useContext(DialogToastContext);

  // TODO: Pass isMounted from Accounts panel
  const closePanel = () => {
    // if (isMounted?.current === true) {
      loadData();
    // }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };


  return (
    <CreateCenterPanel closePanel={closePanel} objectType={scmCreateAccountMetadata.type}>
      <ScmAccountsEditorPanel
        toolData={toolData}        
        scmAccountData={scmAccountData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewScmAccountModal.propTypes = {
  toolData: PropTypes.object,  
  loadData: PropTypes.func,
  scmAccountData: PropTypes.object,
};

export default NewScmAccountModal;
