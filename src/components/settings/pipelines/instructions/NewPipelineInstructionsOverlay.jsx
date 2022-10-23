import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import scriptsLibraryMetadata from "@opsera/definitions/constants/registry/script_library/scriptsLibrary.metadata";
import useGetNewPipelineInstructionsModel
  from "components/settings/pipelines/instructions/hooks/useGetNewPipelineInstructionsModel";
import PipelineInstructionsEditorPanel
  from "components/settings/pipelines/instructions/details/PipelineInstructionsEditorPanel";

export default function NewPipelineInstructionsOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
  } = useGetNewPipelineInstructionsModel();

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={scriptsLibraryMetadata?.type}
      loadData={loadData}
    >
      <div className={"mx-2"}>
        <PipelineInstructionsEditorPanel
          handleClose={closePanel}
          pipelineInstructionsModel={pipelineInstructionsModel}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewPipelineInstructionsOverlay.propTypes = {
  loadData: PropTypes.func,
};


