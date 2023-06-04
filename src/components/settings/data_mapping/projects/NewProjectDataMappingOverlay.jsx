import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import ProjectDataMappingEditorPanel
  from "components/settings/data_mapping/projects/details/ProjectDataMappingEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import projectDataMappingMetadata
  from "./projectDataMappingMetadata";
import useGetAnalyticsProjectDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/projects/useGetAnalyticsProjectDataMappingModel";

function NewProjectDataMappingOverlay({loadData, isMounted,}) {
  const toastContext = useContext(DialogToastContext);
  const getAnalyticsProjectDataMappingModel = useGetAnalyticsProjectDataMappingModel();
  const [projectDataMappingModel, setProjectDataMappingModel] = useState(getAnalyticsProjectDataMappingModel(undefined, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (projectDataMappingModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={projectDataMappingMetadata?.type}
      loadData={loadData}
    >
      <ProjectDataMappingEditorPanel
        handleClose={closePanel}
        projectDataMappingModel={projectDataMappingModel}
        setProjectDataMappingModel={setProjectDataMappingModel}
      />
    </CreateCenterPanel>
  );
}

NewProjectDataMappingOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewProjectDataMappingOverlay;
