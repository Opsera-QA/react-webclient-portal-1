import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {jenkinsToolAccountMetadata} from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccount.metadata";
import Model from "core/data_model/model";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import JenkinsAccountEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/JenkinsAccountEditorPanel";

function CreateJenkinsAccountOverlay(
  {
    toolId,
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [jenkinsAccountData, setJenkinsAccountData] = useState(new Model(jenkinsToolAccountMetadata.newObjectFields, jenkinsToolAccountMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true && loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };


  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={jenkinsToolAccountMetadata.type}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.SMALL}
    >
      <JenkinsAccountEditorPanel
        toolId={toolId}
        jenkinsAccountData={jenkinsAccountData}
        setJenkinsAccountData={setJenkinsAccountData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

CreateJenkinsAccountOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  credentialId: PropTypes.string,
};

export default CreateJenkinsAccountOverlay;
