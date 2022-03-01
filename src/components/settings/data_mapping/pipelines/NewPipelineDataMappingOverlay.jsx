import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import PipelineDataMappingModel from "components/settings/data_mapping/pipelines/pipelineDataMapping.model";
import ProjectDataMappingEditorPanel
  from "components/settings/data_mapping/projects/details/ProjectDataMappingEditorPanel";
import PipelineMappingEditorPanel
  from "components/common/metrics/pipeline_mapper/detail_view/PipelineMappingEditorPanel";
import PipelineDataMappingEditorPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingEditorPanel";

function NewPipelineDataMappingOverlay({loadData, isMounted, pipelineDataMappingMetadata,}) {
  const {getAccessToken, getAccessRoleData} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pipelineDataMappingModel, setPipelineDataMappingModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    createNewPipelineDataMappingModel(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, []);

  const createNewPipelineDataMappingModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newModel = new PipelineDataMappingModel(
        {...pipelineDataMappingMetadata.newObjectFields},
        pipelineDataMappingMetadata,
        true,
        getAccessToken,
        cancelSource,
        accessRoleData,
        loadData,
        [],
        setPipelineDataMappingModel
      );
      setPipelineDataMappingModel(newModel);
    } catch (error) {
      if (isMounted?.current === true) {
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

  if (pipelineDataMappingModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={pipelineDataMappingMetadata?.type}
      loadData={loadData}
    >
      <PipelineDataMappingEditorPanel
        handleClose={closePanel}
        pipelineDataMappingModel={pipelineDataMappingModel}
        setPipelineDataMappingModel={setPipelineDataMappingModel}
      />
    </CreateCenterPanel>
  );
}

NewPipelineDataMappingOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  pipelineDataMappingMetadata: PropTypes.object,
};

export default NewPipelineDataMappingOverlay;
