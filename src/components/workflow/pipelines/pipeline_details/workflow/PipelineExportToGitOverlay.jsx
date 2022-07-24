import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineExportToGitPanel from "components/workflow/pipelines/pipeline_details/workflow/PipelineExportToGitPanel";
import PipelineExportToGitConfirmationOverlay from "components/workflow/pipelines/pipeline_details/workflow/PipelineExportToGitConfirmationOverlay";
import PipelineExportToGitButtonContainer from "components/workflow/pipelines/pipeline_details/workflow/PipelineExportToGitButtonContainer";

function PipelineExportToGitOverlay({ pipeline }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <PipelineExportToGitConfirmationOverlay
      closePanel={closePanel}
      titleText={"Export Pipeline Configuration to Git"}
      buttonContainer={
        <PipelineExportToGitButtonContainer
          pipeline={pipeline}
          handleClose={closePanel}
        />}
    >
      <PipelineExportToGitPanel
        pipeline={pipeline}
        handleClose={closePanel}
      />
    </PipelineExportToGitConfirmationOverlay>
  );
}
 
PipelineExportToGitOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineExportToGitOverlay;


