import React from "react";
import PropTypes from "prop-types";
import DestructiveDeleteConfirmationOverlay
  from "components/common/overlays/center/delete/DestructiveDeleteConfirmationOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelinesByPipelineInstructionsUsage
  from "components/common/list_of_values_input/settings/pipelines/instructions/usage/useGetPipelinesByPipelineInstructionsUsage";
import PipelineUsageFieldBase from "components/common/list_of_values_input/pipelines/usage/PipelineUsageFieldBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";

const usagePanelHeight = `calc(${screenContainerHeights.DETAIL_PANEL_CONTENT_INFO_CONTAINER_HEIGHT} - 100px)`;

export default function DeletePipelineInstructionsOverlay(
  {
    pipelineInstructionsModel,
  }) {
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelines,
    isLoading,
    error,
    loadData,
  } = useGetPipelinesByPipelineInstructionsUsage(pipelineInstructionsModel?.getMongoDbId());


  const handleDeleteFunction = async () => {
    try {
      await pipelineInstructionsModel.deleteModel();
      toastContext.showDeleteSuccessResultDialog("Pipeline Instructions");
      history.push(pipelineInstructionsHelper.getManagementScreenLink());
      closePanel();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Pipeline Instructions", error);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDeleteDetails = () => {
    return (
      <div>
        <div>
          <span>If you proceed with deleting this set of Pipeline Instructions, the data will be permanently lost and these Pipelines using this set of Pipeline Instructions will break:</span>
        </div>
        <div>
          <PipelineUsageFieldBase
            isLoading={isLoading}
            pipelines={pipelines}
            type={"set of Pipeline Instructions"}
            error={error}
            loadPipelinesFunction={loadData}
            closePanel={closePanel}
            maximumHeight={usagePanelHeight}
            minimumHeight={usagePanelHeight}
          />
        </div>
      </div>
    );
  };

  if (isMongoDbId(pipelineInstructionsModel?.getMongoDbId()) !== true || pipelineInstructionsModel?.canDelete() !== true) {
    return null;
  }

  return (
    <DestructiveDeleteConfirmationOverlay
      closePanel={closePanel}
      deleteTopic={"Pipeline Instructions"}
      handleDeleteFunction={handleDeleteFunction}
      deleteDetails={getDeleteDetails()}
    />
  );
}

DeletePipelineInstructionsOverlay.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
};

