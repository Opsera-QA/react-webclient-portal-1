import React, { useState, useContext} from "react";
import PropTypes from "prop-types";
import projectDataMappingMetadata from "components/settings/data_mapping/projects/projectDataMapping.metadata";
import ProjectDataMappingEditorPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingEditorPanel";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

  function NewProjectDataMappingOverlay({ loadData, isMounted }) {
    const toastContext = useContext(DialogToastContext);
    const [projectMappingData] = useState(new Model({...projectDataMappingMetadata.newObjectFields}, projectDataMappingMetadata, true));
  
    const closePanel = () => {
      if (isMounted?.current === true) {
        loadData();
      }
  
      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
    };
  
    return (
      <CreateCenterPanel closePanel={closePanel} objectType={projectDataMappingMetadata.type} loadData={loadData}>
        <ProjectDataMappingEditorPanel
          handleClose={closePanel}
          projectMappingData={projectMappingData}
        />
      </CreateCenterPanel>
    );
  }
   
  NewProjectDataMappingOverlay.propTypes = {
    isMounted: PropTypes.object,
    loadData: PropTypes.func,
  };
  
  export default NewProjectDataMappingOverlay;
