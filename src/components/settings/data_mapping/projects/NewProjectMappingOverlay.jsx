import React, { useState, useContext} from "react";
import PropTypes from "prop-types";
import projectMappingMetadata from "components/settings/data_mapping/projects/projectMapping.metadata";
import ProjectMappingEditorPanel from "./projects_detail_view/ProjectMappingEditorPanel";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

  function NewProjectMappingOverlay({ loadData, isMounted }) {
    const toastContext = useContext(DialogToastContext);
    const [projectTagsData, setProjectTagsData] = useState(new Model({...projectMappingMetadata.newObjectFields}, projectMappingMetadata, true));
  
    const closePanel = () => {
      if (isMounted?.current === true) {
        loadData();
      }
  
      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
    };
  
    return (
      <CreateCenterPanel closePanel={closePanel} objectType={projectMappingMetadata.type} loadData={loadData}>
        <ProjectMappingEditorPanel setProjectTagsData={setProjectTagsData} handleClose={closePanel} projectTagsData={projectTagsData}/>
      </CreateCenterPanel>
    );
  }
   
  NewProjectMappingOverlay.propTypes = {
    isMounted: PropTypes.object,
    loadData: PropTypes.func,
  };
  
  export default NewProjectMappingOverlay;
