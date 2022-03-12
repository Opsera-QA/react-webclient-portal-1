import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import JenkinsJobEditorPanel from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import JenkinsJobMetadata from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/jenkins-job-metadata";
import Model from "core/data_model/model";

function NewExternalApiIntegratorEndpointOverlay({ toolId, loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [jenkinsJobModel, setJenkinsJobModel] = useState(new Model({...JenkinsJobMetadata.newObjectFields}, JenkinsJobMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (toolData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={JenkinsJobMetadata.type}
      loadData={loadData}
      closePanel={closePanel}
    >
      <JenkinsJobEditorPanel
        jenkinsJobModel={jenkinsJobModel}
        setJenkinsJobModel={setJenkinsJobModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewExternalApiIntegratorEndpointOverlay.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewExternalApiIntegratorEndpointOverlay;
