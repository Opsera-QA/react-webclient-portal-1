import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import JFrogRepositoryEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/details/JFrogRepositoryEditorPanel";
import Model from "core/data_model/model";
import jfrogMavenRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jfrogMavenRepository.metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateJFrogRepositoryOverlay({
  toolId,
  loadData, 
  isMounted,
  jfrogRepositories,
 } ) {
  const toastContext = useContext(DialogToastContext);
  const [jFrogRepositoryModel, setJFrogRepositoryModel] = useState(new Model({...jfrogMavenRepositoryMetadata.newObjectFields}, jfrogMavenRepositoryMetadata, true));

  const handleClose = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (toolId == null) {
    return null;
  }


  return (
    <CreateCenterPanel
      objectType={jfrogMavenRepositoryMetadata.type}
      loadData={loadData}
      closePanel={handleClose}
    >
      <JFrogRepositoryEditorPanel
        toolId={toolId}
        jFrogRepositoryModel={jFrogRepositoryModel}
        setJFrogRepositoryModel={setJFrogRepositoryModel}
        loadData={loadData} 
        handleClose={handleClose} 
        jfrogRepositories={jfrogRepositories} 
      />
    </CreateCenterPanel>
  );
}

CreateJFrogRepositoryOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  jfrogRepositories: PropTypes.array,
};

export default CreateJFrogRepositoryOverlay;
