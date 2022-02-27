import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import ProjectDataMappingEditorPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ProjectDataMappingModel from "components/settings/data_mapping/projects/projectDataMapping.model";

  function NewProjectDataMappingOverlay({ loadData, isMounted, projectDataMappingMetadata, }) {
    const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [projectMappingModel, setProjectMappingModel] = useState(undefined);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel();
      }

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);
      createNewProjectDataMappingModel(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });

      return () => {
        source.cancel();
      };
    }, []);

    const createNewProjectDataMappingModel = async (cancelSource = cancelTokenSource) => {
      try {
        const accessRoleData = await getAccessRoleData();
        const newModel = new ProjectDataMappingModel(
          {...projectDataMappingMetadata.newObjectFields},
          projectDataMappingMetadata,
          true,
          getAccessToken,
          cancelSource,
          accessRoleData,
          loadData,
          [],
          setProjectMappingModel
        );
        setProjectMappingModel(newModel);
      } catch (error) {
        if (isMounted?.current === true) {
          console.error(error);
          toastContext.showLoadingErrorDialog(error);
        }
      }
    };
  
    const closePanel = () => {
      if (isMounted?.current === true) {
        loadData();
      }
  
      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
    };

    if (projectMappingModel == null) {
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
          projectMappingData={projectMappingModel}
        />
      </CreateCenterPanel>
    );
  }
   
  NewProjectDataMappingOverlay.propTypes = {
    isMounted: PropTypes.object,
    loadData: PropTypes.func,
    projectDataMappingMetadata: PropTypes.object,
  };
  
  export default NewProjectDataMappingOverlay;
