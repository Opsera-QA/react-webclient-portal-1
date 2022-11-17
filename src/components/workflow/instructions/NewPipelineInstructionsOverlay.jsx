import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useGetNewPipelineInstructionsModel
  from "components/settings/pipelines/instructions/hooks/useGetNewPipelineInstructionsModel";
import PipelineInstructionsEditorPanel
  from "components/settings/pipelines/instructions/details/PipelineInstructionsEditorPanel";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/settings/pipelines/instructions/pipelineInstructions.metadata";

export default function NewPipelineInstructionsOverlay(
  {
    loadData,
    closePanelFunction,
    viewDetailsUponCreate,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
  } = useGetNewPipelineInstructionsModel();

  const closePanel = (newPipelineInstructionsResponse) => {
    if (closePanelFunction) {
      closePanelFunction(newPipelineInstructionsResponse);
    } else {
      if (loadData) {
        loadData();
      }

      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
    }
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={pipelineInstructionsMetadata?.type}
      loadData={loadData}
    >
      <div className={"mx-2"}>
        <PipelineInstructionsEditorPanel
          handleClose={closePanel}
          pipelineInstructionsModel={pipelineInstructionsModel}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
          viewDetailsUponCreate={viewDetailsUponCreate}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewPipelineInstructionsOverlay.propTypes = {
  loadData: PropTypes.func,
  closePanelFunction: PropTypes.func,
  viewDetailsUponCreate: PropTypes.bool,
};


