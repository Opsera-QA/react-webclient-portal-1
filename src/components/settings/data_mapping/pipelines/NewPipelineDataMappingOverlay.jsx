import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import PipelineDataMappingEditorPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingEditorPanel";
import useGetAnalyticsPipelineDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useGetAnalyticsPipelineDataMappingModel";

function NewPipelineDataMappingOverlay({loadData, isMounted, pipelineDataMappingMetadata,}) {
  const toastContext = useContext(DialogToastContext);
  const getAnalyticsPipelineDataMappingModel = useGetAnalyticsPipelineDataMappingModel();
  const [pipelineDataMappingModel, setPipelineDataMappingModel] = useState(getAnalyticsPipelineDataMappingModel(undefined, true));

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
